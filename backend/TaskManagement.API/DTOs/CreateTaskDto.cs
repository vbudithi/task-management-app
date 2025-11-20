using System.ComponentModel.DataAnnotations;

namespace TaskManagement.API.DTOs
{
    public class CreateTaskDto
    {
        [Required(ErrorMessage = "Title is required")]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string? Description { get; set; }
        public Models.TaskStatus? Status { get; set; }

        [Range(1,3, ErrorMessage = "Priority must be between 1 and 3")]
        public int Priority { get; set; } = 1;
    }
}
