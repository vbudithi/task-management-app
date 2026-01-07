using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using TaskManagement.API.Models;

namespace TaskManagement.API.DTOs
{
    public class UpdateTaskDto
    {
        [MaxLength(200)]
        public string? Title { get; set; }
        [MaxLength(100)]
        public string? Description { get; set; }
        [Range(0, 2, ErrorMessage = "Status must be 0 (Todo), 1 (Inprogress), 2 (Completed)")]
        public required Models.TaskStatus? Status { get; set; }
        [Range(1, 3)]
        public int? Priority {  get; set; }
        public DateTime? DueDate { get; set; }
    }
}
