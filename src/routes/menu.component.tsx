import { useState } from 'react';

const path = './robohash/';

type MenuItem = {
  imgUrl: string;
  title: string;
  text: string;
  price: string;
};

type Menu = {
  [category: string]: MenuItem[];
};

const menu: Menu = {
  all: [],
  breakfast: [
    {
      imgUrl: '0',
      title: 'Buttermilk Pancakes',
      text: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed",
      price: '15.99',
    },
    {
      imgUrl: '1',
      title: 'Country Delight',
      text: 'Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut,',
      price: '20.99',
    },
    {
      imgUrl: '2',
      title: 'Bacon Overflow',
      text: 'carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird',
      price: '8.99',
    },
  ],
  lunch: [
    {
      imgUrl: '4',
      title: 'Diner Double',
      text: 'vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats',
      price: '13.99',
    },
    {
      imgUrl: '5',
      title: 'Egg Attack',
      text: "franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up",
      price: '22.99',
    },
    {
      imgUrl: '6',
      title: 'American Classic',
      text: 'on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut',
      price: '12.99',
    },
  ],
  shakes: [
    {
      imgUrl: '7',
      title: 'Godzilla Milkshake',
      text: 'ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.',
      price: '6.99',
    },
    {
      imgUrl: '8',
      title: 'Oreo Dream',
      text: 'Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday',
      price: '18.99',
    },
    {
      imgUrl: '9',
      title: 'Quarantine Buddy',
      text: 'skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.',
      price: '16.99',
    },
  ],
};

menu.all = [...menu.breakfast, ...menu.lunch, ...menu.shakes];

const Menu = () => {
  const [category, setCategory] = useState('all');

  const handleSelect = (category: string) => {
    setCategory(category);
  };

  const path = (url: string) => `./robohash/${url}.png`;

  return (
    <main className="container mx-auto px-6 py-16">
      <header className="text-center relative text-4xl capitalize pb-3 mb-9 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-1 before:bg-orange-500">
        our menu
      </header>

      <section>
        <ul className="flex gap-x-3 justify-center mb-16">
          {Object.keys(menu).map((i) => (
            <li
              key={i}
              className="bg-orange-500 px-3 py-1 rounded-md capitalize text-sm cursor-pointer duration-300 hover:bg-orange-800"
              onClick={() => handleSelect(i)}
            >
              {i}
            </li>
          ))}
        </ul>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menu[category].map(({ imgUrl, title, text, price }) => (
            <div key={title} className="shadow-lg rounded-lg w-fit">
              <img src={`${path(imgUrl)}`} alt="" className="bg-black" />
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">{title}</span>
                  <span className="py-[1px] text-sm px-2 rounded-md text-white bg-orange-500">
                    $ {price}
                  </span>
                </div>
                <p className="text-gray-500 leading-7 text-sm">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Menu;
