import { createContext, ReactNode, useState, useEffect } from 'react';

export type Cocktail = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient: string[];
};

type CocktalProvider = {
  cocktails: Cocktail[];
};

export const CocktailContext = createContext<CocktalProvider>({
  cocktails: [],
});

export const CocktalProvider = ({ children }: { children: ReactNode }) => {
  const [cocktails, setCocktails] = useState([]);

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
            strDrinkThumb,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
          }) => ({
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

  const value = {
    cocktails,
  };

  return (
    <CocktailContext.Provider value={value}>
      {children}
    </CocktailContext.Provider>
  );
};
