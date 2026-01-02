using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.DTOs;
using TaskManagement.API.Services;

namespace TaskManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordResetService _passwordResetService;

        public PasswordController(IPasswordResetService passwordResetService)
        {
            _passwordResetService = passwordResetService;
        }

        [HttpPost("forgot")]
        public async Task<IActionResult> Forgot(ForgotPasswordDto dto)
        {
            var email = dto.Email.ToLower().Trim();
            var token = await _passwordResetService.GenerateResetTokenAsync(email);

            if (token==null)
                return NotFound(new { message = "Email not found" });

            // DEV ONLY: Print reset link to console for testing
            Console.WriteLine("RESET LINK (DEV): http://localhost:3000/reset-password?token=" + token);

            return Ok(new { message = "Password reset link sent to email" });

        }

        [HttpPost("reset")]
        public async Task<IActionResult> Reset(ResetPasswordDto dto)
        {
            var result = await _passwordResetService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            if (!result)
                return BadRequest(new { message = "Invalid or expired token" });
            return Ok(new { message = "Password Reset Successfull" });
        }

    }
}
