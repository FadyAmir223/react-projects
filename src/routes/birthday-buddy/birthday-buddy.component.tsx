import BirthdayCard from '../../components/birthday-card/birthday-card.component';
import { Container, Main, Section, Title, Button } from './birthdy-buddy.style';
import birthdayData from '../../database/birthday.data.json';
import { useState, useEffect } from 'react';

const BirthdayBuddy = () => {
  const [data, setData] = useState(birthdayData.data);

  const handleClick = () => {
    setData([]);
  };

  useEffect(() => {
    document.title = 'Birthday Buddy';
  }, []);

  return (
    <Main>
      <Section>
        <Container>
          <Title>{data.length} birthdays today</Title>
          <section>
            {data.map((person, idx) => {
              const { name, age, image } = person,
                image_ = image ? image : `./robohash/${idx}.png`;

              return (
                <BirthdayCard
                  key={image_}
                  image={image_}
                  name={name}
                  age={age}
                />
              );
            })}
          </section>
          <Button onClick={handleClick}>clear all</Button>
        </Container>
      </Section>
    </Main>
  );
};

export default BirthdayBuddy;
