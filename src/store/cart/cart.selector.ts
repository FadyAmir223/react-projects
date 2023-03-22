import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CartData } from './cart.types';

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartData = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.cartData as CartData[]
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
