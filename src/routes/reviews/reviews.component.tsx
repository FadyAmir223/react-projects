import { useState } from 'react';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';

const path = (name: string) => `./robohash/${name}.png`;

const data = [
  {
    imgUrl: '0',
    name: 'Susan Smith',
    desc: 'WEB DEVELOPER',
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    imgUrl: '1',
    name: 'Anna Johnson',
    desc: 'WEB DESIGNER',
    text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
  },
  {
    imgUrl: '2',
    name: 'Peter Jones',
    desc: 'INTERN',
    text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
  },
  {
    imgUrl: '3',
    name: 'Bill Anderson',
    desc: 'THE BOSS',
    text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic.',
  },
];

const Reviews = () => {
  const [CurrPerson, setCurrPerson] = useState(0);

  const prevPerson = () => {
    setCurrPerson((prevCurrPerson) => (prevCurrPerson - 1) % data.length);
  };

  const nextPerson = () => {
    setCurrPerson((prevCurrPerson) => (prevCurrPerson + 1) % data.length);
  };

  return (
    <main className="container px-6 mx-auto flex items-center justify-center h-screen">
      <div className="max-w-xl p-10 m-30 shadow-lg bg-stone-900 rounded-sm text-center font-light">
        {data.map(({ imgUrl, name, desc, text }, idx) => (
          <div className={`${idx === CurrPerson ? 'block' : 'hidden'}`}>
            <div className="relative before:absolute before:w-full before:h-full before:bg-blue-900 before:left-1 before:bottom-1 before:rounded-full content after:w-12 after:h-12 after:bg-blue-900 after:absolute after:top-0 after:left-0 after:rounded-full mb-6 w-fit mx-auto">
              <img
                src={path(imgUrl)}
                alt=""
                className="w-44 rounded-full bg-black relative"
              />
            </div>
            <h3 className="capitalize text-3xl mb-1 font-normal">{name}</h3>
            <span className="text-blue-600 uppercase">{desc}</span>
            <p className="text-gray-500  mt-3 mb-4">{text}</p>
          </div>
        ))}
        <div className="flex gap-x-10 justify-center items-center mb-4">
          {[
            <TfiAngleLeft key="" onClick={prevPerson} />,
            <TfiAngleRight key="" onClick={nextPerson} />,
          ].map((i) => (
            <span className="scale-125 cursor-pointer hover:text-blue-700 duration-300">
              {i}
            </span>
          ))}
        </div>
        <button className="py-1 px-3 bg-white rounded-lg text-blue-600 capitalize duration-300 hover:text-white hover:bg-violet-300">
          subscribe me
        </button>
      </div>
    </main>
  );
};

export default Reviews;
