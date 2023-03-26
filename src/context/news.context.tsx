import axios from 'axios';
import {
  createContext,
  useEffect,
  ChangeEvent,
  ReactNode,
  useReducer,
} from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'usehooks-ts';

export type Article = {
  author: string;
  num_comments: number;
  objectID: string;
  points: number;
  title: string;
  url: string;
  hidden: boolean;
};

type State = {
  news: Article[];
  pages: number;
  query: string;
  currPage: number;
};

type Action =
  | { type: 'SET_NEWS'; payload: Article[] }
  | { type: 'SET_PAGES'; payload: number }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_CURRPAGE'; payload: number };

type News = State & {
  isLoading: boolean;
  setNews: (paylaod: Article[]) => void;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePage: (direction: number) => void;
};

export const NewsContext = createContext<News>({
  news: [],
  setNews: () => null,
  pages: 0,
  query: 'react',
  handleSearch: () => null,
  currPage: 0,
  handlePage: () => null,
  isLoading: false,
});

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_NEWS':
      return { ...state, news: payload };
    case 'SET_PAGES':
      return { ...state, pages: payload };
    case 'SET_QUERY':
      return { ...state, query: payload };
    case 'SET_CURRPAGE':
      return { ...state, currPage: payload };
    default:
      return state;
  }
};

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const initState = {
    news: [],
    pages: 0,
    query: 'react',
    currPage: 0,
  };

  const [{ news, pages, query, currPage }, dispatch] = useReducer(
    reducer,
    initState
  );

  const debouncedQuery = useDebounce(query, 500);

  const setNews = (payload: Article[]) =>
    dispatch({ type: 'SET_NEWS', payload });

  const { isLoading } = useQuery(
    ['articles', debouncedQuery, currPage],
    async () => {
      const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';
      const url = `${API_ENDPOINT}query=${query.replace(
        ' ',
        '-'
      )}&page=${currPage}`;
      const {
        data: { hits, nbPages },
      } = await axios.get(url);

      dispatch({ type: 'SET_PAGES', payload: nbPages });

      setNews(
        hits
          .map(
            ({ author, num_comments, points, title, url, objectID }: Article) =>
              title !== null && {
                author,
                num_comments,
                points,
                title,
                url,
                objectID,
                hidden: false,
              }
          )
          .filter(Boolean)
      );
    }
  );

  const handlePage = (direction: number) => {
    dispatch({
      type: 'SET_CURRPAGE',
      payload: (currPage + direction + pages) % pages,
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_QUERY', payload: e.target.value });
  };

  useEffect(() => {
    dispatch({ type: 'SET_CURRPAGE', payload: 0 });
  }, [debouncedQuery]);

  const value = {
    news,
    setNews,
    pages,
    query,
    handleSearch,
    currPage,
    handlePage,
    isLoading,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
