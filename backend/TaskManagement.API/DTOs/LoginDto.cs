namespace TaskManagement.API.DTOs
{
    public class LoginDto
    {
        public required string LoginInput { get; set; } //Username or Email
        public required string Password { get; set; }
    }
}
