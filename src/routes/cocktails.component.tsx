import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

type Cocktails = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strDrinkThumb: string;
};

const Cocktails = () => (
  <Routes>
    <Route path="/" element={<Home />} />;
  </Routes>
);

const Home = () => {
  const [search, setSearch] = useState('');
  const [cocktails, setCocktails] = useState([] as Cocktails[]);
  const [filtercocktails, setFilterCocktails] = useState([] as Cocktails[]);

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
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    (async () => {
      const res = await fetch(url);
      const { drinks } = await res.json();

      setCocktails(
        drinks.map(
          ({
            idDrink,
            strDrink,
            strCategory,
            strAlcoholic,
            strGlass,
            strInstructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strDrinkThumb,
          }: Cocktails) => ({
            idDrink,
            strDrink,
            strCategory,
            strAlcoholic,
            strGlass,
            strInstructions,
            strDrinkThumb,
            strIngredient: [
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
            ],
          })
        )
      );
    })();
  }, []);

  useEffect(() => {
    setFilterCocktails(cocktails);
  }, [cocktails]);

  return (
    <div className="bg-cocktailsMain min-h-screen">
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

      <section className="container mx-auto px-6">
        <form className="my-20 bg-white px-8 py-10 shadow-lg shadow-black/60 rounded-lg">
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
                    to={`cocktail/${idDrink}`}
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

export default Cocktails;
