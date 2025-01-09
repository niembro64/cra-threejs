import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Project } from '../data/projects';
import { isMobile } from './MyThree';

const removeSpacesFromString = (str: string): string => {
  return str.replace(/\s/g, '');
};

interface ProjectDemoProps {
  project: Project;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
  isMuted: boolean;
  hasTouchedAMuteButton: boolean;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({
  project,
  setIsMuted,
  isMuted,
  hasTouchedAMuteButton,
}) => {
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
    >
      <div className="flex flex-row items-center">
        {project.icon && (
          <img
            src={process.env.PUBLIC_URL + '/' + project.icon}
            alt={`${project.title}-icon`}
            className="h-10 w-auto mb-2 mr-2"
          />
        )}
        <div className="text-4xl mb-2 uppercase">
          <strong>{project.title}</strong>
        </div>
      </div>

      {isMobile ? (
        <>
          {project.type && (
            <div className="text-xl mb-2 text-blue-300 uppercase">
              <strong>{project.type}</strong>
            </div>
          )}

          {project.description && (
            <div className="text-xl mb-2 text-blue-100">
              {project.description}
            </div>
          )}

          {project.stack && (
            <>
              <div className="text-xl text-fuchsia-300">
                <strong>STACK</strong>
              </div>
              <div className="text-xl mb-2 text-fuchsia-100">
                {project.stack.join(', ')}
              </div>
            </>
          )}

          {project.bullets && (
            <>
              <div className="text-xl text-green-300">
                <strong>FEATURES</strong>
              </div>
              <ul className="list-disc text-xl list-inside text-green-100">
                {project.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-row">
          {/* Desktop Layout */}
          <div className="w-1/2 pr-4">
            {project.type && (
              <div className="text-2xl mb-2 text-blue-300">
                <strong>{project.type.toUpperCase()}</strong>
              </div>
            )}

            {project.description && (
              <div className="text-2xl mb-2 text-white">
                {project.description}
              </div>
            )}
          </div>
          <div className="w-1/2 pl-4">
            {project.stack && (
              <div className="text-2xl mb-2 text-fuchsia-300">
                <strong>{project.stack.join(', ').toUpperCase()}</strong>
              </div>
            )}

            <div className="text-2xl text-green-300">
              <strong>FEATURES</strong>
            </div>
            {project.bullets && (
              <ul
                className="list-disc list-inside text-green-100
               text-2xl"
              >
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
          className="w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition-all text-2xl capitalize"
          onClick={handleProjectClick}
        >
          <strong>
            {project.buttonStartText.toUpperCase()}{' '}
            {project.title.toUpperCase()}
          </strong>
        </button>
      ) : (
        <button
          className="w-full px-4 py-2 mb-4 bg-gray-500/50 text-white/50 hover:text-white rounded-3xl hover:bg-gray-700 transition-all text-2xl uppercase"
          onClick={handleProjectClick}
          disabled
        >
          {isMobile ? 'Desktop Only' : 'Mobile Only'}
        </button>
      )}

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
              className="absolute bottom-2 right-2 bg-transparent text-white p-2 rounded-full z-10 shadow-xl hover:bg-white/50 transition-all"
              onClick={toggleMute}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  '/' +
                  (isMuted ? 'no-sound.png' : 'sound.png')
                }
                alt={isMuted ? 'Unmute' : 'Mute'}
                className="h-12 w-12"
              />
              {!hasTouchedAMuteButton && (
                <div
                  className="absolute top-0 left-0 w-full h-full rounded-full animate-ping
                  bg-white opacity-50 animation-delay-2000"
                ></div>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDemo;
