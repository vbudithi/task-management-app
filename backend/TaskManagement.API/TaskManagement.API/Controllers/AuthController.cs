using Azure.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Auth;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Models;
using TaskManagement.API.Services;

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IJwtService _jwtService;

        public AuthController(AppDbContext db, IJwtService jwtService)
        {
            _db = db;
            _jwtService = jwtService;

        }
        //Register
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {

            if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest(new { message = "Email already exists" });

            if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
                return BadRequest(new { message = "Username already exists" });

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Username = dto.Username,
                PasswordHash = PasswordHasher.Hash(dto.Password)

            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Registration successfully" });


        }

        //Login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);

            if (user == null)
                return Unauthorized(new { message = "Invalid Username or Password" });
            var hashed = PasswordHasher.Hash(dto.Password);

            if (hashed != user.PasswordHash)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }
            var token = _jwtService.GenerateToken(user.Id.ToString(), user.Username);
            return Ok(new
            {
                token,
                user = new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.Username
                }
            });
        }
    }
}