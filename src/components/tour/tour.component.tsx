import {
  Button,
  Image,
  Price,
  Text,
  TextArea,
  Title,
  TourContainer,
} from './tour.style';

type TourProps = {
  price: number;
  title: string;
  image: string;
  description: string;
  handleClick(x: string): void;
};

const Tour = ({ price, title, image, description, handleClick }: TourProps) => {
  return (
    <TourContainer>
      <Price>{price}$</Price>
      <Image src={image} alt={title} />
      <TextArea>
        <Title>{title}</Title>
        <Text>{description}</Text>
        <Button onClick={() => handleClick(title)}>not interested</Button>
      </TextArea>
    </TourContainer>
  );
};

export default Tour;
