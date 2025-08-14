
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

// "StoreContext = Your database manager with a Products table"
namespace API.Data
{
    /// Database context for the store application.
    /// Acts as a bridge between C# code and the database.
    /// Manages database connections and provides access to tables through DbSets.
    /// Primary constructor - takes database configuration options
    /// Passes it to the parent DbContext class automatically
    public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        /// Represents the Products table in the database.
        /// Use this to query, add, update, or delete products.
        /// Example: _context.Products.ToListAsync() gets all products.
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Basket> Baskets { get; set; }
        // Customize the model for identity
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "03bcffa9-233f-4599-bb71-769511f8a74a",
                    Name = "Member",
                    NormalizedName = "MEMBER"
                }, 
                new IdentityRole
                {
                    Id = "5f1f102e-cabd-4259-90fb-e9e7d708a1e3",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            );
        }
    }
}