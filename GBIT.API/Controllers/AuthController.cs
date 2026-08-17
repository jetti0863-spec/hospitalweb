using GBIT.API.Data;
using GBIT.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace GBIT.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly GBITDbContext _context;

        public AuthController(GBITDbContext context)
        {
            _context = context;
        }
        [HttpPost("signup")]
        public IActionResult Signup(User user)
        {
            if (_context.Users.Any(x => x.Email == user.Email))
            {
                return BadRequest("Email already exists.");
            }

            user.CreatedOn = DateTime.UtcNow;

            _context.Users.Add(user);

            _context.SaveChanges();

            return Ok(user);
        }
        // Login API
        [HttpPost("login")]
        public IActionResult Login(LoginModel loginUser)
        {
            var user = _context.Users.FirstOrDefault(x =>
                x.Email == loginUser.Email &&
                x.Password == loginUser.Password);

            if (user == null)
            {
                return Unauthorized("Invalid Email or Password");
            }

            return Ok(user);
        }
    }
}