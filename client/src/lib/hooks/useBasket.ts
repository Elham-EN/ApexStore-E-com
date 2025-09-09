import {
  useClearBasketMutation,
  useFetchBasketQuery,
} from "@/features/basket/basketApiSlice";

export function useBasket() {
  const { data: basket } = useFetchBasketQuery();
  const [clearBasket] = useClearBasketMutation();
  const subtotal = basket?.items.reduce(
    (accItem, currItem) => accItem + currItem.price * currItem.quantity,
    0
  ) as number;
  // Delivery fee in cents ($10.00 = 1000 cents)
  const deliveryFee: number = 1000;
  // Discount as percentage (10% = 0.10)
  const discountPercentage: number = 0.1;
  const discountAmount = Math.round(subtotal * discountPercentage);
  const total = subtotal + deliveryFee - discountAmount;

  return { deliveryFee, discountAmount, total, subtotal, basket, clearBasket };
}
