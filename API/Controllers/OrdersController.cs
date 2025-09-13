
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models;
using API.Models.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController : BaseApiController
{
    private readonly StoreContext _context;

    public OrdersController(StoreContext context)
    {
        this._context = context;
    }

    // Get List of Orders
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        var orders = await this._context.Orders
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUserName())
            .ToListAsync();

        return orders;
    }

    // Get a specific order
    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
    {
        var order = await this._context.Orders
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUserName() && id == x.Id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }

    // Create a new order
    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await this._context.Baskets
            .GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0)
        {
            return BadRequest("Basket is empty or not found");
        }

        var items = CreateOrderItems(basket.Items);

        if (items == null) return BadRequest("Some items out of stock");

        var subtotal = items.Sum(x => x.Price * x.Quantity);

        var deliveryFee = CalculateDeliveryFee(subtotal);

        // Create new Order object
        var order = new Order
        {
            OrderItems = items,
            BuyerEmail = User.GetUserName(),
            ShippingAddress = orderDto.ShippingAddress,
            DeliveryFee = deliveryFee,
            Subtotal = subtotal,
            PaymentSummary = orderDto.PaymentSummary,
            PaymentIntentId = basket.PaymentIntentId
        };

        this._context.Add(order);

        // Remove basket from the backend
        this._context.Baskets.Remove(basket);

        Response.Cookies.Delete("basketId");

        var result = await this._context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Problem creating order");

        return CreatedAtAction(nameof(GetOrderDetails),
            new { id = order.Id }, order.ToDto());
    }

    private static List<OrderItem>? CreateOrderItems(List<BasketItem> basketItems)
    {
        var orderItems = new List<OrderItem>();

        foreach (var basketItem in basketItems)
        {
            // If that product is out of stock
            if (basketItem.Product.QuantityInStock < basketItem.Quantity)
            {
                return null;
            }

            var orderItem = new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProductId = basketItem.ProductId,
                    PictureUrl = basketItem.Product.PictureUrl,
                    Name = basketItem.Product.Name
                },
                Price = basketItem.Product.Price,
                Quantity = basketItem.Quantity
            };

            orderItems.Add(orderItem);

            basketItem.Product.QuantityInStock -= basketItem.Quantity;
        }
        return orderItems;
    }

    private static long CalculateDeliveryFee(long subtotal)
    {
        return subtotal > 10000 ? 0 : 1000;
    }
}
 