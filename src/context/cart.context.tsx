import { createContext, useEffect, useState, ReactNode } from 'react';

export const Cartcontext = createContext({
  cartData: [],
  incrementItem: () => null,
  decrementItem: () => null,
  deleteItem: () => null,
  totalItems: 0,
  setTotalItems: () => null,
});

type CartData = {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState([] as CartData[]);
  const [totalItems, setTotalItems] = useState(0);

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

  return <Cartcontext.Provider>{children}</Cartcontext.Provider>;
};
