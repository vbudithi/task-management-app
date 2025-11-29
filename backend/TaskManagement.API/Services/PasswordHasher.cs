using System.Security.Cryptography;
using System.Text;

namespace TaskManagement.API.Services
{
    public class PasswordHasher:IPasswordHasher
    {
        public  string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password); //convert into bytes
            var hash = sha.ComputeHash(bytes); //compute the hash
            return Convert.ToBase64String(hash); //convert hash byes to base64
        }
        public bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }

    }
    }

