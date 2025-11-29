namespace TaskManagement.API.Services
{
    public interface IPasswordResetService
    {
        Task<bool> GenerateResetTokenAsync(string email);
        Task<bool> ResetPasswordAsync(string token, string newPasword);

    }
}
