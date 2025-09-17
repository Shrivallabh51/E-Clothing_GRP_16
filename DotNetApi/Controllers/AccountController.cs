using DotNetApi.Dtos;
using DotNetApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DotNetApi.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [EnableCors]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AccountController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            using (var db = new eclothingContext())
            {
                User? user = db.Users.Where(u => u.Username == loginDto.Username).FirstOrDefault();
                
                if (user == null)
                {
                    return BadRequest(new { message = "Username is incorrect" });
                }

                if (user.Status != "Active")
                {
                    return BadRequest(new { message = "Account is not Active" });
                }

                // Seller, buyer, admin
                if (BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                {
                    // Generate JWT token after successful login
                    var token =  GenerateJwtToken(user);
                    return Ok(new
                    {
                        token = token,
                        message = "Login successful"
                    });
                }
                else
                {
                    return BadRequest(new { message = "Password is incorrect" });
                }
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> getRoles()
        {
            using (var db = new eclothingContext())
            {
                var roles = db.Roles.Where(role => role.RName.ToLower() != "admin").ToList();
                return Ok(roles);
            }
        }

        // Helper method to generate JWT Token
        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var userIdClaim = new Claim("userId", user.UserId.ToString());

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, user.RId.ToString()), // Assuming the user has a Role property
                userIdClaim
            };
            
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
