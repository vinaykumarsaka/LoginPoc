using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace LoginPoc.Controllers
{
    [ApiController]
    [Route("account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManger;
        private readonly SignInManager<IdentityUser> signInManager;
        private IConfiguration Configuration;
       // private readonly IConfigurationSection _goolgeSettings;
        public AccountController(UserManager<IdentityUser> userManger,SignInManager<IdentityUser> signInManager, IConfiguration Configuration)
        {
            this.userManger = userManger;
            this.signInManager = signInManager;
            this.Configuration = Configuration;
           // this._goolgeSettings = Configuration.GetSection("GoogleAuthSettings");
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async  Task<IActionResult> Register([FromBody]RegisterModel model)
        {
            IActionResult response = Unauthorized();
            try
            {

                var user = new IdentityUser { UserName = model.UserName, Email = model.Email };
                var result = await userManger.CreateAsync(user, model.Password);
                if(result.Succeeded)
                {
                    // response = Ok(new { token = tokenString, Name = user.LastName + "," + user.FirstName });
                    response = Ok(new {  Name = user.UserName });
                }

                return response;

            }
            catch (Exception)
            {

                throw;
            }

            return response;

        }

        [HttpPost]
        [Route("externallogin")]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
        {
            IActionResult response = Unauthorized();
            var payload = await VerifyGoogleToken(externalAuth);
            if (payload == null)
                return BadRequest("Invalid External Authentication.");
            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
            var user = await userManger.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (user == null)
            {
                user = await userManger.FindByEmailAsync(payload.Email);
                if (user == null)
                {
                    user = new IdentityUser { Email = payload.Email, UserName = payload.Email };
                    await userManger.CreateAsync(user);
                    //prepare and send an email for the email confirmation
                    await userManger.AddToRoleAsync(user, "Admin");
                    await userManger.AddLoginAsync(user, info);
                }
                else
                {
                    await userManger.AddLoginAsync(user, info);
                }
            }
            if (user == null)
                return BadRequest("Invalid External Authentication.");
            //check for the Locked out account
            var token = GenerateJSONWebToken(user, "Admin");
            // response = Ok(new { token = tokenString, Name = user.LastName + "," + user.FirstName });
            response = Ok(new { Name = user.UserName, BearerToken = token });
            return response;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]RegisterModel model)
        {
            IActionResult response = Unauthorized();
            try
            {

                var user = await userManger.FindByEmailAsync(model.UserName);
                //var result = await userManger.CreateAsync(user, model.Password);
                var result = await signInManager.PasswordSignInAsync(user, model.Password,false/* model.RememberMe*/,false);
                if (result.Succeeded)
                {
                    var token = GenerateJSONWebToken(user,"Admin");
                    // response = Ok(new { token = tokenString, Name = user.LastName + "," + user.FirstName });
                    response = Ok(new { Name = user.UserName,BearerToken=token });
                }

                return response;

            }
            catch (Exception ex)
            {

                throw ex;
            }

            return response;

        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> LogOut()
        {
            await signInManager.SignOutAsync();
            IActionResult response = Unauthorized();
            return response;

        }

        private string GenerateJSONWebToken(IdentityUser userInfo, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim("UserId", userInfo.UserName));
            //claims.Add(new Claim("UserName", userInfo.LastName + "," + userInfo.FirstName));
            claims.Add(new Claim("role", role));
            claims.Add(new Claim("Id", userInfo.Id));

            var token = new JwtSecurityToken(Configuration["Jwt:Issuer"],
                Configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalAuthDto externalAuth)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { Configuration["GoogleAuthSettings:clientId"] }
                };
                var payload = await GoogleJsonWebSignature.ValidateAsync(externalAuth.IdToken, settings);
                return payload;
            }
            catch (Exception ex)
            {
                //log an exception
                return null;
            }
        }
    }
}