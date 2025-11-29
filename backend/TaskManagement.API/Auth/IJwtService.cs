using TaskManagement.API.Models;

namespace TaskManagement.API.Auth
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
