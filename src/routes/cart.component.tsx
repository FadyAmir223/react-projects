import { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { BiDollar } from 'react-icons/bi';
import { CartProvider } from '../context/cart.context';
import { Cartcontext } from '../context/cart.context';

const Cart = () => {
  return (
    <CartProvider>
      <Cart_ />
    </CartProvider>
  );
};

const Cart_ = () => {
  const {
    cartData,
    totalItems,
    totalPrice,
    incrementItem,
    decrementItem,
    deleteItem,
    clearItems,
  } = useContext(Cartcontext);

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

      {cartData.length !== 0 ? (
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
          <div className="pt-4 my-14 border-t-2 border-t-gray-300 text-center">
            <div className="flex justify-between items-center">
              <span className="capitalize text-gray-300">total</span>
              <span className="tracking-widest px-[6px] py-[1px] bg-blue-700 rounded-md">
                {/* <BiDollar className="inline-block relative -top-[2px] left-[2px]" /> */}
                ${totalPrice}
              </span>
            </div>
            <button
              className="capitalize px-2 py-1 bg-gray-700 text-blue-700 hover:bg-violet-300 hover:text-blue-400 mt-7 rounded-md duration-200"
              onClick={clearItems}
            >
              clear cart
            </button>
          </div>
        </div>
      ) : (
        <div
          className="text-center pt-16"
          style={{ minHeight: 'calc(100vh - 56px)' }}
        >
          <h2 className="uppercase mb-8 text-3xl text-gray-300 tracking-wider">
            your bag
          </h2>
          <p className="tracking-widest text-gray-400 text-xl">
            is currently empty
          </p>
        </div>
      )}
    </main>
  );
};

export default Cart;
