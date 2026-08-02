import { allProjects, projectGroups } from './projectGroups';

describe('project groups', () => {
  it('assigns contiguous global indexes in display order', () => {
    const displayedProjects = projectGroups.flatMap((group) => group.projects);

    expect(allProjects).toEqual(displayedProjects);
    projectGroups.forEach((group) => {
      expect(allProjects[group.startIndex]).toBe(group.projects[0]);
    });
  });

  it('keeps project titles unique for stable card keys and analytics', () => {
    const titles = allProjects.map((project) => project.title);

    expect(new Set(titles).size).toBe(titles.length);
  });
});
