import ProjectCard from '../project-card/project-card.component';
import Title from '../title/title.component';
import { CardsContainer, Container } from './project-container.style';

type ProjectContainer = {
  projects: string[];
  title: string;
  start?: number;
};

const ProjectContainer = ({ projects, title, start = 0 }: ProjectContainer) => {
  return (
    <Container>
      <Title>{title}</Title>
      <CardsContainer className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((projectTitle, idx) => (
          <ProjectCard
            key={projectTitle}
            img={`./robohash/${idx + start}.png`}
            title={projectTitle}
          />
        ))}
      </CardsContainer>
    </Container>
  );
};

export default ProjectContainer;
