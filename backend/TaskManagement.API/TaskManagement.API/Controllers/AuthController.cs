using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.Auth;
using TaskManagement.API.DTOs;

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;

        public AuthController(IJwtService jwtService)
        {
            _jwtService = jwtService;

        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            // Fake user validation (testing)
            if (dto.Username != "admin" || dto.Password != "123456")
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // Fake user object for now
            var userId = "1";
            var username = dto.Username;

            var token = _jwtService.GenerateToken(userId, username);

            return Ok(new { token });
        }

    }
}
