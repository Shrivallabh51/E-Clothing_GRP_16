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
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors]
    public class AdminController : ControllerBase
    {
        private readonly eclothingContext _context;

        public AdminController(eclothingContext context)
        {
            _context = context;
        }

        // GET: api/Admin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetSeller()
        {
            //return await _context.Users.Where(user => user.Status == null).ToListAsync();
            var sellers = await _context.Users.Where(U => U.Status == null).ToListAsync();
          
  return Ok(sellers);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        [HttpPut]
        public IActionResult ActivateUser(int userId)
        {
            //var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            var user = _context.Users.FirstOrDefault(e => e.UserId == userId);
            if (user == null)
            {
                return NotFound();
            }
            user.Status = "Active";
            _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public IActionResult InactivateUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
            {
                return NotFound();
            }
            user.Status = "Inactive";
            _context.SaveChangesAsync();
            return Ok();
        }

    }
}
