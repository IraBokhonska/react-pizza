import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItemType, CartSliceState } from "./types";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const { id, size, type, price } = action.payload;

      const findItem = state.items.find(
        (obj) =>
          obj.id === id &&
          obj.size === size &&
          obj.type === type &&
          obj.price === price
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<CartItemType>) {
      const { id, size, type, price } = action.payload;

      const findItem = state.items.find(
        (obj) =>
          obj.id === id &&
          obj.size === size &&
          obj.type === type &&
          obj.price === price
      );

      if (findItem && findItem.count > 0) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      const { id, size, type, price } = action.payload;

      state.items = state.items.filter(
        (obj) =>
          !(
            obj.id === id &&
            obj.size === size &&
            obj.type === type &&
            obj.price === price
          )
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
