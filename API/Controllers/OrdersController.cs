
using API.Data;
using API.Extensions;
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
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        var orders = await this._context.Orders
            .Include(x => x.OrderItems)
            .Where(x => x.BuyerEmail == User.GetUserName())
            .ToListAsync();

        return orders;
    }

    // Get a specific order
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Order>> GetOrderDetails(int id)
    {
        var order = await this._context.Orders
            .Where(x => x.BuyerEmail == User.GetUserName() && id == x.Id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }
}
 