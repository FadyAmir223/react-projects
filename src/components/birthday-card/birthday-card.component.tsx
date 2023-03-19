import { Article, Image, Name, Age } from './birthday-card.style';

type BirthdayCardProps = {
  image: string;
  name: string;
  age: number;
};

const BirthdayCard = ({ image, name, age }: BirthdayCardProps) => {
  return (
    <Article>
      <Image src={image} alt={name} />
      <div>
        <Name>{name}</Name>
        <Age>{age} Years</Age>
      </div>
    </Article>
  );
};

export default BirthdayCard;
