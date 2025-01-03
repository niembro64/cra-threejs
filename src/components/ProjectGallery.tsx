// ProjectGallery.tsx

import React, { useState } from 'react';
import { projects } from '../data/projects';
import { Project } from '../data/projects';

interface ProjectGalleryProps {
  isMobile: boolean;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ isMobile }) => {
  const [hover, setHover] = useState<number | null>(null);

  const onProjectClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className={`project-gallery ${isMobile ? 'mobile' : 'desktop'}`}>
      {projects.map((project: Project, index: number) => (
        <div
          key={index}
          className="project-card"
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onProjectClick(project.url)}
        >
          <div className="project-card-front">
            <div className="project-title-card">
              {project.title.toUpperCase()}
            </div>
            {project.icon && (
              <img
                src={process.env.PUBLIC_URL + '/' + project.icon}
                alt={`${project.title}-icon`}
                className="project-icon-card"
              />
            )}
          </div>
          {hover === index && !isMobile && (
            <div className="project-card-back">
              <div className="description">
                {project.description?.join(' / ')}
              </div>
              <div className="bullets">
                {project.bullets?.map((b, i) => (
                  <div key={i} className="bullet-item">
                    - {b}
                  </div>
                ))}
              </div>
              <div className="stack">
                {project.stack?.map((s, i) => (
                  <div key={i} className="stack-item">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectGallery;
