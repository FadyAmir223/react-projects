import { useState, useContext } from 'react';
import { FaTimes, FaHome, FaCalendarAlt } from 'react-icons/fa';
import { AiTwotoneFolderOpen, AiFillLinkedin } from 'react-icons/ai';
import { GoFile } from 'react-icons/go';
import { GiCutDiamond, GiHamburgerMenu } from 'react-icons/gi';
import { BsPeopleFill, BsFacebook, BsTwitter } from 'react-icons/bs';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Modal from '../components/modal';
import { SidebarContext, SidebarProvider } from '../context/navbar.context';

const sidebarLinks = [
  {
    icon: <FaHome key="" />,
    text: 'home',
  },
  {
    icon: <BsPeopleFill key="" />,
    text: 'team',
  },
  {
    icon: <AiTwotoneFolderOpen key="" />,
    text: 'projects',
  },
  {
    icon: <FaCalendarAlt key="" />,
    text: 'calendar',
  },
  {
    icon: <GoFile key="" />,
    text: 'ducuments',
  },
];

const contactSocial = [
  {
    icon: <BsFacebook />,
    path: 'facebook.com',
  },
  {
    icon: <BsTwitter />,
    path: 'twitter.com',
  },
  {
    icon: <AiFillLinkedin />,
    path: 'linkedin.com',
  },
  {
    icon: <GiCutDiamond />,
    path: 'diamond.com',
  },
];

const Navbar = () => {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<ModalPage />} />
          <Route path="home" element={<Home />} />
          {/* <Route path="" element={} /> */}
        </Route>
      </Routes>
    </SidebarProvider>
  );
};

const ModalPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { isSidebarOpen } = useContext(SidebarContext);

  const setShowModal_ = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <>
      <div
        className={`relative duration-300 ${
          isSidebarOpen ? 'left-96' : 'left-0'
        }`}
        style={{ width: `calc(100% - ${isSidebarOpen ? '24rem' : null})` }}
      >
        <Header />
        <main
          className="container mx-auto px-6 grid place-items-center"
          style={{ minHeight: `calc(100vh - 5rem)` }}
        >
          <button
            className=" capitalize text-sm px-2 py-1 bg-blue-300 hover:bg-blue-400 rounded-sm duration-200 tracking-wider"
            onClick={setShowModal_}
          >
            show modal
          </button>
        </main>
      </div>

      <Modal>
        <div
          className={`grid place-items-center fixed w-full h-full top-0 left-0 bg-black/50 transition-opacity duration-200  ${
            showModal ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <div className="relative p-4 bg-white grid place-items-center min-w-[60%] h-48">
            <FaTimes
              className="absolute top-4 right-4 text-red-600 cursor-pointer scale-[170%]"
              onClick={setShowModal_}
            />
            <h3 className="text-3xl capitalize tracking-wider">
              modal content
            </h3>
          </div>
        </div>
      </Modal>
    </>
  );
};

const Home = () => {
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
};

const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  return (
    <header className="container flex px-6 py-8 h-20">
      {!isSidebarOpen && (
        <GiHamburgerMenu
          className="text-blue-400 hover:text-blue-300 duration-150 cursor-pointer animate-scale animate-[scale_3s_ease-in-out_infinite]"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}
    </header>
  );
};

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  return (
    <>
      <div className="">
        <aside
          className={`fixed z-50 grid gap-y-10 top-0 w-96 h-screen pt-5 pb-7 bg-stone-900 duration-500 ${
            isSidebarOpen ? 'left-0' : '-left-96'
          }`}
          style={{ gridTemplateRows: `auto 1fr auto` }}
        >
          <div className="flex justify-between items-center px-5">
            <span className="">LOGO</span>
            <FaTimes
              className="inline-block scale-150 text-red-600 cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <nav>
            {sidebarLinks.map(({ icon, text }) => (
              <Link
                key={text}
                to={text}
                className="px-5 py-3 bg-stone-100/0 hover:bg-stone-100/100 capitalize text-xl block duration-700 text-gray-400"
              >
                <span className="mr-3 inline-block scale-125">{icon}</span>
                {text}
              </Link>
            ))}
          </nav>
          <div className="flex justify-center gap-x-7">
            {contactSocial.map(({ icon, path }) => (
              <a
                key={path}
                href={path}
                className="text-blue-400 scale-150  duration-150 hover:text-blue-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </aside>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
