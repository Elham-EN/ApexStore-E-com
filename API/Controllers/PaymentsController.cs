
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe; // Stripe payment processing library


namespace API.Controllers;

public class PaymentsController : BaseApiController
{
    private PaymentsService _paymentsService;
    private StoreContext _storeContext;
    private IConfiguration _config; // Access to app settings (like Stripe secrets)
    private ILogger<PaymentsController> _logger; // For logging errors and info

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
    // TODO: Implement logic to update order status, notify user, etc.
    private async Task HandlePaymentIntentFailed(PaymentIntent intent)
    {
        throw new NotImplementedException();
    }

    // Handle what happens when a payment succeeds
    // TODO: Implement logic to create order, send confirmation email, etc.
    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
    {
        throw new NotImplementedException();
    }

    // Security method: Verifies the webhook actually came from Stripe
    // Uses webhook secret to validate the signature in the request header
    private Event ConstructStripeEvent(string json)
    {
        try
        {
            // Stripe signs each webhook with a secret - we verify it matches
            return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
                this._config["StripeSettings:WhSecret"]);
        }
        catch (Exception ex)
        {
            this._logger.LogError(ex, "Failed to construct stripe event");
            throw new StripeException("Invalid signature");
        }
    }
}

 