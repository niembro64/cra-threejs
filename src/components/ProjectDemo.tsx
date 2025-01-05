// ProjectDemo.tsx

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

  // Click handler to navigate to the project's URL
  const handleProjectClick = () => {
    window.location.href = project.url;
  };

  return (
    <div className="project" onClick={handleProjectClick}>
      {/* Title */}
      <h2 className="project-title" id={project.title}>
        {project.title.toUpperCase()}
      </h2>

      {/* Optional icon */}
      {project.icon && (
        <img
          src={process.env.PUBLIC_URL + '/' + project.icon}
          alt={`${project.title}-icon`}
          className="project-icon"
        />
      )}

      {/* Description */}
      {project.description && (
        <div className="project-description">
          {project.description.join('. ')}
        </div>
      )}

      {/* Media (GIF for mobile, MP4 for desktop) */}
      {isMobile ? (
        <img
          className="project-mobile-media"
          src={mediaSrc}
          alt={`${project.title}-gif`}
        />
      ) : (
        <video className="project-video" src={mediaSrc} autoPlay muted loop />
      )}
    </div>
  );
};

export default ProjectDemo;
