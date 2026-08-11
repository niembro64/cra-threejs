import React from 'react';
import type { ProjectGroup as ProjectGroupDefinition } from '../data/projectGroups';
import { isThin } from './Main';
import PixelArtText from './PixelArtText';
import ProjectDemo from './ProjectDemo';

interface ProjectGroupProps {
  group: ProjectGroupDefinition;
}

const ProjectGroup: React.FC<ProjectGroupProps> = ({ group }) => (
  <section className="performance-project-group mb-24 w-full" aria-labelledby={`${group.id}-heading`}>
    <h2 id={`${group.id}-heading`} className="sr-only">
      {group.headingLines.join(' ').trim()}
    </h2>
    <div className="mb-12 text-center">
      <div className="mb-4">
        {group.headingLines.map((headingLine, index) => (
          <React.Fragment key={headingLine}>
            {index > 0 && <div className="h-2 w-full" />}
            <PixelArtText scrollContainerSelector={`.pixel-text-${group.id}`} pixelColor="#fff" text={headingLine} />
          </React.Fragment>
        ))}
      </div>
      <p className="pixel-font pt-4 text-2xl text-blue-300">{group.subtitle}</p>
    </div>
    <div className={`grid items-start gap-y-16 ${isThin ? 'grid-cols-1' : 'grid-cols-2 gap-x-8'}`}>
      {group.projects.map((project, projectIndex) => (
        <div key={project.title} className="min-w-0">
          <ProjectDemo index={group.startIndex + projectIndex} project={project} />
        </div>
      ))}
    </div>
  </section>
);

export default React.memo(ProjectGroup);
