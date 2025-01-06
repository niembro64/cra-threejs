import React from 'react';
import { Project } from '../data/projects';
import { __DEV__, isMobile } from './MyThree';

interface ProjectDemoProps {
  project: Project;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project }) => {
  const mediaSrc =
    process.env.PUBLIC_URL +
    '/videos2/' +
    project.title +
    (isMobile ? '.gif' : '.mp4');

  const handleProjectClick = () => {
    window.location.href = project.url;
  };

  return (
    <div
      className="relative w-[70vw] md:w-[45vw] bg-black bg-opacity-50 rounded-lg shadow-lg p-4 cursor-pointer mb-6"
      onClick={handleProjectClick}
    >
      <h2
        id={project.title}
        className="text-3xl font-bold tracking-wider mb-2 mix-blend-multiply text-white"
      >
        {project.title.toUpperCase()}
      </h2>

      {project.icon && (
        <img
          src={process.env.PUBLIC_URL + '/' + project.icon}
          alt={`${project.title}-icon`}
          className="h-12 w-auto mb-2"
        />
      )}

      {project.description && (
        <div className="text-lg mb-2 text-white/80">
          {project.description.join('. ')}
        </div>
      )}

      {isMobile ? (
        <img
          className="w-full object-cover rounded-md"
          src={mediaSrc}
          alt={`${project.title}-gif`}
        />
      ) : (
        <video
          className="w-full h-auto rounded-md"
          src={mediaSrc}
          autoPlay
          muted
          loop
        />
      )}
    </div>
  );
};

export default ProjectDemo;
