// ProjectsShowcase.tsx

import React, { useState } from 'react';
import { projects } from '../data/projects';
import '../App.scss'; // or your local scss file

const ProjectsShowcase: React.FC = () => {
  const [flippedProject, setFlippedProject] = useState<string | null>(null);

  const handleFlip = (title: string) => {
    setFlippedProject(flippedProject === title ? null : title);
  };

  return (
    <div className="projects-showcase-container">
      <h1 className="demo-projects-title">My Projects</h1>
      <p className="demo-projects-subtitle">All Original – Click a Card!</p>
      <div className="projects-grid">
        {projects.map((project) => {
          const isFlipped = flippedProject === project.title;
          return (
            <div
              key={project.title}
              className={`project-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleFlip(project.title)}
            >
              <div className="project-card-front">
                <img
                  src={process.env.PUBLIC_URL + '/' + project.icon}
                  alt={project.title}
                  className="project-icon"
                />
                <h3>{project.title}</h3>
              </div>

              <div className="project-card-back">
                <h4>{project.title}</h4>
                {project.description &&
                  project.description.map((d, idx) => <p key={idx}>{d}</p>)}
                <ul>
                  {project.bullets?.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
                <div className="project-stack">
                  {project.stack?.map((s, i) => (
                    <span key={i} className="stack-pill">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = project.url;
                  }}
                >
                  Go to {project.title}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsShowcase;
