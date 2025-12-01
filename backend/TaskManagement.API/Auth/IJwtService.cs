using System.Security.Claims;
using TaskManagement.API.Models;

namespace TaskManagement.API.Auth
{
    public interface IJwtService
    {
        string GenerateToken(User user);
        string GenerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
