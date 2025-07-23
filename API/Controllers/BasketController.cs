using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly StoreContext _context;

    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        // Get user's shopping basket
        var basket = await RetrieveBasket();
        // Return return empty 204 - NoContent response if no basket 
        if (basket == null) return NoContent();
        // Transform basket entity into a (DTO) for API response
        return basket.ToBasketDto();
    }
    // API endpoint to add products to user's shopping basket
    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        // Get user's existing basket from database, or create a new one 
        // if none exists
        var basket = await RetrieveBasket() ?? CreateBasket();
        // Find the product they want to add
        var product = await _context.Products.FindAsync(productId);
        if (product == null)
        {
            return BadRequest("Problem with adding item to basket");
        }
        // Add product to basket (handles qty updates if item already exists)
        basket.AddItem(product, quantity);
        // Save all changes to database
        var result = await _context.SaveChangesAsync() > 0;
        // Return success with updated basket, or error if save failed
        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToBasketDto());
        return BadRequest("Problem updating basket");
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        if (basket == null)
        {
            return BadRequest("Unable to retrieve basket");
        }
        basket.RemoveItem(productId, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        // Return an empty Status 200 OK response.
        if (result) return Ok();
        return BadRequest("Problem updating basket");
    }

    // Get user's shopping basket from client's browser cookies
    private async Task<Basket?> RetrieveBasket()
    {
        // Get user's shopping basket from database using cookie ID,
        // including all items in the basket and their product details
        var basket = await _context.Baskets
            // Load basket items
            .Include(x => x.Items)
            // Load product details for each item
            .ThenInclude(x => x.Product)
            // Match basket ID from browser cookie: Uses cookie stored 
            // in browser to identify which basket belongs to this user
            .FirstOrDefaultAsync(x =>
                x.BasketId == Request.Cookies["basketId"]);
        return basket;
    }

    // Creates a new shopping basket for anonymous users and stores 
    // basket ID in browser cookie    
    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        // Configure cookie settings:
        var cookieOptions = new CookieOptions
        {
            // essential for site function
            IsEssential = true,
            // expires in 30 days
            Expires = DateTime.UtcNow.AddDays(30) 
        };
        // Store basket ID in user's browser so we can find their basket later
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        // Create basket object with the same ID
        var basket = new Basket
        {
            BasketId = basketId
        };
        // EF to track this new basket in memory
        _context.Add(basket);
        return basket;
    }

}