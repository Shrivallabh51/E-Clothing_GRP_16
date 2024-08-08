using DotNetApi.Dtos;
using DotNetApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetApi.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [EnableCors]
    public class AccountController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<User>> Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null)
            {
                return BadRequest("Invalid client request");
            }

            using (var db = new eclothingContext())
            {
                User? user;
                user = db.Users.Where(u => u.Username == loginDto.Username).FirstOrDefault();

                if (user != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                    {
                        return user;
                    }
                }
                return Unauthorized("Invalid username or password");
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
