using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace TaskManagement.API.DTOs
{
    public class CreateTaskDto
    {
        [MaxLength(200, ErrorMessage = "Title is required" )]
        public required string Title { get; set; } = string.Empty;

        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string? Description { get; set; }
        [Range(0, 2, ErrorMessage = "Status must be 0 (Todo), 1 (Inprogress), 2 (Completed)")]
        public required Models.TaskStatus? Status { get; set; }

        [Range(1, 3, ErrorMessage = "Priority must be between 1 and 3")]
        public int? Priority { get; set; } = 1;

        public DateTime? DueDate {get;set;}
    }
}
