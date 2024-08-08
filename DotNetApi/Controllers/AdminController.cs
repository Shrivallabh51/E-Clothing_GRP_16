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
            return await _context.Users.Where(user => user.Status == null).ToListAsync();

        }


        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
