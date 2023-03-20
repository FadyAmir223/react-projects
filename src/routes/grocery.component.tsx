import { FormEvent, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiFillExclamationCircle } from 'react-icons/ai';

type Items = {
  text: string;
  done: boolean;
};

type AlertType = 'success' | 'error';

const Grocery = () => {
  const [items, setItems] = useState([] as Items[]);
  const [alert, setAlert] = useState({
    exist: false,
    text: '',
    type: '' as AlertType,
  });

  const setAlert_ = (text: string, type: AlertType) => {
    setAlert({ exist: true, text, type });
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const itemText = (
      (e.target as HTMLFormElement).elements.namedItem(
        'item'
      ) as HTMLInputElement
    )?.value;

    const itemExist = items.find((item) => item.text === itemText);

    if (itemText === '') setAlert_('please provide a value', 'error');
    else if (itemExist !== undefined) setAlert_('item already exests', 'error');
    else {
      setItems((prevItems) => [...prevItems, { text: itemText, done: false }]);
      setAlert_('item added', 'success');
    }
  };

  const handleDelete = (idx: number) => {
    setItems((prevItems) => prevItems.filter((_, idx_) => idx !== idx_));
    setAlert({ exist: true, text: 'item deleted', type: 'success' });
  };

  const handleDone = (idx: number) => {
    setItems((prevItems) =>
      prevItems.map((item, idx_) =>
        idx === idx_ ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <main className="container mt-28 px-6">
      {alert.exist && (
        <Alert text={alert.text} removeAlert={setAlert} type={alert.type} />
      )}

      <section className="max-w-lg mx-auto bg-black p-6 text-white">
        <h1 className="capitalize text-xl text-center mb-4">grocery bud</h1>
        <form action="" className="flex mb-5" onSubmit={(e) => handleAdd(e)}>
          <input
            type="text"
            name="item"
            className="flex-1 rounded-l-md border-[1px] border-r-0 border-gray-500 bg-transparent px-3 py-1 text-sm"
          />
          <button className="capitalize bg-green-600 py-[2px] px-4 rounded-r-md">
            add item
          </button>
        </form>
        {items.map(({ text, done }, idx) => (
          <div
            key={text}
            className="flex justify-between items-center mb-3 last:mb-0"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="mr-4"
                checked={done}
                onChange={() => handleDone(idx)}
              />
              <span
                className={`text-sm tracking-wide ${
                  done ? 'line-through' : null
                }`}
              >
                {text}
              </span>
            </div>
            <button
              className="capitalize px-1 bg-transparent hover:bg-green-600 rounded-md duration-500 cursor-pointer"
              onClick={() => handleDelete(idx)}
            >
              delete
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

type AlertProps = {
  text: string;
  removeAlert: Function;
  type: AlertType;
};

const Alert = ({ text, type, removeAlert: hardRemove }: AlertProps) => {
  const timeSlice = 20;
  const initTime = 3000;

  const [hidden, setHidden] = useState(true);
  const [time, setTime] = useState(initTime);

  useEffect(() => {
    setHidden(false);

    const alertTime = setInterval(() => {
      setTime((prevTime) => prevTime - timeSlice);
    }, timeSlice);

    const clearDuration = setTimeout(() => {
      clearInterval(alertTime);
      handleHide();
    }, initTime);

    return () => {
      clearTimeout(clearDuration);
    };
  }, []);

  const handleHide = () => {
    setHidden(true);
    setTimeout(() => {
      hardRemove({ exist: false });
    }, 500);
  };

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 px-3 py-5 z-50 shadow-lg bg-gray-900 rounded-lg min-w-[400px] flex items-center overflow-hidden animate-bounce duration-500 cursor-pointer ${
        hidden ? '-top-16' : 'top-8'
      }`}
      onClick={handleHide}
    >
      <FaTimes className="absolute top-3 right-3 cursor-pointer" />
      <AiFillExclamationCircle className="inline-block mr-2 scale-[115%]" />
      <span className="capitalize text-sm">{text}</span>
      <span
        className={`absolute bottom-0 left-0 h-1 ${
          type === 'success' ? 'bg-green-700' : 'bg-red-700'
        }`}
        style={{ width: `${(time / initTime) * 100}%` }}
      ></span>
    </div>
  );
};

export default Grocery;
