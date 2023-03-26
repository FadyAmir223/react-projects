import { useState } from 'react';

const data = [
  {
    title: 'The WET Codbase',
    p1: 'Sunday 4th, 2020  11 min read',
    p2: 'Come waste your time with me',
  },
  {
    title: 'Goodby, Clean Code',
    p1: 'Friday 22nd, 2019  5 min read',
    p2: 'Let clean code guide you. Then let it go.',
  },
  {
    title: 'My Decade In Review',
    p1: 'Saturday 11th, 2018  5 min read',
    p2: 'A personal reflection.',
  },
  {
    title: 'What Are The React Team Principles',
    p1: 'Thursday 4th, 2015  5 min read',
    p2: 'UI Before API.',
  },
];

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <main className={`${darkMode ? 'dark' : null}`}>
      <section className="dark:bg-[#282C35] duration-500">
        <article className="container px-20 mx-auto py-10 min-h-screen">
          <div className="flex justify-between items-center mb-16">
            <h1 className="dark:text-white text-3xl font-bold capitalize duration-500">
              overreacted
            </h1>
            <button
              className="py-1 px-2 rounded-md bg-red-800 dark:bg-red-400 text-white dark:text-[#282C35] capitalize tracking-widest text-sm duration-500"
              onClick={handleClick}
            >
              toggle
            </button>
          </div>
          {data.map(({ title, p1, p2 }) => (
            <div key={title} className="mb-8 last:mb-0">
              <h3 className="text-red-800 dark:text-red-400 text-2xl capitalize tracking-wider mb-1 duration-500">
                {title}
              </h3>
              <p className="dark:text-white text-sm mb-2 italic duration-500">
                {p1}
              </p>
              <p className="dark:text-white text-sm duration-500">{p2}</p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
};

export default DarkMode;
