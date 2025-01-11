import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Project } from '../data/projects'
import { isMobile } from './MyThree'

const removeSpacesFromString = (str: string): string => {
  return str.replace(/\s/g, '')
}

interface ProjectDemoProps {
  project: Project
  setIsMuted: Dispatch<SetStateAction<boolean>>
  isMuted: boolean
  hasTouchedAMuteButton: boolean
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
    (isMobile ? '.gif' : '.mp4')

  const handleProjectClick = () => {
    window.location.href = project.url
  }

  const toggleMute = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    setIsMuted(!isMuted)
  }

  return (
    <div className={`relative w-full rounded-2xl`}>
      <div className="flex flex-row items-center">
        {project.icon && (
          <img
            src={process.env.PUBLIC_URL + '/' + project.icon}
            alt={`${project.title}-icon`}
            className="mb-2 mr-2 h-10 w-auto"
          />
        )}
        <div className="mb-2 text-4xl uppercase">
          <strong>{project.title}</strong>
        </div>
      </div>

      {isMobile ? (
        <>
          {project.type && (
            <div className="mb-2 text-xl uppercase text-blue-300">
              <strong>{project.type}</strong>
            </div>
          )}

          {project.description && (
            <div className="mb-2 text-xl text-blue-100">
              {project.description}
            </div>
          )}

          {project.stack && (
            <>
              <div className="text-xl text-fuchsia-300">
                <strong>STACK</strong>
              </div>
              <div className="mb-2 text-xl text-fuchsia-100">
                {project.stack.join(', ')}
              </div>
            </>
          )}

          {project.bullets && (
            <>
              <div className="text-xl text-green-300">
                <strong>FEATURES</strong>
              </div>
              <ul className="list-inside list-disc text-xl text-green-100">
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
              <div className="mb-2 text-2xl text-blue-300">
                <strong>{project.type.toUpperCase()}</strong>
              </div>
            )}

            {project.description && (
              <div className="mb-2 text-2xl text-white">
                {project.description}
              </div>
            )}
          </div>
          <div className="w-1/2 pl-4">
            {project.stack && (
              <div className="mb-2 text-2xl text-fuchsia-300">
                <strong>{project.stack.join(', ').toUpperCase()}</strong>
              </div>
            )}

            <div className="text-2xl text-green-300">
              <strong>FEATURES</strong>
            </div>
            {project.bullets && (
              <ul className="list-inside list-disc text-2xl text-green-100">
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
          className="mb-4 w-full rounded-3xl bg-blue-500 px-4 py-2 text-2xl capitalize text-white transition-all hover:bg-blue-600"
          onClick={handleProjectClick}
        >
          <strong>
            {project.buttonStartText.toUpperCase()}{' '}
            {project.title.toUpperCase()}
          </strong>
        </button>
      ) : (
        <button
          className="mb-4 w-full rounded-3xl bg-gray-500/50 px-4 py-2 text-2xl uppercase text-white/50 transition-all hover:bg-gray-700 hover:text-white"
          onClick={handleProjectClick}
          disabled
        >
          {isMobile ? 'Desktop Only' : 'Mobile Only'}
        </button>
      )}

      {isMobile && project.gif && (
        <img
          className="w-full rounded-md object-cover"
          src={mediaSrc}
          alt={`${project.title}-gif`}
        />
      )}

      {!isMobile && project.video && (
        <div className="relative">
          <video
            className="h-auto w-full rounded-3xl"
            src={mediaSrc}
            autoPlay
            muted={isMuted}
            loop
          />
          {project.hasSound && (
            <button
              className="absolute bottom-2 right-2 z-10 rounded-full bg-transparent p-2 text-white shadow-xl transition-all hover:bg-white/50"
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
                <div className="animation-delay-2000 absolute left-0 top-0 h-full w-full animate-ping rounded-full bg-white opacity-50"></div>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ProjectDemo
