import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

type Article = {
  author: string;
  num_comments: number;
  objectID: string;
  points: number;
  title: string;
  url: string;
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const HackerNews = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Home />
    </QueryClientProvider>
  );
};

const Home = () => {
  const [query, setQuery] = useState('react');
  const [pages, setPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['articles', query, currPage],
    async () => {
      const url_ = `${API_ENDPOINT}query=${query}&page=${currPage}`;
      const {
        data: { hits, nbPages },
      } = await axios.get(url_);

      setPages(nbPages);

      return hits.map(
        ({ author, num_comments, points, title, url, objectID }: Article) => ({
          author,
          num_comments,
          points,
          title,
          url,
          objectID,
        })
      );
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrPage(1);
  };

  const handlePage = (direction: number) => {
    setCurrPage(
      (prevCurrPage) => ((prevCurrPage - 1 + direction + pages) % pages) + 1
    );
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="w-[90vw] px-3 mx-auto py-10">
        <form>
          <h1 className="font-bold capitalize text-4xl tracking-wider text-gray-900 mb-7">
            search hacker news
          </h1>
          <input
            type="text"
            name=""
            id=""
            className="max-w-[600px] w-full bg-transparent p-4 text-[#324d67] border-b-[3px] border-b-[#bcccdc] tracking-widest"
            value={query}
            onChange={handleSearch}
          />
        </form>

        {isLoading ? (
          <div className="mx-auto w-16 h-16 rounded-full border-[3px] border-gray-700 border-t-gray-300 animate-[spin_1.5s_ease-in-out_infinite] mt-20"></div>
        ) : (
          <>
            <div className="text-center select-none my-12">
              <span
                className="px-2 py-1 capitalize bg-[#49a6e9] text-white cursor-pointer rounded-[4px] tracking-widest"
                onClick={() => handlePage(-1)}
              >
                prev
              </span>
              <span className="mx-4 text-gray-800 font-bold text-lg">
                {currPage} of {pages}
              </span>
              <span
                className="px-2 py-1 capitalize bg-[#49a6e9] text-white cursor-pointer rounded-[4px] tracking-widest"
                onClick={() => handlePage(1)}
              >
                next
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl">
              {data &&
                data.map(
                  ({
                    author,
                    num_comments,
                    points,
                    title,
                    url,
                    objectID,
                  }: Article) => (
                    <div
                      key={objectID}
                      className="bg-white rounded-lg px-8 py-4"
                    >
                      <h3 className="capitalize tracking-widest font-bold text-gray-800">
                        {title}
                      </h3>
                      <p className="mt-1 mb-2 text-gray-400">
                        ${points} points by ${author} | ${num_comments} comments
                      </p>
                      <div className="capitalize text-sm">
                        <a href={url} className="text-[#49a6e9]">
                          read more
                        </a>
                        <button className="ml-3 text-[#bb2525]">remove</button>
                      </div>
                    </div>
                  )
                )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default HackerNews;
