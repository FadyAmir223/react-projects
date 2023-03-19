import { Title_ } from './title.style';

type TitleProps = {
  children: string;
};

const Title = ({ children }: TitleProps) => {
  return <Title_>{children}</Title_>;
};

export default Title;
