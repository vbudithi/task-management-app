using System.ComponentModel.DataAnnotations;

namespace TaskManagement.API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        [MaxLength(200)]
        public required string Title { get; set; }
        [MaxLength(1000)]
        public string? Description { get; set; }
        public required TaskStatus? Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime CompletedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        [Range(1, 3)]
        public int? Priority { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
