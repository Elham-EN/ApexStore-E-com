using API.DTOs;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class BasketExtensions
{
    // Transform basket entity into a (DTO) for API response
    public static BasketDto ToBasketDto(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            ClientSecret = basket.ClientSecret,
            PaymentIntentId = basket.PaymentIntentId,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                Brand = x.Product.Brand,
                Type = x.Product.Type,
                PictureUrl = x.Product.PictureUrl,
                Quantity = x.Quantity
            }).ToList()

        };
    }

    public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket>
        query, string? basketId)
    {
        return await query
            // Load basket items
            .Include(x => x.Items)
            // Load product details for each item
            .ThenInclude(x => x.Product)
            // Match basket ID from browser cookie: Uses cookie stored 
            // in browser to identify which basket belongs to this user
            .FirstOrDefaultAsync(x => x.BasketId == basketId)
                ?? throw new Exception("Cannot get basket");
    }
}   