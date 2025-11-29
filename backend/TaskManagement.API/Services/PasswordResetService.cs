using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.Models;
using TaskManagement.API.Services;

namespace TaskManagement.API.Services
{
    public class PasswordResetService:IPasswordResetService
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher _hasher;
         
        public PasswordResetService(AppDbContext context , IPasswordHasher hasher)
        {
            _context = context;
            _hasher = hasher;
        }

        public async Task<bool> GenerateResetTokenAsync(string email)
        {
            email = email.ToLower().Trim();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
            {
                throw new InvalidOperationException("No email entered");
            }
            var token = Guid.NewGuid().ToString();

            await _context.PasswordResetTokens.AddAsync(new PasswordResetToken
            {
                Email = email,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(30),
                IsUsed = false
            });
            await _context.SaveChangesAsync();
            Console.WriteLine($"Reset Link; {token}");
            return true;
        }

        public async Task<bool> ResetPasswordAsync(string token, string newPassword)
        {
            var tokenEntry = await _context.PasswordResetTokens.FirstOrDefaultAsync(x => x.Token == token && !x.IsUsed);
            if (tokenEntry == null || tokenEntry.ExpiresAt < DateTime.UtcNow) return false;

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == tokenEntry.Email);
            if (user == null) return false;

            user.PasswordHash= _hasher.HashPassword(newPassword);
            tokenEntry.IsUsed = true;

            await _context.SaveChangesAsync();
            return true;

        }
    }
}
