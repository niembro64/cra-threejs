// ProjectDemo.tsx

import React, { useState } from 'react';
import { Project } from '../data/projects';
import { __DEV__, isMobile } from './MyThree';

interface ProjectDemoProps {
  project: Project;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  // Build the path to the media file
  // - if mobile => "/videos2/Title.gif"
  // - else => "/videos2/Title.mp4"
  const mediaSrc =
    process.env.PUBLIC_URL +
    '/videos2/' +
    project.title +
    (isMobile ? '.gif' : '.mp4');

  // Decide how to handle the click (mobile might just open the link)
  const handleProjectClick = () => {
    window.location.href = project.url;
  };

  // For desktop, we can still use hover states if we want. If you want
  // to remove hover entirely for mobile, you can just skip them if isMobile.
  const onMouseEnter = () => {
    if (!isMobile) {
      setHovered(true);
      __DEV__ && console.log('hovering', project.title);
    }
  };

  const onMouseLeave = () => {
    if (!isMobile) {
      setHovered(false);
      __DEV__ && console.log('leaving', project.title);
    }
  };

  return (
    <div
      className="project"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleProjectClick}
      // We only apply an "active" ID or class if hovered & not mobile
      id={!isMobile && hovered ? 'project-hover' : ''}
    >
      {/* Because it's simpler on mobile, we can skip the overlay for mobile */}
      {!isMobile && <div className="project-overlay"></div>}

      {/* Title text */}
      <div
        className={isMobile ? 'project-title-mobile' : 'project-title'}
        id={project.title}
      >
        {project.title.toUpperCase()}
      </div>

      {/* Title + Icon + Description area */}
      <div className="project-title-wrapper">
        {/* Icon */}
        {project.icon && (
          <img
            src={process.env.PUBLIC_URL + '/' + project.icon}
            alt="project-icon"
            id={!isMobile && hovered ? 'project-icon-hover' : ''}
            className="project-icon"
          />
        )}

        {/* Description */}
        {!isMobile && (
          <div
            id={!isMobile && hovered ? 'project-description-hover' : ''}
            className="project-description"
          >
            {project.description}
          </div>
        )}
      </div>

      {/* Main media: either a video (desktop) or a gif (mobile) */}
      {isMobile ? (
        <img
          className="project-mobile-media"
          src={mediaSrc}
          alt={`${project.title}-gif`}
        />
      ) : (
        <video
          className="project-video"
          src={mediaSrc}
          autoPlay
          muted
          loop
        ></video>
      )}

      {/* For desktop, show bullets & stack if not hovered, or however you like.
          For mobile, you could display them always or hide them entirely. */}
      {!isMobile && !hovered && (
        <div className="project-bullet-container">
          <div className="project-bullet-wrapper">
            {project.bullets?.map((bullet, i) => (
              <div key={i} className="project-bullet">
                {'· ' + bullet}
              </div>
            ))}
          </div>
        </div>
      )}
      {!isMobile && !hovered && (
        <div className="project-stack-container">
          {project.stack?.map((stack, i) => (
            <div key={i} className="project-stack">
              {stack}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDemo;
