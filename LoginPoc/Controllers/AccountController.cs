using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
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
        public AccountController(UserManager<IdentityUser> userManger,SignInManager<IdentityUser> signInManager, IConfiguration Configuration)
        {
            this.userManger = userManger;
            this.signInManager = signInManager;
            this.Configuration = Configuration;
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
    }
}