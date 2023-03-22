import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartData = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.cartData
);

export const selectTotalItems = createSelector([selectCartData], (cartData) =>
  cartData.reduce((acc, { amount }) => acc + amount, 0)
);

export const selectTotalPrice = createSelector([selectCartData], (cartData) =>
  Number(
    cartData
      .reduce((acc, { amount, price }) => acc + amount * +price, 0)
      .toFixed(2)
  )
);
