namespace TaskManagement.API.Models
{
    public class PasswordResetToken:BaseEntity
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; }

    }
}
