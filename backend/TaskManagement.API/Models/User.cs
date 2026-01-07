using System.ComponentModel.DataAnnotations;

namespace TaskManagement.API.Models
{
    public class User:BaseEntity
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public required string FirstName { get; set; }
        [MaxLength(100)]
        public required string LastName { get; set; }
        [MaxLength(100)]
        public required string Email { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public UserRole Role { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime {  get; set; }  
        public ICollection<TaskItem> Tasks { get; set; }= new List<TaskItem>();

    }
}