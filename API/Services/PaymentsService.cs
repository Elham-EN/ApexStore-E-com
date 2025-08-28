
using API.Models;
using Stripe;

namespace API.Services;

// Work with third party services like Stripe
public class PaymentsService
{
    private readonly IConfiguration _config;

    public PaymentsService(IConfiguration config)
    {
        this._config = config;
    }

    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
    {
        StripeConfiguration.ApiKey = this._config["StripeSettings:SecretKey"];
        // Provides methods to interact with the Payment Intents API
        var service = new PaymentIntentService();
        // The PaymentIntent is a core object in Stripe's payment processing system 
        // that tracks a payment from creation through the checkout process. It 
        // represents a single payment session and encapsulates all the details 
        // needed to complete a payment.
        var intent = new PaymentIntent();
        // Calculate subtotal based on what is inside the basket
        var subtotal = basket.Items.Sum(x => x.Quantity * x.Product.Price);
        // Calculate delivery fee based on the subtotal: if user's order is over
        // $100, then delivry is free if below $100, charge user fee of $5
        var deliverFee = subtotal > 10000 ? 0 : 500;
        // IF it's empty, then it's a new payment intent first time
        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = subtotal + deliverFee,
                Currency = "usd",
                PaymentMethodTypes = ["card"] // Accept card payment
            };
            // Create that payment intent
            intent = await service.CreateAsync(options);
        }
        // Else we're updating the payment intent
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = subtotal + deliverFee
            };
            await service.UpdateAsync(basket.PaymentIntentId, options);
        }
        return intent;
    }
}
