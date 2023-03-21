import { useState } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

const headerHeight = '68px';

const navLinks: { [key: string]: string[] } = {
  products: ['community', 'context', 'rules'],
  solutions: ['developers', 'content managers', 'business teams', 'ecommerce'],
  resources: ['starters', 'showcase'],
};

const StrApi = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="products/community" element={<Community />}></Route>
      </Route>
    </Routes>
  );
};

const Header = () => {
  const [navLink, setNavLink] = useState('');

  return (
    <>
      <header className="bg-blue-700">
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          <span className="font-bold text-3xl tracking-widest">strapi</span>
          <nav className="flex-1 flex justify-center capitalize text-xl">
            {Object.keys(navLinks).map((i) => (
              <a
                key={i}
                href="#"
                className="py-5 px-4"
                onMouseEnter={() => setNavLink(i)}
              >
                {i}
              </a>
            ))}
          </nav>

          {Object.keys(navLinks).map((i) => (
            <nav
              key={i}
              className={`absolute top-full w-full bg-slate-100/25 shadow-lg capitalize overflow-hidden transition-[height] ${
                navLink !== i ? 'h-0' : 'h-44'
              }`}
              onMouseLeave={() => setNavLink('')}
            >
              <div className="p-8">
                <h3 className="text-lg text-blue-700 mb-2 tracking-widest">
                  {i}
                </h3>
                <div className="">
                  {navLinks[i].map((j) => (
                    <Link
                      key={`${i + j}`}
                      to={`${i.replaceAll(' ', '-')}/${j.replaceAll(' ', '-')}`}
                      className="text-gray-300 block"
                    >
                      {j}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          ))}
        </div>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
};

const Home = () => {
  return (
    <main
      className="container px-6 mx-auto grid place-items-center text-center"
      style={{ height: `calc(100vh - ${headerHeight})` }}
    >
      <div className="">
        <h1 className="capitalize text-6xl font-bold leading-[70px] mb-5 max-w-2xl">
          manage any content any where
        </h1>
        <p className="max-w-xl mx-auto">
          Strapi is the leading open-source headless CMS. It’s 100% JavaScript
          and fully customizable.
        </p>
      </div>
    </main>
  );
};

const Community = () => (
  <main
    className="container px-6 mx-auto grid place-items-center text-center"
    style={{ height: `calc(100vh - ${headerHeight})` }}
  >
    <h1 className="text-5xl uppercase">Community</h1>
  </main>
);

export default StrApi;
