import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
import { MoviesContext, MoviesProvider } from '../context/movies.context';

const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_OMDBAPI_ACCESS_KEY
}`;

const MoviesDB = () => (
  <MoviesProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movies/:id" element={<Movie />} />
    </Routes>
  </MoviesProvider>
);

const Home = () => {
  const { movies, setMovies } = useContext(MoviesContext);
  const [search, setSearch] = useState('batman');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      const url = `${API_ENDPOINT}&s=${search}`;

      setIsLoading(false);
      const {
        data: { Search, Error },
      } = await axios.get(url);
      setIsLoading(true);

      setMessage(Error ? Error : '');
      if (!Error) setMovies(Search);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <article className="bg-gray-100 min-h-screen">
      <section className="w-[90vw] mx-auto py-10">
        <form>
          <h1 className="capitalize text-3xl font-bold mb-3 text-gray-900">
            search movies
          </h1>
          <input
            type="text"
            name="search"
            id=""
            className="bg-white py-2 px-4 text-lg w-1/2 mb-2 text-blue-100"
            value={search}
            onChange={handleSearch}
          />
          <p className="text-red-800 tracking-widest uppercase text-sm">
            {message}
          </p>
        </form>
        {!isLoading ? (
          <Loader />
        ) : (
          <div
            className="grid gap-8 py-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
            }}
          >
            {movies.map(({ Title, Year, imdbID, Poster }) => (
              <Link
                to={`movies/${imdbID}`}
                className="relative group/movie overflow-hidden"
                key={imdbID}
              >
                <img
                  src={Poster}
                  alt={Title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 w-full p-2 bg-black/50 translate-y-full group-hover/movie:translate-y-0 duration-500">
                  <h4 className="font-bold mb-1 tracking-widest text-sm">
                    {Title}
                  </h4>
                  <p className="text-sm">{Year}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </article>
  );
};

type MatchMovie = {
  Title: string;
  Plot: string;
  Year: string;
  Poster: string;
};

const Movie = () => {
  const { id } = useParams();
  const [{ Title, Plot, Year, Poster }, setmovie] = useState({} as MatchMovie);

  useEffect(() => {
    (async () => {
      const url = `${API_ENDPOINT}&i=${id}`;
      const {
        data: { Title, Plot, Year, Poster },
      } = await axios.get(url);
      setmovie({ Title, Plot, Year, Poster });
    })();
  }, []);

  return Title ? (
    <main className="min-h-screen bg-gray-100">
      <section className="w-[90vw] mx-auto py-14 flex gap-x-6 flex-col md:flex-row">
        <img src={Poster} alt="" className="mx-auto" />
        <div>
          <h2 className="text-[40px] mt-5 md:mt-0 mb-3 font-bold leading-10 tracking-wider text-gray-300">
            {Title}
          </h2>
          <p className="mb-6 text-lg text-[#324d67] leading-[1.8] max-w-xl tracking-wider">
            {Plot}
          </p>
          <h4 className="font-bold mb-3">{Year}</h4>
          <Link
            to=".."
            className="capitalize tracking-widest text-white rounded-[4px] px-2 py-1 bg-[#49a6e9]"
          >
            back to movies
          </Link>
        </div>
      </section>
    </main>
  ) : (
    <Loader />
  );
};

const Loader = () => (
  <div className="mx-auto mt-16 w-20 h-20 rounded-full border-4 border-gray-300 border-t-gray-900 animate-spin"></div>
);

export default MoviesDB;
