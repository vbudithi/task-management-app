

    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Runtime;
    using System.Security.Claims;
    using System.Text;

    namespace TaskManagement.API.Auth
    {
        public class JwtService:IJwtService
        
        {
            private readonly JwtSettings _settings;

            public JwtService(IOptions<JwtSettings> settings)
            {
                _settings = settings.Value;
            }
            public string GenerateToken(string userId, string username)
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Name, username)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _settings.Issuer,
                    audience: _settings.Audience,
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(_settings.ExpiryHours),
                    signingCredentials: creds
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }

        }
    }
           

