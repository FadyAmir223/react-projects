import { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';

const data = [
  {
    imgUrl: '0',
    name: 'SUSAN ANDERSEN',
    desc: 'the boss',
    text: 'Marfa af yr 3 wolf moon kogi, readymade distillery asymmetrical seitan kale chips fingerstache cloud bread mustache twee messenger bag.',
  },
  {
    imgUrl: '1',
    name: 'MARIA FERGUSON',
    desc: 'Office Manager',
    text: 'Fingerstache umami squid, kinfolk subway tile selvage tumblr man braid viral kombucha gentrify fanny pack raclette pok pok mustache.',
  },
  {
    imgUrl: '2',
    name: 'JOHN DOE',
    desc: 'Regular Guy',
    text: 'Gastropub sustainable tousled prism occupy. Viral XOXO roof party brunch actually, chambray listicle microdosing put a bird on it paleo subway tile squid umami.',
  },
  {
    imgUrl: '3',
    name: 'PETER SMITH',
    desc: 'Product Designer',
    text: 'Drinking vinegar polaroid street art echo park, actually semiotics next level butcher master cleanse hammock flexitarian ethical paleo.',
  },
];

const Slider = () => {
  const path = (url: string) => `./robohash/${url}.png`;

  const [currPerson, setCurrPerson] = useState(0);

  const handleChange = (idx: number) => {
    const direction = idx === 0 ? -1 : 1;
    setCurrPerson(
      (prevCurrPerson) =>
        (prevCurrPerson + direction + data.length) % data.length
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleChange(1);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currPerson]);

  return (
    <main className="h-screen flex items-center">
      <section className="bg-stone-800 px-6 py-7 w-full">
        <div className="container mx-auto max-w-xl relative flex overflow-hidden h-[400px]">
          {data.map(({ imgUrl, name, desc, text }, idx) => (
            <div key={imgUrl}>
              <article
                className={`text-center mx-auto absolute top-0 left-0 w-full h-full opacity-0 duration-500 ${
                  currPerson === idx
                    ? 'opacity-100'
                    : currPerson === idx + 1 ||
                      (currPerson === 0 && idx === data.length - 1)
                    ? 'translate-x-[100%]'
                    : '-translate-x-[100%]'
                }`}
              >
                <img
                  src={`${path(imgUrl)}`}
                  alt=""
                  className="mx-auto bg-black rounded-full max-w-[150px] mb-5 ring-1 ring-indigo-800"
                />
                <h3 className="text-violet-500 uppercase text-xl mb-2">
                  {name}
                </h3>
                <p className="capitalize text-stone-300 mb-7">{desc}</p>
                <p className="text-slate-500 leading-8 mb-5">{text}</p>
                <FaQuoteRight className="text-violet-500 mx-auto scale-[200%]" />
              </article>

              <div className="absolute top-0 left-0 w-full h-full">
                {[<FiChevronLeft />, <FiChevronRight />].map((i, idx) => (
                  <span
                    key={idx}
                    className={`text-3xl absolute top-1/2 -translate-y-1/2 cursor-pointer p-[1px] bg-gray-500 hover:bg-violet-700 duration-300 rounded-[4px] ${
                      idx === 0 ? 'left-0' : 'right-0'
                    }`}
                    onClick={() => handleChange(idx)}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Slider;
