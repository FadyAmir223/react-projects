import axios from 'axios';
import {
  createContext,
  useEffect,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { useQuery } from 'react-query';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';

export type Article = {
  author: string;
  num_comments: number;
  objectID: string;
  points: number;
  title: string;
  url: string;
  hidden: boolean;
};

type News = {
  news: Article[];
  setNews: Dispatch<SetStateAction<Article[]>>;
  pages: number;
  query: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  currPage: number;
  handlePage: (direction: number) => void;
  isLoading: boolean;
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

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState([] as Article[]);
  const [pages, setPages] = useState(0);

  const [query, setQuery] = useState('react');
  const [currPage, setCurrPage] = useState(0);

  const debouncedQuery = useDebounce(query, 500);

  const { isLoading } = useQuery(
    ['articles', debouncedQuery, currPage],
    async () => {
      const url = `${API_ENDPOINT}query=${query.replace(
        ' ',
        '-'
      )}&page=${currPage}`;
      const {
        data: { hits, nbPages },
      } = await axios.get(url);

      setPages(nbPages);
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
    setCurrPage((prevCurrPage) => (prevCurrPage + direction + pages) % pages);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setCurrPage(0);
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
