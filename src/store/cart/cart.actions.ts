import { CartData, CART_ACTIONS } from './cart.types';

type ActionWithPayload<T> = {
  type: string;
  payload: T;
};

const createAction = <T>(type: string, payload: T): ActionWithPayload<T> => ({
  type,
  payload,
});

export const fetchItems = (cartData: CartData[]) =>
  createAction(CART_ACTIONS.SET_ITEMS, cartData);

export const incrementItem = (cartData: CartData[], title_: string) => {
  const payload = cartData.map((item) =>
    title_ === item.title ? { ...item, amount: item.amount + 1 } : item
  );
  return createAction(CART_ACTIONS.SET_ITEMS, payload);
};

export const decrementItem = (cartData: CartData[], title_: string) => {
  const payload = cartData
    .map((item) =>
      title_ === item.title ? { ...item, amount: item.amount - 1 } : item
    )
    .filter((item) => !(item.title === title_ && item.amount === 0));

  return createAction(CART_ACTIONS.SET_ITEMS, payload);
};

export const deleteItem = (cartData: CartData[], title_: string) => {
  const payload = cartData.filter((item) => item.title !== title_);
  return createAction(CART_ACTIONS.SET_ITEMS, payload);
};

export const clearItems = () => createAction(CART_ACTIONS.SET_ITEMS, []);
