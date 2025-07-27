using API.Data;
using API.Extensions;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet]
        // Route: https://localhost:5001/api/products
        public async Task<ActionResult<List<Product>>> GetListOfProducts(
            string? orderBy, string? searchTerm)
        {
            // Create a queryable object from the Products table in the 
            // database. This allows us to build and chain query operations 
            // (like filtering, sorting) before actually executing the 
            // database query for better performance.
            // Deferred execution: The query doesn't run immediately - 
            // you can add more conditions first
            var query = _context.Products
                .Sort(orderBy)
                .Search(searchTerm)
                .AsQueryable();


            // Return all products as a list from the database
            return await query.ToListAsync();
        }
        // Route: https://localhost:5001/api/products/2
        [HttpGet("id")] // id => route parameter
        public async Task<ActionResult<Product>> GetSingleProduct(int id)
        {
            // Finds an entity with the given primary key values
            var product = await _context.Products.FindAsync(id);

            // If product do not exist then return notfound 404
            if (product == null) return NotFound();

            return product;
        }
    }
} 
