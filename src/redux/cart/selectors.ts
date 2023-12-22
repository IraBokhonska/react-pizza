import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;

// export const selectCartItemById = (id: string) => (state: RootState) =>
//   state.cart.items.find((obj: { id: string }) => obj.id === id);

export const selectCartItemById =
  (id: string, size: number, type: string, price: number) =>
  (state: RootState) =>
    state.cart.items.find(
      (obj: { id: string; size: number; type: string; price: number }) =>
        obj.id === id &&
        obj.size === size &&
        obj.type === type &&
        obj.price === price
    );
