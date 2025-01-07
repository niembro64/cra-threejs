import React from 'react';
import { Project } from '../data/projects';
import { isMobile } from './MyThree';

const removeSpacesFromString = (str: string): string => {
  return str.replace(/\s/g, '');
};

interface ProjectDemoProps {
  project: Project;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project }) => {
  // const mediaSrc =
  //   process.env.PUBLIC_URL +
  //   '/videos2/' +
  //   removeSpacesFromString(project.title) +
  //   '.mp4';
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
      className={`relative w-full md:w-[45vw] rounded-lg p-4 cursor-pointer mb-6 transition-all hover:scale-105 transform rounded-2xl ${
        isMobile ? '' : 'hover:bg-slate-800/50 bg-black/80'
      }`}
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
        <div className="text-4xl mb-2 text-white transition-all hover:text-white uppercase">
          {project.title}
        </div>
      </div>

      {project.description && (
        <div className="text-xl mb-2 text-white">
          {project.description.join('. ')}
        </div>
      )}

      {/* {isMobile && project.gif && (
        <video
          className="w-full object-cover rounded-md"
          src={mediaSrc}
          autoPlay
          muted
          loop
        />
      )} */}
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
