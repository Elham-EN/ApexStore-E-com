using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models;
using API.RequestHelpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper mapper;

    public ProductsController(StoreContext context, IMapper mapper)
    {
        this._context = context;
        this.mapper = mapper;
    }

    [HttpGet]
    // Route: https://localhost:5001/api/products
    public async Task<ActionResult<List<Product>>> GetListOfProducts(
        [FromQuery] ProductParams productParams)
    {
        // Create a queryable object from the Products table in the 
        // database. This allows us to build and chain query operations 
        // (like filtering, sorting) before actually executing the 
        // database query for better performance.
        // Deferred execution: The query doesn't run immediately - 
        // you can add more conditions first
        var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.Pagesize);

        Response.AddPaginationHeader(products.Metadata);

        return products;
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

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await _context.Products
            .Select(x => x.Brand)
            // Remove duplicate brand names, keep only unique ones
            .Distinct()
            .ToListAsync();

        var types = await _context.Products
            .Select(x => x.Type)
            // Remove duplicate brand names, keep only unique ones
            .Distinct()
            .ToListAsync();

        return Ok(new { brands, types });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
    {
        var product = this.mapper.Map<Product>(productDto);

        this._context.Products.Add(product);

        var result = await this._context.SaveChangesAsync() > 0;

        if (result)
        {
            return CreatedAtAction(nameof(GetSingleProduct), new { Id = product.Id }, product);
        }

        return BadRequest("Problem creating new product");
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult> UpdateProduct(UpdateProductDto updateProductDto)
    {
        var existingProduct = await this._context.Products.FindAsync(updateProductDto.Id);
        if (existingProduct == null) return NotFound();

        this.mapper.Map(updateProductDto, existingProduct);

        var result = await this._context.SaveChangesAsync() > 0;

        if (result) return NoContent();

        return BadRequest("Problem updating product");
    }
}

