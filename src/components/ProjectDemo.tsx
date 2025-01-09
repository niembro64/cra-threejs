import React, { useState } from 'react';
import { Project } from '../data/projects';
import { isMobile } from './MyThree';

const removeSpacesFromString = (str: string): string => {
  return str.replace(/\s/g, '');
};

interface ProjectDemoProps {
  project: Project;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project }) => {
  const [isMuted, setIsMuted] = useState(true);
  const mediaSrc =
    process.env.PUBLIC_URL +
    '/videos2/' +
    removeSpacesFromString(project.title) +
    (isMobile ? '.gif' : '.mp4');

  const handleProjectClick = () => {
    window.location.href = project.url;
  };

  const toggleMute = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={`relative w-full md:w-[45vw] rounded-lg p-4 mb-6 transition-all rounded-2xl`}
      // onClick={handleProjectClick}
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

      {isMobile ? (
        <>
          {/* Mobile Layout */}
          {project.description && (
            <div className="text-xl mb-2 text-white">
              {project.description.join('. ')}
            </div>
          )}

          {project.stack && (
            <div className="text-lg mb-2 text-white">
              <strong>Stack:</strong> {project.stack.join(', ')}
            </div>
          )}

          {project.bullets && (
            <ul className="list-disc list-inside text-white">
              {project.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="flex flex-row">
          {/* Desktop Layout */}
          <div className="w-1/2 pr-4">
            {project.description && (
              <div className="text-xl mb-2 text-white">
                {project.description.join('. ')}
              </div>
            )}

            {project.stack && (
              <div className="text-lg mb-2 text-white">
                <strong>Stack:</strong> {project.stack.join(', ')}
              </div>
            )}
          </div>
          <div className="w-1/2 pl-4">
            {project.bullets && (
              <ul className="list-disc list-inside text-white">
                {project.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="h-6" />

      {/* Full-width button */}
      {(isMobile && project.supportsMobile) ||
      (!isMobile && project.supportsDesktop) ? (
        <button
          className="w-full py-2 mb-4 bg-blue-500 text-white rounded-3xl over:bg-blue-700 transition-all"
          onClick={handleProjectClick}
        >
          Try It Out!
        </button>
      ) : null}

      {isMobile && project.gif && (
        <img
          className="w-full object-cover rounded-md"
          src={mediaSrc}
          alt={`${project.title}-gif`}
        />
      )}

      {!isMobile && project.video && (
        <div className="relative">
          <video
            className="w-full h-auto rounded-md"
            src={mediaSrc}
            autoPlay
            muted={isMuted}
            loop
          />
          {project.hasSound && (
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full z-10"
              onClick={toggleMute}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDemo;
