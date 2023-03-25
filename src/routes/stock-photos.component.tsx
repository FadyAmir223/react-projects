import { FormEvent, useEffect, useReducer } from 'react';
import { FaSearch } from 'react-icons/fa';

type Post = {
  photo: string;
  likes: number;
  name: string;
  portfolio_url: string;
  personImg: string;
  alt_description: string;
};

type PostProps = {
  alt_description: string;
  urls: {
    regular: string;
  };
  likes: number;
  user: {
    name: string;
    portfolio_url: string;
    profile_image: {
      medium: string;
    };
  };
};

type State = {
  posts: Post[];
  isLoading: boolean;
  page: number;
  newPage: boolean;
  searchField: string;
};

type Action =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_NEW_PAGE'; payload: boolean }
  | { type: 'SET_SEARCH_FIELD'; payload: string };

const initialState: State = {
  posts: [],
  isLoading: false,
  page: 1,
  newPage: false,
  searchField: '',
};

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_POSTS':
      return { ...state, posts: payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: payload };
    case 'SET_PAGE':
      return { ...state, page: payload };
    case 'SET_NEW_PAGE':
      return { ...state, newPage: payload };
    case 'SET_SEARCH_FIELD':
      return { ...state, searchField: payload };
    default:
      return state;
  }
};

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const StockPhotos = () => {
  const [{ posts, isLoading, page, newPage, searchField }, dispatch] =
    useReducer(reducer, initialState);

  const fetchPosts = async () => {
    if (isLoading) return;

    let url =
      searchField !== ''
        ? `${searchUrl}?client_id=${accessKey}&page=${page}&query=${searchField}`
        : `${mainUrl}?client_id=${accessKey}&page=${page}`;

    try {
      dispatch({ type: 'SET_IS_LOADING', payload: true });
      const res = await fetch(url);
      const data = await res.json();

      const results = searchField !== '' ? data.results : data;

      const newPosts = results.map(
        ({
          alt_description,
          urls: { regular },
          likes,
          user: {
            name,
            portfolio_url,
            profile_image: { medium },
          },
        }: PostProps) => ({
          alt_description,
          photo: regular,
          likes,
          name,
          portfolio_url,
          personImg: medium,
        })
      );

      dispatch({
        type: 'SET_POSTS',
        payload: page === 1 ? newPosts : [...posts, ...newPosts],
      });
    } finally {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
      dispatch({ type: 'SET_NEW_PAGE', payload: false });
    }
  };

  useEffect(() => {
    addEventListener('scroll', handleScroll);
    return () => {
      removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (scrollY + innerHeight >= document.documentElement.scrollHeight)
      dispatch({ type: 'SET_NEW_PAGE', payload: true });
  };

  useEffect(() => {
    if (!isLoading && newPage)
      dispatch({ type: 'SET_PAGE', payload: page + 1 });
  }, [newPage]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'SET_PAGE', payload: 1 });
    if (page === 1) fetchPosts();
  };

  return (
    <main className="min-h-screen mx-auto w-[90vw] px-3 py-20">
      <form
        className="flex pb-20 w-full md:w-1/2 group"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="searchField"
          id=""
          className="border-b-[3px] border-b-gray-500 py-1 px-3 md:py-3 md:px-5 bg-transparent focus:outline-0 text-2xl w-full"
          value={searchField}
          onChange={(e) =>
            dispatch({ type: 'SET_SEARCH_FIELD', payload: e.target.value })
          }
        />
        <button className="border-b-[3px] border-b-gray-500 text-gray-500 p-3 bg-transparent text-2xl">
          <FaSearch />
        </button>
      </form>
      <section
        className="grid gap-8 py-"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))' }}
      >
        {posts.map(
          ({
            photo,
            alt_description,
            likes,
            name,
            personImg,
            portfolio_url,
          }) => (
            <article
              key={photo}
              className="h-64 relative group overflow-hidden"
            >
              <img
                src={photo}
                alt={alt_description}
                className="object-cover w-full h-full"
              />
              <div className="absolute left-0 w-full p-4 bg-black/40 flex justify-between items-center duration-500 group-hover:-translate-y-full">
                <div className="text-white">
                  <h4 className="font-bold tracking-widest capitalize mb-2">
                    {name}
                  </h4>
                  <p className="">{likes} likes</p>
                </div>
                <a href={portfolio_url}>
                  <img
                    src={personImg}
                    alt={name}
                    className="rounded-full w-10 h-10"
                  />
                </a>
              </div>
            </article>
          )
        )}
      </section>
      {isLoading && (
        <p className="text-5xl capitalize font-bold text-center mt-10">
          loading...
        </p>
      )}
    </main>
  );
};

export default StockPhotos;
