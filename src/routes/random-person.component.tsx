import { useEffect, useState } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';

type Person = {
  name: string;
  email: string;
  age: string;
  location: string;
  phone: string;
  password: string;
  image: string;
};

const icons = [
  <FaUser key="" name="name" />,
  <FaEnvelopeOpen key="" name="email" />,
  <FaCalendarTimes key="" name="age" />,
  <FaMap key="" name="location" />,
  <FaPhone key="" name="phone" />,
  <FaLock key="" name="password" />,
];

const url = 'https://randomuser.me/api/';

const RandomPerson = () => {
  const [person, setPerson] = useState({} as Person);
  const [info, setInfo] = useState('' as keyof Person);
  const [currPerson, setCurrPerson] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    setLoading(true);
    const res = await fetch(url);
    const { results } = await res.json();
    const {
      picture: { large },
      name: { first, last },
      email,
      dob: { age },
      location: {
        street: { number, name },
      },
      phone,
      login: { password },
    } = results[0];
    setPerson({
      name: `${first} ${last}`,
      email,
      age,
      location: `${number} ${name}`,
      phone,
      password,
      image: large,
    });
    setInfo('name');
    setLoading(false);
  };

  useEffect(() => {
    setCurrPerson(person[info]);
  }, [person, info]);

  return (
    <main className="min-h-screen bg-[#2c2e31] grid place-items-center">
      <article className="shadow-lg max-w-[730px] w-[90vw] bg-white rounded-lg">
        <div className="bg-[#f1f5f8] grid place-items-center border-b-[1px] border-b-black/25 h-[130px]">
          <img
            src={`${person.image}`}
            alt=""
            className="w-[150px] h-[150px] rounded-full bg-black p-1 border-[1px] border-gray-500 translate-y-[20%]"
          />
        </div>
        <div className="p-8 text-center">
          <p className="text-[#324d67] mt-10 text-lg">my {info} is</p>
          <p className="capitalize text-[#102a42] text-[28px] mb-4">
            {currPerson}
          </p>
          <div className="flex justify-around items-center mb-8">
            {icons.map((i) => (
              <span
                key={i.props.name}
                className="text-[#617d98] cursor-pointer scale-150 duration-300 hover:text-[#49a6e9]"
                onMouseEnter={() => setInfo(i.props.name)}
              >
                {i}
              </span>
            ))}
          </div>
          <button
            className={`uppercase tracking-widest mx-auto py-[0.375rem] px-[0.75rem] text-sm bg-[#49a6e9] text-white cursor-pointer rounded-md border-[1px] border-transparent duration-500 hover:text-[#49a6e9] hover:bg-[#063251] hover:border-[#063251] ${
              loading ? 'pointer-events-none' : null
            }`}
            onClick={fetchPerson}
            disabled={loading}
          >
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </article>
    </main>
  );
};

export default RandomPerson;
