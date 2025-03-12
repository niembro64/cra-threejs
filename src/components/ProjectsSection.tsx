// ProjectsSection.tsx

import React from 'react'
import { ProjectStore } from '../store/ProjectStore'
import { isThin } from './Main'
import ProjectDemo from './ProjectDemo'
import { projects, showEmojis } from '../data/myData'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProjectsSectionProps {}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const {
    mutedArray: isMutedArray,
    setMuted: setIsMuted,
    hasTouchedAudioButton,
  } = ProjectStore()

  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''} shadow-lg`}>
      <div className="mb-24 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">⚙️</h1>}
        <h1 className="pixel-font text-6xl font-bold">PROJECTS</h1>
        <p className="pixel-font pt-4 text-2xl text-blue-300">
          Original Fullstack Apps &amp; Games for Mobile &amp; Desktop
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-8 flex max-w-[800px] flex-col items-center">
          {projects.map((project, index) => (
            <div
              key={project.title + index}
              // className={`${isThin ? 'w-full' : 'w-[45vw]'}`}
            >
              {index !== 0 && <div className="h-24 w-full"></div>}
              <ProjectDemo
                key={index}
                project={project}
                isMuted={isMutedArray[index]}
                setIsMuted={() => {
                  const nextState: boolean = !isMutedArray[index]
                  setIsMuted(index, nextState)
                }}
                hasTouchedAMuteButton={hasTouchedAudioButton}
              />
              <div className="h-16 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
