using API.Data;
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
        public async Task<ActionResult<List<Product>>> GetListOfProducts()
        {
            // Return all products as a list
            return await _context.Products.ToListAsync();
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
