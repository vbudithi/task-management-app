using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Models;

namespace TaskManagement.API.Data
{
    public class AppDbContext : DbContext

    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //seed data

            modelBuilder.Entity<TaskItem>().HasData(
                new TaskItem
                {
                    Id = 1,
                    Title = "Building first API",
                    Description = "Creating a simple REST API",
                    Status = Models.TaskStatus.Todo,
                    Priority = 2,
                    CreatedAt = new DateTime(2024, 01, 01)
                },
                new TaskItem
                {
                    Id = 2,
                    Title = "Learn ML .NET basics",
                    Description = "Inegrating ML in .NET",
                    Status = Models.TaskStatus.Todo,
                    Priority = 3,
                    CreatedAt = new DateTime(2024, 01, 02)
                }
         );

        }

    }
}
