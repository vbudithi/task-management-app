using System.ComponentModel.DataAnnotations;

namespace TaskManagement.API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }

        public TaskStatus Status { get; set; } = TaskStatus.Todo;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime CompletedAt { get; set; }

        [Required]
        public int Priority { get; set; } = 1; // 1=Low, 2=Medium, 3=High

    }
}
