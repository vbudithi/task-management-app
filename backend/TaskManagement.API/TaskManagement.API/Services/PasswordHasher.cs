using System.Security.Cryptography;
using System.Text;

namespace TaskManagement.API.Services
{
    public static class PasswordHasher
    {
        public static string Hash(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password); //convert into bytes
            var hash = sha.ComputeHash(bytes); //compute the hash
            return Convert.ToBase64String(hash); //convert hash byes to base64
        }
    }
}
