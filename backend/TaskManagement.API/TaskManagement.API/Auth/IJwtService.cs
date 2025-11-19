namespace TaskManagement.API.Auth
{
    public interface IJwtService
    {
        string GenerateToken(string userId, string username);
    }
}
