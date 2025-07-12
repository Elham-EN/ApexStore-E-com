
using API.Models;
using Microsoft.EntityFrameworkCore;

// "StoreContext = Your database manager with a Products table"
namespace API.Data
{
   /// Database context for the store application.
   /// Acts as a bridge between C# code and the database.
   /// Manages database connections and provides access to tables through DbSets.
   /// Primary constructor - takes database configuration options
   /// Passes it to the parent DbContext class automatically
    public class StoreContext(DbContextOptions options) : DbContext(options)
    {
        /// Represents the Products table in the database.
        /// Use this to query, add, update, or delete products.
        /// Example: _context.Products.ToListAsync() gets all products.
        public DbSet<Product> Products { get; set; }
    }
}