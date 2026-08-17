import React from 'react';
import { myDataShort, showEmojis } from '../data/myData';
import { projectGroups } from '../data/projectGroups';
import { isThin } from './Main';
import PixelArtText from './PixelArtText';
import ProjectGroup from './ProjectGroup';

const ProjectsSection: React.FC = () => (
  <section
    className={`align-center flex flex-col items-stretch justify-center px-4 py-12 ${isThin ? 'resume-section-surface' : ''}`}
  >
    <div className="mb-24 text-center">
      {showEmojis && <h1 className="mb-4 text-6xl font-bold">⚙️</h1>}

      <div className="mb-4 mt-10">
        <PixelArtText scrollContainerSelector=".pixel-text-projects" pixelColor="#fff" text=" PROJECTS " />
      </div>
      <p className="pixel-font pt-4 text-2xl text-blue-300">{myDataShort}</p>
    </div>

    {projectGroups.map((group) => (
      <ProjectGroup key={group.id} group={group} />
    ))}
  </section>
);

export default ProjectsSection;
