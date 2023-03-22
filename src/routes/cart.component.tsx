import { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { BiDollar } from 'react-icons/bi';

type CartData = {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
};

const Cart = () => {
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

  return (
    <main className="">
      <header className="bg-blue-600">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <span className="text-2xl tracking-wider">UseReducer</span>
          <span className="relative">
            <FaCartPlus className="w-7 h-7" />
            {cartData.length !== 0 && (
              <span className="absolute w-5 h-5 rounded-full bg-stone-900 justify-center flex items-center -top-[6px] -right-[10px] text-sm">
                {totalItems}
              </span>
            )}
          </span>
        </div>
      </header>

      <div className="container mx-auto px-6 pt-16">
        <h2 className="uppercase text-4xl mb-5 text-center tracking-wide">
          your bag
        </h2>
        <div className="">
          {cartData.map(({ id, img, title, price, amount }) => (
            <div
              key={id}
              className="flex justify-between items-center mb-4 last:mb-0"
            >
              <div className="flex items-center">
                <img src={img} alt={title} className="mr-6 h-20" />
                <div className="">
                  <h5 className="tracking-widest text-gray-700 -mb-[2px]">
                    {title}
                  </h5>
                  <span className="text-gray-500 flex items-center relative -left-[3px] top-[2px] text-[15px]">
                    <BiDollar className="inline-block relative -top-[1px]" />
                    {price}
                  </span>
                  <button
                    className="text-blue-600 text-sm"
                    onClick={() => deleteItem(title)}
                  >
                    remove
                  </button>
                </div>
              </div>
              <div className="text-center">
                <IoIosArrowUp
                  className="scale-150 cursor-pointer text-blue-600 hover:text-blue-400 duration-200"
                  onClick={() => incrementItem(title)}
                />
                <span className="">{amount}</span>
                <IoIosArrowDown
                  className="scale-150 cursor-pointer text-blue-600 hover:text-blue-400 duration-200"
                  onClick={() => decrementItem(title)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Cart;
