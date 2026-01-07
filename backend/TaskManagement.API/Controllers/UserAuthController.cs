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
            User? user;

            user = await _db.Users.FirstOrDefaultAsync(
                u => input.Contains("@")? u.Email.ToLower() == input : u.Username.ToLower() == input);

            //if (input.Contains("@"))
            //{
            //    //Login by email
            //   user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == input);
            //}
            //else
            //{
            //    //Login by username
            //    user = await _db.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == input);
            //}

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

            // HttpOnly cookies
            Response.Cookies.Append("accessToken", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTimeOffset.UtcNow.AddMinutes(30)
            });

            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTime.UtcNow.AddDays(7)
            });

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
                    role = user.Role.ToString()
                }
            });
        }

        //logout
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("accessToken");
            Response.Cookies.Delete("refreshToken");

            await Task.CompletedTask;

            return Ok(new { message = "Logged out Successfully" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("Users/{id}/role")]
        public async Task<IActionResult> UpdateUserRole(int id, UpdateUserRoleDto dto)
        {
            if (id != dto.Id)
                return BadRequest(new { message = "Route ID and body user Id doesnt match" });


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
        public async Task<IActionResult> Refresh(RefreshRequestDto dto)
        {
            if (dto is null || string.IsNullOrEmpty(dto.Token) || string.IsNullOrEmpty(dto.RefreshToken))
                return BadRequest(new { message = "Invalid Client request" });

            var principal = _jwtService.GetPrincipalFromExpiredToken(dto.Token);
            var userIdString = principal?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            var userId = int.Parse(userIdString);
            var user = await _db.Users.FindAsync(userId);

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

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var user = await _db.Users
                .Where(u => u.Id == int.Parse(userId))
                .Select(u => new
                {
                    u.Id,
                    u.Email,
                    u.FirstName,
                    u.LastName,
                    u.Username,
                    u.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (user == null) return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        [Authorize]
        [HttpPut("updateProfile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (email == null)
                return Unauthorized();

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return NotFound();

            // Validate email uniqueness by excluding the current user's record
            var emailExists = await _db.Users.AnyAsync(u =>
                u.Email == dto.Email && u.Id != user.Id);

            if (emailExists)
                return BadRequest(new { message = "Email already in use" });

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.Email = dto.Email;

            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "Profile updated",
                profile = new
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