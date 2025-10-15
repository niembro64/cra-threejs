// ProjectsSection.tsx

import React from 'react';
import { ProjectStore } from '../store/ProjectStore';
import { isThin } from './Main';
import ProjectDemo from './ProjectDemo';
import {
  myDataShort,
  compsci_projects,
  videogame_projects,
  fullstack_projects,
  art_projects,
  showEmojis,
} from '../data/myData';
import PixelArtText from './PixelArtText';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProjectsSectionProps {}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const { mutedArray: isMutedArray, setMuted: setIsMuted, hasTouchedAudioButton } = ProjectStore();

  return (
    <section
      className={`align-center flex flex-col justify-center px-4 py-12 ${isThin ? 'bg-black/80' : ''} `}
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
        <p className="pixel-font pt-4 text-2xl text-blue-300">{myDataShort}</p>
        <div className="mt-8 flex flex-col items-center">
          <p className="pixel-font animate-bounce text-xl text-blue-300">↓ scroll down here ↓</p>
        </div>
      </div>
      {/* Comp-Sci Projects Section */}
      <div className="mb-24">
        <div className="mb-12 text-center">
          <div className="mb-4">
            <PixelArtText
              scrollContainerSelector=".pixel-text-compsci-projects"
              pixelColor="#fff"
              text=" COMPUTER "
            />

            <div className=" h-2 w-full" />
            <PixelArtText
              scrollContainerSelector=".pixel-text-compsci-projects"
              pixelColor="#fff"
              text=" SCIENCE "
            />
          </div>
        </div>
        <div className={`grid grid-cols-1 gap-16 ${isThin ? 'px-0' : 'px-0'}`}>
          {compsci_projects.map((project, index) => (
            <div key={project.title + index} className="transition-all duration-300">
              <ProjectDemo
                key={index}
                index={index}
                project={project}
                isMuted={isMutedArray[index]}
                setIsMuted={() => {
                  const nextState: boolean = !isMutedArray[index];
                  setIsMuted(index, nextState);
                }}
                hasTouchedAMuteButton={hasTouchedAudioButton}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video Games Section */}
      <div className="mb-24">
        <div className="mb-12 text-center">
          <div className="mb-4">
            <PixelArtText
              scrollContainerSelector=".pixel-text-videogame-projects"
              pixelColor="#fff"
              text=" VIDEO "
            />
            <div className=" h-2 w-full" />
            <PixelArtText
              scrollContainerSelector=".pixel-text-videogame-projects"
              pixelColor="#fff"
              text=" GAMES "
            />
          </div>
        </div>
        <div className={`grid grid-cols-1 gap-16 ${isThin ? 'px-0' : 'px-0'}`}>
          {videogame_projects.map((project, index) => {
            const globalIndex = compsci_projects.length + index;
            return (
              <div key={project.title + index} className="transition-all duration-300">
                <ProjectDemo
                  key={index}
                  index={globalIndex}
                  project={project}
                  isMuted={isMutedArray[globalIndex]}
                  setIsMuted={() => {
                    const nextState: boolean = !isMutedArray[globalIndex];
                    setIsMuted(globalIndex, nextState);
                  }}
                  hasTouchedAMuteButton={hasTouchedAudioButton}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Stack Projects Section */}
      <div className="mb-24">
        <div className="mb-12 text-center">
          <div className="mb-4">
            <PixelArtText
              scrollContainerSelector=".pixel-text-fullstack-projects"
              pixelColor="#fff"
              text=" FULL STACK "
            />
            <div className=" h-2 w-full" />
            <PixelArtText
              scrollContainerSelector=".pixel-text-fullstack-projects"
              pixelColor="#fff"
              text=" WEB "
            />
          </div>
        </div>
        <div className={`grid grid-cols-1 gap-16 ${isThin ? 'px-0' : 'px-0'}`}>
          {fullstack_projects.map((project, index) => {
            const globalIndex = compsci_projects.length + videogame_projects.length + index;
            return (
              <div key={project.title + index} className="transition-all duration-300">
                <ProjectDemo
                  key={index}
                  index={globalIndex}
                  project={project}
                  isMuted={isMutedArray[globalIndex]}
                  setIsMuted={() => {
                    const nextState: boolean = !isMutedArray[globalIndex];
                    setIsMuted(globalIndex, nextState);
                  }}
                  hasTouchedAMuteButton={hasTouchedAudioButton}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Art Projects Section */}
      <div className="mb-24">
        <div className="mb-12 text-center">
          <div className="mb-4">
            <PixelArtText
              scrollContainerSelector=".pixel-text-art-projects"
              pixelColor="#fff"
              text=" ART "
            />
          </div>
        </div>
        <div className={`grid grid-cols-1 gap-16 ${isThin ? 'px-0' : 'px-0'}`}>
          {art_projects.map((project, index) => {
            const globalIndex =
              compsci_projects.length +
              videogame_projects.length +
              fullstack_projects.length +
              index;
            return (
              <div key={project.title + index} className="transition-all duration-300">
                <ProjectDemo
                  key={index}
                  index={globalIndex}
                  project={project}
                  isMuted={isMutedArray[globalIndex]}
                  setIsMuted={() => {
                    const nextState: boolean = !isMutedArray[globalIndex];
                    setIsMuted(globalIndex, nextState);
                  }}
                  hasTouchedAMuteButton={hasTouchedAudioButton}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
