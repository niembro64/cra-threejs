// ProjectsSection.tsx

import React from 'react'
import { ProjectStore } from '../store/ProjectStore'
import { isThin } from './Main'
import ProjectDemo from './ProjectDemo'
import { projects, showEmojis } from '../data/myData'
import PixelArtText from './PixelArtText'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProjectsSectionProps {}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const {
    mutedArray: isMutedArray,
    setMuted: setIsMuted,
    hasTouchedAudioButton,
  } = ProjectStore()

  return (
    <section
      className={`align-center flex flex-col justify-center px-4 py-12 ${isThin ? 'bg-black/50' : ''} `}
    >
      <div className="mb-24 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">⚙️</h1>}

        <div className="mb-4 mt-10">
          <PixelArtText
            scrollContainerSelector=".pixel-text-projects"
            pixelColor="#fff"
            text=" PROJECTS "
          />
        </div>
        <p className="pixel-font pt-4 text-2xl text-blue-300">
          Original Fullstack Apps &amp; Games for Mobile &amp; Desktop
        </p>
      </div>
      <div className={`flex flex-col items-center ${isThin ? '' : ''}`}>
        {projects.map((project, index) => (
          <div
            key={project.title + index}
            className={`${isThin ? '' : 'max-w-[800px]'} `}
          >
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
    </section>
  )
}

export default ProjectsSection
