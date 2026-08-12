import type { Project } from './myData';
import { ai_projects, art_projects, compsci_projects, fullstack_projects, videogame_projects } from './myData';

export interface ProjectGroup {
  id: string;
  headingLines: string[];
  subtitle: string;
  projects: Project[];
  startIndex: number;
}

const groupDefinitions: Omit<ProjectGroup, 'startIndex'>[] = [
  {
    id: 'ai-projects',
    headingLines: [' ML '],
    subtitle: 'Neural Nets & Optimization',
    projects: ai_projects,
  },
  {
    id: 'compsci-projects',
    headingLines: [' COMPUTER ', ' SCIENCE '],
    subtitle: 'Interactive Algorithms & Simulations',
    projects: compsci_projects,
  },
  {
    id: 'fullstack-projects',
    headingLines: [' FULL STACK ', ' WEB '],
    subtitle: 'Complete Web Apps with Database Integration',
    projects: fullstack_projects,
  },
  {
    id: 'videogame-projects',
    headingLines: [' VIDEO ', ' GAMES '],
    subtitle: 'Browser & Mobile Games with Original Art & Sound',
    projects: videogame_projects,
  },
  {
    id: 'art-projects',
    headingLines: [' ART '],
    subtitle: 'Original Music & Visuals',
    projects: art_projects,
  },
];

export const projectGroups: ProjectGroup[] = groupDefinitions.map((group, groupIndex, groups) => ({
  ...group,
  startIndex: groups
    .slice(0, groupIndex)
    .reduce((projectCount, precedingGroup) => projectCount + precedingGroup.projects.length, 0),
}));

export const allProjects = projectGroups.flatMap((group) => group.projects);
