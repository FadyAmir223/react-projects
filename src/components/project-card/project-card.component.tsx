import { Link } from 'react-router-dom';
import { CardContainer } from './project-card.style';

type ProjectCardProps = {
  img: string;
  title: string;
};

const ProjectCard = ({ img, title }: ProjectCardProps) => {
  return (
    <CardContainer>
      <Link to={title.replace(' ', '-').toLowerCase()}>
        <img src={img} alt={title} />
        <h5>{title}</h5>
      </Link>
    </CardContainer>
  );
};

export default ProjectCard;
