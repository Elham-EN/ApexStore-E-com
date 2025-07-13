using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Route: https://localhost:5001/api/placeholder
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet]
        // Route: https://localhost:5001/api/products
        public ActionResult<List<Product>> GetListOfProducts()
        {
            // Return all products as a list
            return _context.Products.ToList();
        }
        // Route: https://localhost:5001/api/products/2
        [HttpGet("id")] // id => route parameter
        public ActionResult<Product> GetSingleProduct(int id)
        {
            // Finds an entity with the given primary key values
            var product = _context.Products.Find(id);

            // If product do not exist then return notfound 404
            if (product == null) return NotFound();

            return product;
        }
    }
} 
