export type CartData = {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
};

export enum CART_ACTIONS {
  SET_ITEMS = 'cart/SET_ITEMS',
  INC_ITEM = 'cart/INC_ITEM',
  DEC_ITEM = 'cart/DEC_ITEM',
  REMOVE_ITEM = 'cart/REMOVE_ITEM',
  CLEAR_ITEMS = 'cart/CLEAR_ITEMS',
}
