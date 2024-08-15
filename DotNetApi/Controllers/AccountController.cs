using DotNetApi.Dtos;
using DotNetApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;

namespace DotNetApi.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [EnableCors]
    public class AccountController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            using (var db = new eclothingContext())
            {
                User? user;
                user = db.Users.Where(u => u.Username == loginDto.Username).FirstOrDefault();
                 
                if (user == null)
                {
                    return BadRequest(new { message = "username is incorrect" });
                }
                if (user.Status != "Active")
                {
                    return BadRequest(new { message = "Account is not Active" });
                }
                
                //seller , buyer , admin
                if (user != null && user.Status == "Active")
                {
                    if (BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                    {
                        return Ok(user);
                    }
                    else
                    {
                        return BadRequest(new { message = "password is incorrect" });
                    }
                }
                return BadRequest(new { message = "Invalid username or password" });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> getRoles()
        {
            var db = new eclothingContext();
            var roles = db.Roles.Where(role => role.RName.ToLower() != "admin").ToList();
            return Ok(roles);
        }
    }
}
