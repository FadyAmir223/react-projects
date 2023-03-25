import { FormEvent, useState, useEffect } from 'react';
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

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const StockPhotos = () => {
  const [posts, setPosts] = useState([] as Post[]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [newPage, setNewPage] = useState(false);
  const [searchField, setSearchField] = useState('');

  const fetchPosts = async () => {
    if (isLoading) return;

    let url =
      searchField !== ''
        ? `${searchUrl}?client_id=${accessKey}&page=${page}&query=${searchField}`
        : `${mainUrl}?client_id=${accessKey}&page=${page}`;

    try {
      setIsLoading(true);
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

      setPosts((prevPosts) =>
        page === 1 ? newPosts : [...prevPosts, ...newPosts]
      );
    } finally {
      setIsLoading(false);
      setNewPage(false);
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
      setNewPage(true);
  };

  useEffect(() => {
    if (!isLoading && newPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [newPage]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setSearchField(
    //   (
    //     (e.target as HTMLFormElement).elements.namedItem(
    //       'searchField'
    //     ) as HTMLInputElement
    //   )?.value
    // );

    // page === 1 ? setPage(1) :
    fetchPosts();
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
          onChange={(e) => setSearchField(e.target.value)}
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
