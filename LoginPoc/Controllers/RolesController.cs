using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LoginPoc.Controllers
{
    [ApiController]
    [Route("roles")]
    public class RolesController : ControllerBase
    {

        private readonly RoleManager<IdentityRole> roleManager;
        public RolesController(RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateRole(RoleManage model)
        {
            IActionResult response = Unauthorized();

            IdentityRole role = new IdentityRole
            {
                Name = model.Name
            };

            var result = await roleManager.CreateAsync(role);
            if(result.Succeeded)
            {
                
                   return response = Ok( "Role created Successfully" );
            }
            return response;
        }
    }
}