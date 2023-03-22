import { useState } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaTimes } from 'react-icons/fa';
import Modal from '../components/modal';

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
        <Route path="products/community" element={<GenenralDemo />}></Route>

        {/* {Object.keys(navLinks).map((mainLink) =>
          navLinks[mainLink].map(({ subLink, component }) => (
            <Route path={`${mainLink}/${subLink}`} element={component}></Route>
          ))
        )} */}
      </Route>
    </Routes>
  );
};

const Header = () => {
  const [navLink, setNavLink] = useState('');
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleIsOpenSidebar = () => {
    setIsOpenSidebar((prevIsOpenSidebar) => !prevIsOpenSidebar);
  };

  return (
    <>
      <header className="bg-blue-700 h-[68px] flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          <span className="font-bold text-3xl tracking-widest">strapi</span>
          <span
            className="md:hidden scale-[170%] cursor-pointer"
            onClick={toggleIsOpenSidebar}
          >
            <RxHamburgerMenu />
          </span>

          <Modal>
            <aside
              className={`md:hidden fixed top-0 left-0 w-screen h-screen bg-white  transition-opacity duration-700 ${
                isOpenSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <span onClick={toggleIsOpenSidebar}>
                <FaTimes className="absolute top-5 right-5 text-blue-700 scale-[200%] cursor-pointer" />
              </span>

              <div className="p-10">
                {Object.keys(navLinks).map((navlink) => (
                  <div key={navlink} className="mb-8 last:mb-0">
                    <h4 className="mb-1 text-blue-700 capitalize tracking-widest text-[22px]">
                      {navlink}
                    </h4>
                    <nav className="capitalize">
                      {navLinks[navlink].map((sublink) => (
                        <Link
                          key={`${navlink + sublink}`}
                          to={`${navlink.replaceAll(
                            ' ',
                            '-'
                          )}/${sublink.replaceAll(' ', '-')}`}
                          className="text-gray-300/95 w-1/2 inline-block"
                          onClick={toggleIsOpenSidebar}
                        >
                          {sublink}
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </aside>
          </Modal>

          <nav className="hidden md:flex flex-1 justify-center capitalize text-xl">
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
      <Outlet />
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

const GenenralDemo = () => (
  <main
    className="container px-6 mx-auto grid place-items-center text-center"
    style={{ height: `calc(100vh - ${headerHeight})` }}
  >
    <h1 className="text-5xl uppercase">demo</h1>
  </main>
);

export default StrApi;
