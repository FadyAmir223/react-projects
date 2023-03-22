import { CART_ACTIONS } from './cart.types';
import { AnyAction } from 'redux';

const INIT_STATE = {
  cartData: [],
};

export const cartReducer = (state = INIT_STATE, action = {} as AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS.SET_ITEMS:
      return {
        ...state,
        cartData: payload,
      };
    default:
      return state;
  }
};
