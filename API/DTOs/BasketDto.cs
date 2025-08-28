

namespace API.DTOs;

// Shaping the Data into simplified structure to return back
// as response to the client application
public class BasketDto
{
    public required string BasketId { get; set; }
    public List<BasketItemDto> Items { get; set; } = [];
    public string? ClientSecret { get; set; }
    public string? PaymentIntentId { get; set; }
}

