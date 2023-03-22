import { createContext, useEffect, useState, ReactNode } from 'react';

type CartData = {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
};

type CartcontextType = {
  cartData: CartData[];
  incrementItem: (title: string) => void;
  decrementItem: (title: string) => void;
  deleteItem: (title: string) => void;
  clearItems: () => void;
  totalItems: number;
  totalPrice: number;
};

export const Cartcontext = createContext<CartcontextType>({
  cartData: [],
  incrementItem: () => null,
  decrementItem: () => null,
  deleteItem: () => null,
  clearItems: () => null,
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState([] as CartData[]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const url = 'https://course-api.com/react-useReducer-cart-project';
    (async () => {
      const res = await fetch(url);
      const data = (await res.json()) as CartData[];
      setCartData(data);
    })();
  }, []);

  useEffect(() => {
    setTotalItems(cartData.reduce((acc, { amount }) => acc + amount, 0));
    setTotalPrice(
      Number(
        cartData
          .reduce((acc, { amount, price }) => acc + amount * +price, 0)
          .toFixed(2)
      )
    );
  }, [cartData]);

  const incrementItem = (title_: string) => {
    setCartData((prevMyData) =>
      prevMyData.map((item) =>
        title_ === item.title ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decrementItem = (title_: string) => {
    setCartData((prevMyData) =>
      prevMyData
        .map((item) =>
          title_ === item.title ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => !(item.title === title_ && item.amount === 0))
    );
  };

  const deleteItem = (name_: string) => {
    setCartData((prevCartData) =>
      prevCartData.filter((item) => item.title !== name_)
    );
  };

  const clearItems = () => {
    setCartData([]);
  };

  const value = {
    cartData,
    incrementItem,
    decrementItem,
    deleteItem,
    clearItems,
    totalItems,
    totalPrice,
  };

  return <Cartcontext.Provider value={value}>{children}</Cartcontext.Provider>;
};
