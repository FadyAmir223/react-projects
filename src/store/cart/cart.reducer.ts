import { CART_ACTIONS, CartData } from './cart.types';
import { AnyAction } from 'redux';

const INIT_STATE = {
  cartData: [] as CartData[],
};

export const cartReducer = (state = INIT_STATE, action = {} as AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS.SET_ITEMS:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
};
