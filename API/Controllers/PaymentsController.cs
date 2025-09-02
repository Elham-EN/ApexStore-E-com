
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class PaymentsController : BaseApiController
{
    private PaymentsService _paymentsService;
    private StoreContext _storeContext;

    public PaymentsController(PaymentsService paymentsService,
        StoreContext storeContext)
    {
        this._paymentsService = paymentsService;
        this._storeContext = storeContext;
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
}

