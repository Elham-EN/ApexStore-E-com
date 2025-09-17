
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models.OrderAggregate;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe; // Stripe payment processing library


namespace API.Controllers;

public class PaymentsController : BaseApiController
{
    private readonly PaymentsService _paymentsService;
    private readonly StoreContext _storeContext;
    private readonly IConfiguration _config; // Access to app settings (like Stripe secrets)
    private readonly ILogger<PaymentsController> _logger; // For logging errors and info

    public PaymentsController(PaymentsService paymentsService, StoreContext storeContext,
        IConfiguration config, ILogger<PaymentsController> logger)
    {
        this._paymentsService = paymentsService;
        this._storeContext = storeContext;
        this._config = config;
        this._logger = logger;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await this._storeContext.Baskets.GetBasketWithItems(
            Request.Cookies["basketId"]
        );

        if (basket == null) return BadRequest("Can't retrieve the basket");

        var intent = await this._paymentsService.CreateOrUpdatePaymentIntent(basket);

        if (intent == null) return BadRequest("Failed to create payment intent");

        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret ??= intent.ClientSecret;

        if (this._storeContext.ChangeTracker.HasChanges())
        {
            var result = await this._storeContext.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Failed to update basket with intent");
        }

        return basket.ToBasketDto();
    }

    // Stripe webhook endpoint - Stripe calls this when payment events happen
    // Think of this as a "notification receiver" from Stripe about payment status
    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        // Read the raw JSON data Stripe sent us
        var json = await new StreamReader(Request.Body).ReadToEndAsync();
        try
        {
            // Verify this request actually came from Stripe (security check)
            var stripeEvent = ConstructStripeEvent(json);

            // Make sure the event is about a payment (PaymentIntent)
            if (stripeEvent.Data.Object is not PaymentIntent intent)
            {
                return BadRequest("Invalid event data");
            }

            // Check if payment succeeded or failed, then handle accordingly
            if (intent.Status == "succeeded")
            {
                await HandlePaymentIntentSucceeded(intent);
            }
            else
            {
                await HandlePaymentIntentFailed(intent);
            }
            return Ok(); // Tell Stripe we received and processed the webhook
        }
        catch (StripeException ex)
        {
            // Log Stripe-specific errors (like invalid signatures)
            this._logger.LogError(ex, "Stripe webhook error");
            return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
        }
        catch (Exception ex)
        {
            // Log any other unexpected errors
            this._logger.LogError(ex, "An unexpected error has occurred");
            return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected error");
        }
    }

    // Handle what happens when a payment fails
    private async Task HandlePaymentIntentFailed(PaymentIntent intent)
    {
        var order = await this._storeContext.Orders
             .Include(x => x.OrderItems)
             .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                 ?? throw new Exception("Order not found");

        foreach (var item in order.OrderItems)
        {
            var productItem = await this._storeContext.Products
                .FindAsync(item.ItemOrdered.ProductId)
                    ?? throw new Exception("Problem updating order stock");
            // Put the product back in stock since payment failed
            productItem.QuantityInStock += item.Quantity;
        }

        order.OrderStatus = OrderStatus.PaymentFailed;

        await this._storeContext.SaveChangesAsync();
    }

    // Handle what happens when a payment succeeds
    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
    {
        var order = await this._storeContext.Orders
             .Include(x => x.OrderItems)
             .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                 ?? throw new Exception("Order not found");
        if (order.GetTotal() != intent.Amount)
        {
            order.OrderStatus = OrderStatus.PaymentMismatch;
        }
        else
        {
            order.OrderStatus = OrderStatus.PaymentReceived;
        }

        var basket = await this._storeContext.Baskets.FirstOrDefaultAsync(x =>
            x.PaymentIntentId == intent.Id);

        if (basket != null) this._storeContext.Baskets.Remove(basket);

        await this._storeContext.SaveChangesAsync();
    }

    // Security method: Verifies the webhook actually came from Stripe
    // Uses webhook secret to validate the signature in the request header
    private Event ConstructStripeEvent(string json)
    {
        try
        {
            var whSecret = this._config["StripeSettings:WhSecret"];
            if (string.IsNullOrEmpty(whSecret))
            {
                this._logger.LogError("Webhook secret not configured");
                throw new StripeException("Webhook secret not configured");
            }

            var signature = Request.Headers["Stripe-Signature"].ToString();
            if (string.IsNullOrEmpty(signature))
            {
                this._logger.LogError("Missing Stripe-Signature header");
                throw new StripeException("Missing signature header");
            }

            // Stripe signs each webhook with a secret - we verify it matches
            return EventUtility.ConstructEvent(json, signature, whSecret, throwOnApiVersionMismatch: false);
        }
        catch (StripeException)
        {
            throw; // Re-throw Stripe exceptions as-is
        }
        catch (Exception ex)
        {
            this._logger.LogError(ex, "Failed to construct stripe event");
            throw new StripeException("Failed to construct event");
        }
    }
}

 