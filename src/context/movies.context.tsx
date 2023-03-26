import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

type MoviesContextProps = {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
};

export const MoviesContext = createContext<MoviesContextProps>({
  movies: [],
  setMovies: () => null,
});

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState([] as Movie[]);
  const value = { movies, setMovies };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};
