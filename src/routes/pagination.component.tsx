import { memo, useEffect, useState } from 'react';

const url = 'https://api.github.com/users/john-smilga/followers?per_page=34';
const slicePerPage = 10;

type Data = {
  avatar_url: string;
  html_url: string;
  login: string;
};

const Pagination = () => {
  const [people, setPeople] = useState([] as Data[]);
  const [loading, setLoading] = useState(true);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const handlActivePage = (idx: number) => {
    setActivePage(((idx % pagesNumber) + pagesNumber) % pagesNumber);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      const data_ = data.map(({ avatar_url, html_url, login }: Data) => ({
        avatar_url,
        html_url,
        login,
      }));
      setLoading(false);
      setPeople(data_);
      setPagesNumber(Math.ceil(data_.length / slicePerPage));
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#2c2e31]">
      <article className="w-[90vw] mx-auto py-10">
        <h1 className="text-center font-bold text-4xl lg:text-5xl relative capitalize pb-2 mb-14 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:w-32 before:h-[3px] before:bg-[#49a6e9]">
          {loading ? 'loading...' : 'pagination'}
        </h1>
        <section
          className="grid gap-8 mb-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
          }}
        >
          <PageSlice people={people} activePage={activePage} />
        </section>
        {!loading && (
          <div className="text-center">
            <span
              className="font-bold capitalize cursor-pointer m-2 select-none"
              onClick={() => handlActivePage(activePage - 1)}
            >
              Prev
            </span>
            {Array.from(Array(pagesNumber).keys(), (x) => x + 1).map(
              (i, idx) => (
                <span
                  key={i}
                  className={`inline-grid place-items-center m-2 w-8 h-8  rounded-md text-white duration-300 transition-colors cursor-pointer ${
                    activePage === idx ? 'bg-[#063251]' : 'bg-[#8bcbf9]'
                  }`}
                  onClick={() => handlActivePage(idx)}
                >
                  {i}
                </span>
              )
            )}
            <span
              className="capitalize font-bold cursor-pointer m-2"
              onClick={() => handlActivePage(activePage + 1)}
            >
              Next
            </span>
          </div>
        )}
      </article>
    </main>
  );
};

type PageSliceProps = {
  people: Data[];
  activePage: number;
};

const PageSlice = memo(({ people, activePage }: PageSliceProps) => {
  return (
    <>
      {people
        .slice(activePage * slicePerPage, (activePage + 1) * slicePerPage)
        .map(({ avatar_url, html_url, login }) => (
          <div
            key={html_url}
            className="px-8 py-14 bg-white rounded-lg text-center shadow-sm"
          >
            <img
              src={avatar_url}
              alt={login}
              className="rounded-full w-32 h-32 mb-4 mx-auto"
            />
            <h3 className="capitalize text-[#617d98] text-sm mb-5">{login}</h3>
            <a
              href={html_url}
              className="text-white rounded-full uppercase text-xs tracking-wider cursor-pointer bg-[#49a6e9] py-[0.35rem] px-3"
            >
              view profile
            </a>
          </div>
        ))}
    </>
  );
});

export default Pagination;
