using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Models;

namespace TaskManagement.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //User timestamps
            modelBuilder.Entity<User>().Property(u => u.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            modelBuilder.Entity<User>().Property(u => u.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");

            //Password Reset timestamps
            modelBuilder.Entity<PasswordResetToken>().Property(u => u.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            modelBuilder.Entity<PasswordResetToken>().Property(u => u.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");

            //Relationship between User and timestamps
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.User) //each TaskItem has one user
                .WithMany(u => u.Tasks)   // each User can have many tasks 
                .HasForeignKey(t=> t.UserId) //foreign key in TaskItem
                .OnDelete(DeleteBehavior.SetNull); //delete tasks if user is deleted
        }

        public override int SaveChanges()
        {
            ApplyGlobalEntityRules();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken=default)
        {
            ApplyGlobalEntityRules();
            return base.SaveChangesAsync(cancellationToken);

        }

        private void ApplyGlobalEntityRules()
        {
            //Apply timestamp rules
            var entries = ChangeTracker.Entries<BaseEntity>().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);
          
            foreach (var entry in entries)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;

                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                }

            }
            //Normalize user emails globally
            var userEntries = ChangeTracker.Entries<User>().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);
             foreach(var entry in userEntries)
            {
                entry.Entity.Email = entry.Entity.Email.ToLower().Trim();
                entry.Entity.Username = entry.Entity.Username.ToLower().Trim();
            }

        }

        //Mock data for TaskItem

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    //seed data
        //    modelBuilder.Entity<TaskItem>().HasData(
        //        new TaskItem
        //        {
        //            Id = 1,
        //            Title = "Building first API",
        //            Description = "Creating a simple REST API",
        //            Status = Models.TaskStatus.Todo,
        //            Priority = 2,
        //            CreatedAt = new DateTime(2024, 01, 01)
        //        },
        //        new TaskItem
        //        {
        //            Id = 2,
        //            Title = "Learn ML .NET basics",
        //            Description = "Inegrating ML in .NET",
        //            Status = Models.TaskStatus.Todo,
        //            Priority = 3,
        //            CreatedAt = new DateTime(2024, 01, 02)
        //        }
        // );

        //}

    }
}
