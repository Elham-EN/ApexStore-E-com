using API.DTOs;
using API.Models;

namespace API.Extensions;

public static class BasketExtensions
{
    // Transform basket entity into a (DTO) for API response
    public static BasketDto ToBasketDto(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
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
}   