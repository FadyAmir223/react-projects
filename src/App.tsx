import { useEffect } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import projectData from './database/projects.data.json';

import BirthdayBuddy from './routes/birthday-buddy/birthday-buddy.component';
import Home from './routes/home/home.component';
import Tours from './routes/tours/tours.component';
import Reviews from './routes/reviews/reviews.component';
import Accorion from './routes/accordion.component';
import Menu from './routes/menu.component';
import Tabs from './routes/tabs.component';
import Slider from './routes/slider.component';
import LoremIpsum from './routes/lorem-pusum.component';
import ColorGen from './routes/color-gen.component';
import Grocery from './routes/grocery.component';
import Navbar from './routes/navbar.component';
import SidebarModal from './routes/sidebar-modal.component';
import StrApi from './routes/strapi.component';
import Cart from './routes/cart.component';
import Cocktails from './routes/cocktails.component';
import Ecommerce from './routes/e-commerce.component';
import Jobster from './routes/jobster.component';
import GithubUsers from './routes/github-users.component';
import SliderAdv from './routes/slider-adv.component';
import StripeMenu from './routes/stripe-menu.component';
import MarkdownPreview from './routes/markdown-preview.component';
import RandomPerson from './routes/random-person.component';
import Pagination from './routes/pagination.component';
import StockPhotos from './routes/stock-photos.component';
import DarkMode from './routes/dark-mode.component';
import MoviesDB from './routes/movies-db.component';
import HackerNews from './routes/hacker-news.component';
import Quiz from './routes/quiz.component';

const routes = [
  <BirthdayBuddy />,
  <Tours />,
  <Reviews />,
  <Accorion />,
  <Menu />,
  <Tabs />,
  <Slider />,
  <LoremIpsum />,

  <ColorGen />,
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
  );
}

export default App;
