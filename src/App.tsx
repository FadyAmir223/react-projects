import { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import projectData from './database/projects.data.json';
// import './App.css';

const BirthdayBuddy = lazy(
  () => import('./routes/birthday-buddy/birthday-buddy.component')
);
const Home = lazy(() => import('./routes/home/home.component'));
const Tours = lazy(() => import('./routes/tours/tours.component'));
const Reviews = lazy(() => import('./routes/reviews/reviews.component'));
const Accorion = lazy(() => import('./routes/accordion.component'));
const Menu = lazy(() => import('./routes/menu.component'));
const Tabs = lazy(() => import('./routes/tabs.component'));
const Slider = lazy(() => import('./routes/slider.component'));
const LoremIpsum = lazy(() => import('./routes/lorem-pusum.component'));
const ColorGen = lazy(() => import('./routes/color-gen.component'));
const Grocery = lazy(() => import('./routes/grocery.component'));
const Navbar = lazy(() => import('./routes/navbar.component'));
const SidebarModal = lazy(() => import('./routes/sidebar-modal.component'));
const StrApi = lazy(() => import('./routes/strapi.component'));
const Cart = lazy(() => import('./routes/cart.component'));
const Cocktails = lazy(() => import('./routes/cocktails.component'));
const Ecommerce = lazy(() => import('./routes/e-commerce.component'));
const Jobster = lazy(() => import('./routes/jobster.component'));
const GithubUsers = lazy(() => import('./routes/github-users.component'));
const SliderAdv = lazy(() => import('./routes/slider-adv.component'));
const StripeMenu = lazy(() => import('./routes/stripe-menu.component'));
const MarkdownPreview = lazy(
  () => import('./routes/markdown-preview.component')
);
const RandomPerson = lazy(() => import('./routes/random-person.component'));
const Pagination = lazy(() => import('./routes/pagination.component'));
const StockPhotos = lazy(() => import('./routes/stock-photos.component'));
const DarkMode = lazy(() => import('./routes/dark-mode.component'));
const MoviesDB = lazy(() => import('./routes/movies-db.component'));
const HackerNews = lazy(() => import('./routes/hacker-news.component'));
const Quiz = lazy(() => import('./routes/quiz.component'));

const routes = [
  <BirthdayBuddy />,
  <Tours />,
  <Reviews />,
  <Accorion />, //
  <Menu />,
  <Tabs />, //
  <Slider />,
  <LoremIpsum />,
  <ColorGen />, //

  <Grocery />,
  <Navbar />,
  <SidebarModal />,
  <StrApi />,
  <Cart />,
  <Cocktails />,
  <Ecommerce />,
  <Jobster />,
  <GithubUsers />,
  <SliderAdv />,
  <StripeMenu />,
  <MarkdownPreview />,
  <RandomPerson />,
  <Pagination />,
  <StockPhotos />,
  <DarkMode />,
  <MoviesDB />,
  <HackerNews />,
  <Quiz />,
];

function App() {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        {routes.map((element, idx) => {
          const allProjects = [
            ...projectData.fundamentalprojectData,
            ...projectData.complexProjectData,
            ...projectData.additionalProjectData,
          ];
          const path = allProjects[idx].replace(' ', '-').toLowerCase();
          return <Route key={path} path={path} element={element} />;
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
