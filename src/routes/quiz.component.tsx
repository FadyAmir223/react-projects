import axios from 'axios';
import { FormEvent, MouseEventHandler, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Modal from '../components/modal';

const categories: { [key: string]: number } = {
  sports: 21,
  history: 23,
  politics: 24,
};
const diffs = ['easy', 'medium', 'hard'];

type Quiz = {
  question: string;
  correct_answer: string;
  incorrect_answers: string;
};

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Quiz = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Home />
    </QueryClientProvider>
  );
};

const Home = () => {
  const [amount, setAmount] = useState(10);
  const [url, setUrl] = useState('');
  const [current, setCurrent] = useState(0);
  const [degree, setDegree] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const { data, isLoading } = useQuery(
    ['quiz', url],
    async () => {
      const { data } = await axios.get(url);

      return data.results.map(
        ({ question, correct_answer, incorrect_answers }: Quiz) => ({
          question,
          correct_answer,
          answers: shuffle([correct_answer, ...incorrect_answers]),
        })
      );
    },
    {
      enabled: url !== '',
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const category = (
      (e.target as HTMLFormElement).elements.namedItem(
        'category'
      ) as HTMLSelectElement
    )?.value;
    const difficulty = (
      (e.target as HTMLFormElement).elements.namedItem(
        'difficulty'
      ) as HTMLSelectElement
    )?.value;

    const API_ENDPOINT = 'https://opentdb.com/api.php?';

    setUrl(
      `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${categories[category]}&type=multiple`
    );
  };

  const handleAnswer: MouseEventHandler<HTMLButtonElement> = (
    e,
    pass = false
  ) => {
    current + 1 === data.length
      ? setFinished(true)
      : setCurrent((prevCurr) => prevCurr + 1);

    setDegree(({ correct, total }) => {
      const point =
        !pass &&
        (e.target as HTMLButtonElement).value.toLowerCase() ===
          data[current].correct_answer.toLowerCase()
          ? 1
          : 0;
      return {
        correct: correct + point,
        total: total + 1,
      };
    });
  };

  const handleRestart = () => {
    setAmount(10);
    setUrl('');
    setCurrent(0);
    setDegree({ correct: 0, total: 0 });
    setFinished(false);
  };

  return (
    <main
      className="grid place-items-center bg-[#F1F5F8] min-h-screen relative"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
      }}
    >
      {url === '' ? (
        <form
          className="max-w-lg w-full p-12 rounded-[3px] bg-white"
          onSubmit={handleSubmit}
        >
          <h1 className="capitalize text-[#102A42] text-[40px] font-bold tracking-wider">
            setup quiz
          </h1>
          <label
            htmlFor="amount"
            className="capitalize text-[#324d67] my-8 block font-semibold"
          >
            number of questions
            <input
              type="number"
              name="amount"
              id="amount"
              className="block mt-2 w-full py-1 px-2 bg-[#F1F5F8] rounded-sm"
              min="1"
              max="20"
              value={amount}
              onChange={(e) => {
                setAmount(+e.target.value);
              }}
            />
          </label>

          <label
            htmlFor="category"
            className="capitalize text-[#324d67] mb-8 block font-semibold"
          >
            category
            <select
              name="category"
              id="category"
              className="block mt-2 w-full py-1 px-2 bg-[#F1F5F8] rounded-sm text-white"
            >
              {Object.keys(categories).map((category) => (
                <option key={category} value={category} className="">
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label
            htmlFor="difficulty"
            className="capitalize text-[#324d67] mb-8 block font-semibold"
          >
            difficulty
            <select
              name="difficulty"
              id="difficulty"
              className="block mt-2 w-full py-1 px-2 bg-[#F1F5F8] rounded-sm text-white"
            >
              {diffs.map((diff) => (
                <option key={diff} value={diff} className="">
                  {diff}
                </option>
              ))}
            </select>
          </label>

          <button className="capitalize w-full bg-[#FFB100] rounded-[4px] font-bold tracking-widest py-1 px-2">
            start
          </button>
        </form>
      ) : isLoading ? (
        <div className="mx-auto w-16 h-16 rounded-full border-[3px] border-gray-300 border-t-gray-700 will-change-transform animate-[spin_1.5s_ease-in-out_infinite] mt-20"></div>
      ) : (
        data && (
          <div className="bg-white rounded p-12 max-w-[90vw]">
            <p className="text-[#25bb32] tracking-widest text-end capitalize">
              correct answers : {degree.correct}/{degree.total}
            </p>
            <h3 className="text-[#cecac3] text-center text-[40px] my-8 font-bold leading-[1.5]">
              {data[current].question}
            </h3>
            <div className="grid gap-3 max-w-[60%] mx-auto">
              {(data[current].answers as string[]).map((answer) => (
                <button
                  key={answer}
                  className="bg-[#8bcbf9] text-[#222] rounded-[4px] p-2 tracking-widest duration-700 hover:bg-[#49a6e9] hover:text-white"
                  value={answer}
                  onClick={handleAnswer}
                >
                  {answer}
                </button>
              ))}
            </div>
            <button
              className="mt-8 ml-auto block rounded-[4px] capitalize text-[#222] px-2 py-1 font-bold w-[35%] bg-[#ffb100] duration-700 hover:bg-[#805900] hover:text-[#ffb100]"
              onClick={(e) => handleAnswer(e, true)}
            >
              next question
            </button>
          </div>
        )
      )}
      {/* <Modal> */}
      <div
        className={`fixed z-50 w-full h-full bg-black/50 grid place-items-center duration-200  ${
          finished ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="bg-white rounded-sm p-12 text-center">
          <h2 className="text-[40px] font-bold text-[#cecac3] tracking-wider">
            congrats!
          </h2>
          <p className="mt-3 mb-5 text-[#9fbad0] text-2xl">
            You answered {Math.floor((degree.correct / degree.total) * 100)}% of
            questions correctly
          </p>
          <button
            className={
              'px-2 py-1 font-bold capitalize bg-[#ffb100] text-[#222] w-[35%] rounded-[4px]'
            }
            onClick={handleRestart}
          >
            play again
          </button>
        </div>
      </div>
      {/* </Modal> */}
    </main>
  );
};

export default Quiz;
