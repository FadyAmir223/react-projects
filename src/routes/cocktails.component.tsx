import { ChangeEvent, useEffect, useState, useContext } from 'react';
import { Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import {
  Cocktail,
  CocktailContext,
  CocktalProvider,
} from '../context/cocktail.context';

const headerHeight = '82px';

const Cocktails = () => (
  <CocktalProvider>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />;
        <Route path="about" element={<About />} />
        <Route path=":cocktail" element={<Details />}></Route>
      </Route>
    </Routes>
  </CocktalProvider>
);

const Header = () => (
  <>
    <header className="bg-white shadow-lg border-b-2 border-b-cocktails">
      <div className="container px-6 mx-auto flex justify-between items-center h-20">
        <Link
          to="/cocktails"
          className="text-xl uppercase text-cocktails tracking-widest"
        >
          logo
        </Link>
        <nav className="space-x-8">
          {[
            { text: 'home', to: '/cocktails' },
            { text: 'about', to: 'about' },
          ].map(({ text, to }) => (
            <Link
              key={text}
              to={to}
              className="capitalize text-lg font-light tracking-widest hover:text-cocktails duration-150"
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
    <Outlet />
  </>
);

const Home = () => {
  const [search, setSearch] = useState('');
  const [filtercocktails, setFilterCocktails] = useState([] as Cocktail[]);
  const { cocktails } = useContext(CocktailContext);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearch(searchText);
    setFilterCocktails(
      cocktails.filter(({ strDrink }) =>
        strDrink.toLocaleLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilterCocktails(cocktails);
  }, [cocktails]);

  return (
    <div
      className="bg-cocktailsMain"
      style={{ minHeight: `calc(100vh - ${headerHeight})` }}
    >
      <section className="container mx-auto px-6 py-20">
        <form className="bg-white px-8 py-10 shadow-lg shadow-black/60 rounded-lg">
          <label
            htmlFor="serch-box"
            className="block tracking-[0.25em] font-bold text-cocktails mb-4 capitalize"
          >
            search your favourite cocktail
          </label>
          <input
            type="text"
            name="serch-box"
            id="serch-box"
            className="w-full rounded-lg p-2 text-xl bg-cocktailsMain"
            value={search}
            onChange={handleSearch}
          />
        </form>
      </section>

      <main className="container mx-auto px-6 pb-20">
        <h1 className="text-center text-3xl tracking-widest font-bold capitalize mb-14">
          cocktails
        </h1>
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-lg">
          {filtercocktails.map(
            ({ idDrink, strDrink, strAlcoholic, strGlass, strDrinkThumb }) => (
              <div key={idDrink} className="shadow-lg shadow-black/60">
                <img src={strDrinkThumb} alt={strDrink} />
                <div className="bg-white p-6">
                  <h3 className="text-3xl mb-2 tracking-widest font-bold">
                    {strDrink}
                  </h3>
                  <h4 className="tracking-widest mb-3">{strGlass}</h4>
                  <p className="text-gray-600 mb-1">{strAlcoholic}</p>
                  <Link
                    to={`${idDrink}`}
                    className="tracking-[0.25em] px-2 py-1 text-white uppercase bg-cocktails rounded-md font-light text-sm"
                  >
                    details
                  </Link>
                </div>
              </div>
            )
          )}
        </section>
      </main>
    </div>
  );
};

const About = () => (
  <main
    className="bg-cocktailsMain"
    style={{ minHeight: `calc(100vh - ${headerHeight})` }}
  >
    <section className="container px-6 mx-auto py-20">
      <h1 className="text-center tracking-[0.25em] font-bold text-4xl capitalize text-gray-200 mb-12">
        about us
      </h1>
      <p className="max-w-2xl mx-auto text-gray-400 leading-7 tracking-[0.2em]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        repudiandae architecto qui adipisci in officiis, aperiam sequi atque
        perferendis eos, autem maiores nisi saepe quisquam hic odio consectetur
        nobis veritatis quasi explicabo obcaecati doloremque? Placeat ratione
        hic aspernatur error blanditiis?
      </p>
    </section>
  </main>
);

type ItemInfo = {
  name: string;
  category: string;
  info: string;
  glass: string;
  instructions: string;
  ingredients: string[];
};

type DetailsRouteParams = {
  cocktail: Cocktail[];
};

const Details = () => {
  const { cocktail } = useParams<keyof DetailsRouteParams>();
  const { cocktails } = useContext(CocktailContext);
  const item = cocktails.find(({ idDrink }) => idDrink === cocktail);

  const itemInfo: ItemInfo | undefined = item && {
    name: item?.strDrink,
    category: item?.strCategory,
    info: item?.strAlcoholic,
    glass: item?.strGlass,
    instructions: item?.strInstructions,
    ingredients: item?.strIngredient,
  };

  return (
    <main
      className="bg-cocktailsMain"
      style={{ minHeight: `calc(100vh - ${headerHeight})` }}
    >
      <section className="container px-6 mx-auto pt-16 pb-8">
        <Link
          to=".."
          className="tracking-[0.25em] px-4 py-2 text-cocktailsMain uppercase bg-cocktails rounded-md font-light text-xs block mx-auto w-fit hover:opacity-80 duration-300"
        >
          back home
        </Link>
        <h2 className="text-3xl text-center font-bold mt-6 mb-8 tracking-widest">
          {itemInfo?.name}
        </h2>
        <div className="flex justify-between items-center gap-x-12">
          <img
            src={`${item?.strDrinkThumb}`}
            alt={`${item?.strDrink}`}
            className="w-1/3"
          />
          <div className="space-y-4">
            {itemInfo &&
              Object.entries(itemInfo).map(([key, value]) => (
                <div key={key} className="space-x-5">
                  <span className="capitalize px-2 py-1 bg-cocktails rounded-md">
                    {key} :
                  </span>
                  {key !== 'ingredients' ? (
                    <span className="leading-8">{value}</span>
                  ) : (
                    Array.isArray(value) &&
                    value.map((ingredient: string) => (
                      <span key={ingredient}>{ingredient}</span>
                    ))
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cocktails;
