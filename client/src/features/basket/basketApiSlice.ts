import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import type { Basket } from "@/app/models/Basket";
import type { Product } from "@/app/models/Product"; // Import Product type
import { createApi } from "@reduxjs/toolkit/query/react";

type MutateBasketItem = {
  productId: number;
  quantity: number;
  product?: Product; // ✅ ADD: Optional product details for new items
};

export const basketApiSlice = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  // Cache tag names for invalidation system
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    // Query: Fetch the basket
    fetchBasket: builder.query<Basket, void>({
      query: () => "/Basket",
      // Mark this cache entry with "Basket" tag
      providesTags: ["Basket"],
    }),
    // Mutation: for adding items to shopping basket
    addBasketItem: builder.mutation<Basket, MutateBasketItem>({
      query: ({ productId, quantity }) => ({
        url: `/Basket?productId=${productId}&quantity=${quantity}`,
        method: "POST",
      }),
      // Lifecycle hook - runs immediately when mutation starts
      async onQueryStarted(
        // Extract mutation arguments
        { productId, quantity, product },
        // RTK Query utilities
        { dispatch, queryFulfilled }
      ) {
        // 🚀 OPTIMISTIC UPDATE: Update cache instantly before server responds
        const patchResult = dispatch(
          // Manually update cached data
          basketApiSlice.util.updateQueryData(
            // Target the fetchBasket query cache
            "fetchBasket",
            undefined,
            // Immer draft - mutate cache safely
            (draft) => {
              if (!draft) return;
              // Search for existing product in cache
              const existingItem = draft.items.find(
                (item) => item.productId === productId
              );
              if (existingItem) {
                // ✅ Product already in cart - increase quantity immediately
                existingItem.quantity += quantity;
              } else if (product) {
                // ✅ New product - add to cache immediately with full details
                // Add new item to cached array
                draft.items.push({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  pictureUrl: product.pictureUrl,
                  quantity: quantity,
                  brand: product.brand,
                  type: product.type,
                });
              }
            }
          )
        );
        try {
          // To confirm the success of the actual server request and then
          // either finalize the optimistic update or revert it if an error
          // occurred.
          const { data: serverBasket } = await queryFulfilled;

          // ✅ Replace optimistic cache with real server data
          dispatch(
            // Update cache again
            basketApiSlice.util.updateQueryData(
              "fetchBasket",
              undefined,
              // Replace entire cache with server response
              () => serverBasket
            )
          );
        } catch {
          // ❌ Server request failed - undo optimistic changes
          // Revert cache to pre-optimistic state
          patchResult.undo();
        }
      },
    }),

    // Mutation: for removing items from shopping basket
    removeBasketItem: builder.mutation<void, MutateBasketItem>({
      query: ({ productId, quantity }) => ({
        url: `/Basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      // Optimistic update: Update UI immediately before server responds
      // This makes the app feel faster by updating the UI instantly
      async onQueryStarted(
        // The data user wants to remove
        { productId, quantity },
        // Redux tools for updating cache and waiting for server
        { dispatch, queryFulfilled }
      ) {
        // Step 1: Optimistically update the cached basket data in
        // Redux store.
        // This immediately updates the UI before the server responds
        const patchResult = dispatch(
          basketApiSlice.util.updateQueryData(
            // Update the cached data from fetchBasket query
            "fetchBasket",
            undefined,
            // Function to modify the cached basket data
            (draft) => {
              // Safety check: if no basket data exists, exit early
              if (!draft) return;
              // Find the item in the basket that user wants to remove
              const itemIndex = draft.items.findIndex(
                (item) => item.productId === productId
              );
              // Check if the item actually exists in the basket
              if (itemIndex >= 0) {
                // Item found: Reduce its quantity by the specified amount
                draft.items[itemIndex].quantity -= quantity;
                // If reducing quantity brings it to zero or below
                if (draft.items[itemIndex].quantity <= 0) {
                  // Remove the entire item from the basket array
                  // splice(index, 1) removes 1 item at the found index
                  draft.items.splice(itemIndex, 1);
                }
              }
              // Note: If item not found (itemIndex < 0), do nothing
            }
          )
        );
        try {
          // Step 2: ✅ Wait for the server to confirm the removal
          // queryFulfilled is a promise that resolves when server
          // responds successfully
          await queryFulfilled;
          // If we reach here: Server successfully processed the removal
          // The optimistic update we made above was correct, so keep it
        } catch {
          // Step 3: If server request failed (network error,
          // server error, etc.)
          // Undo the optimistic update we made to restore the
          // original basket state
          // This ensures UI reflects the true state when operations fail
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApiSlice;
