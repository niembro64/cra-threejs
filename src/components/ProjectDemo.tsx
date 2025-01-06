import React from 'react';
import { Project } from '../data/projects';
import { __DEV__, isMobile } from './MyThree';

const removeSpacesFromString = (str: string): string => {
  return str.replace(/\s/g, '');
};

interface ProjectDemoProps {
  project: Project;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project }) => {
  const mediaSrc =
    process.env.PUBLIC_URL +
    '/videos2/' +
    removeSpacesFromString(project.title) +
    (isMobile ? '.gif' : '.mp4');

  const handleProjectClick = () => {
    window.location.href = project.url;
  };

  return (
    <div
      className="relative w-[80vw] md:w-[45vw] bg-black bg-opacity-50 rounded-lg shadow-lg p-4 cursor-pointer mb-6 border border-white/30"
      onClick={handleProjectClick}
    >
      <div className="flex flex-row items-start">
        {project.icon && (
          <img
            src={process.env.PUBLIC_URL + '/' + project.icon}
            alt={`${project.title}-icon`}
            className="h-10 w-auto mb-2 mr-2"
          />
        )}
        <div className="text-4xl mb-2 text-white uppercase">
          {project.title}
        </div>
      </div>

      {project.description && (
        <div className="text-lg mb-2 text-white/80">
          {project.description.join('. ')}
        </div>
      )}

      {isMobile && project.gif && (
        <img
          className="w-full object-cover rounded-md"
          src={mediaSrc}
          alt={`${project.title}-gif`}
        />
      )}

      {!isMobile && project.video && (
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
