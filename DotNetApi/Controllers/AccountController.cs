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

                if (user == null)
                {
                    return BadRequest("user not exists");
                }
                if (user?.Status != "Active")
                {
                    return BadRequest("Account is not Activate");
                }

                //admin 
                if (user?.RId == 1)
                {
                   User?  admin = db.Users.Where(u => u.Password == loginDto.Password && u.Username == loginDto.Username).FirstOrDefault();
                    if(admin != null)
                    return admin;
                }

                
               //seller and buyer
                if (user != null && user.Status == "Active")
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
