import Title from '../../components/title/title.component';
import Tour from '../../components/tour/tour.component';
import { Container, NoTour, NoTourButton, TourList } from './tours.style';
import tourData from '../../database/tours.data.json';
import { useState } from 'react';

const Tours = () => {
  const [tours, setTours] = useState(tourData.data);

  const deleteMe = (title: string) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.title !== title));
  };

  const reset = () => {
    setTours(tourData.data);
  };

  return (
    <Container>
      {tours.length ? (
        <>
          <Title>our tours</Title>
          <TourList>
            {tours.map((tour) => {
              const { price, title, image, description } = tour;
              return (
                <Tour
                  key={title}
                  price={price}
                  title={title}
                  image={image}
                  description={description}
                  handleClick={deleteMe}
                />
              );
            })}
          </TourList>
        </>
      ) : (
        <>
          <NoTour>no tours left</NoTour>
          <NoTourButton onClick={reset}>refresh</NoTourButton>
        </>
      )}
    </Container>
  );
};

export default Tours;
