import { useEffect, memo } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { BiDollar } from 'react-icons/bi';
import {} from 'react-redux';
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
  selectCartData,
  selectTotalItems,
  selectTotalPrice,
} from '../store/cart/cart.selector';
import {
  clearItems,
  decrementItem,
  deleteItem,
  fetchItems,
  incrementItem,
} from '../store/cart/cart.actions';
import { CartData } from '../store/cart/cart.types';
import { store } from '../store/store';

const Cart = () => {
  return (
    <Provider store={store}>
      <Cart_ />
    </Provider>
  );
};

const Cart_ = () => {
  const cartData = useSelector(selectCartData);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  const dispatch = useDispatch();

  const fetchItems_ = (cartData: CartData[]) => dispatch(fetchItems(cartData));

  const clearItems_ = () => dispatch(clearItems());

  useEffect(() => {
    const url = 'https://course-api.com/react-useReducer-cart-project';
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      fetchItems_(data);
    })();
  }, []);

  return (
    <main>
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

        {cartData.length !== 0 ? (
          <>
            <div>
              {cartData.map((cartItem: CartData) => (
                <CartItem key={cartItem.id} {...cartItem} />
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
                className="capitalize px-2 py-1 bg-gray-800 text-blue-700 hover:bg-violet-300 hover:text-blue-400 mt-7 rounded-md duration-200"
                onClick={clearItems_}
              >
                clear cart
              </button>
            </div>
          </>
        ) : (
          <p className="tracking-widest text-gray-400 text-xl text-center">
            is currently empty
          </p>
        )}
      </div>
    </main>
  );
};

const CartItem = memo(({ id, img, title, price, amount }: CartData) => {
  const cartData = useSelector(selectCartData);

  const dispatch = useDispatch();

  const incrementItem_ = (title: string) =>
    dispatch(incrementItem(cartData, title));

  const decrementItem_ = (title: string) =>
    dispatch(decrementItem(cartData, title));

  const deleteItem_ = (title: string) => dispatch(deleteItem(cartData, title));

  return (
    <div key={id} className="flex justify-between items-center mb-4 last:mb-0">
      <div className="flex items-center">
        <img src={img} alt={title} className="mr-6 h-20" />
        <div>
          <h5 className="tracking-widest text-gray-700 -mb-[2px]">{title}</h5>
          <span className="text-gray-500 flex items-center relative -left-[3px] top-[2px] text-[15px]">
            <BiDollar className="inline-block relative -top-[1px]" />
            {price}
          </span>
          <button
            className="text-blue-600 text-sm"
            onClick={() => deleteItem_(title)}
          >
            remove
          </button>
        </div>
      </div>
      <div className="text-center">
        <IoIosArrowUp
          className="scale-150 cursor-pointer text-blue-600 hover:text-blue-400 duration-200"
          onClick={() => incrementItem_(title)}
        />
        <span>{amount}</span>
        <IoIosArrowDown
          className="scale-150 cursor-pointer text-blue-600 hover:text-blue-400 duration-200"
          onClick={() => decrementItem_(title)}
        />
      </div>
    </div>
  );
});

export default Cart;
