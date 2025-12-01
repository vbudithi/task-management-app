using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagement.API.Auth;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Models;
using TaskManagement.API.Services;

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher _HashPassword;

        public UserAuthController(AppDbContext db, IJwtService jwtService, IPasswordHasher HashPassword)
        {
            _HashPassword = HashPassword;
            _db = db;
            _jwtService = jwtService;

        }
        //Register
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var Email = dto.Email.ToLower().Trim();
            var Username = dto.Username.ToLower().Trim();

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
                PasswordHash = _HashPassword.HashPassword(dto.Password),
                Role = UserRole.User

            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Registration successfully" });
        }

        //Login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
      
            var input = dto.LoginInput.ToLower().Trim();
            User user;

            if (input.Contains("@"))
            {
                //Login by email
                user = await _db.Users.FirstOrDefaultAsync(u=>u.Email == input);
            }
            else
            {
                //Login by username
                user = await _db.Users.FirstOrDefaultAsync(u=>u.Username == input); 
            }

            if (user == null)
                return Unauthorized(new { message = "Invalid Username or Password" });
            var hashed = _HashPassword.HashPassword(dto.Password);

            if (hashed != user.PasswordHash)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }
            var accessToken = _jwtService.GenerateToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _db.SaveChangesAsync();
            return Ok(new
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                user = new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.Username,
                    role=user.Role.ToString()
                }
            });
        }

        [Authorize(Roles ="Admin")]
        [HttpPut("Users/{id}/role")]
        public async Task<IActionResult> UpdateUserRole(int id, UpdateUserRoleDto dto)
        {
            if (id != dto.Id)
                return BadRequest(new { message = "Route ID and body user Id doesnt match"});


                    var user = await _db.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found" });


            user.Role = dto.Role;
            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "User role updated successfully",
                user = new
                {
                    user.Id,
                    user.Email,
                    user.Username,
                    role = user.Role.ToString()
                }
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh( RefreshRequestDto dto)
        {
            if (dto is null || string.IsNullOrEmpty(dto.Token) || string.IsNullOrEmpty(dto.RefreshToken))
                return BadRequest(new { message = "Invalid Client request" });

            var principal = _jwtService.GetPrincipalFromExpiredToken(dto.Token);
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _db.Users.FindAsync(int.Parse(userId));

            if (user == null || user.RefreshToken != dto.RefreshToken
                || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return Unauthorized(new { message = "Invalid Refresh Token" });
            }

            var newAccessToken = _jwtService.GenerateToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken();


            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return Ok(new TokenResponseDto
            {

                Token = newAccessToken,
                RefreshToken = newRefreshToken


            });

    }
    }

}