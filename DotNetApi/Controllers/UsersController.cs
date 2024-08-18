using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DotNetApi.Models;
using Microsoft.AspNetCore.Cors;

namespace DotNetApi.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [EnableCors]
    public class UsersController : ControllerBase
    {
        private readonly eclothingContext _context;

        public UsersController(eclothingContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Include(add => add.Addresses).ToListAsync(); //including Address of user also

        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }


        /*    [HttpPost]
            public async Task<ActionResult<User>> Register(User user)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.UserId }, user);
            }
        */
        [HttpPost]
        public IActionResult Register(User user)
        {
            // Check if Username, Mobile, or Email already exists
            var existingUser = _context.Users.FirstOrDefault(u => u.Username == user.Username || u.Mobile == user.Mobile || u.Email == user.Email);

            if (existingUser != null)
            {
                if (existingUser.Username == user.Username)
                {
                    return BadRequest(new { message = "Username is already taken." });
                }

                if (existingUser.Mobile == user.Mobile)
                {
                    return BadRequest(new { message = "Mobile number is already registered." });
                }

                if (existingUser.Email == user.Email)
                {
                    return BadRequest(new { message = "Email is already registered." });
                }
            }

            // Hash the password before saving
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Add the new user to the database
            _context.Users.Add(user);
            _context.SaveChanges();

            // Return a success response without including the userId
            return Ok(new { message = "User registered successfully." });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
