import ProjectContainer from '../../components/project-container/project-container.component';
import projectData from '../../database/projects.data.json';

const Home = () => {
  const { fundamentalprojectData, complexProjectData, additionalProjectData } =
    projectData;

  return (
    <div>
      <ProjectContainer
        projects={fundamentalprojectData}
        title="fundamental projects"
      />
      <ProjectContainer
        projects={complexProjectData}
        title="complex projects"
        start={fundamentalprojectData.length}
      />
      <ProjectContainer
        projects={additionalProjectData}
        title="additional projects"
        start={fundamentalprojectData.length + complexProjectData.length}
      />
    </div>
  );
};

export default Home;
