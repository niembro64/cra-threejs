import { ai_projects } from '../data/myData';
import type { Project } from '../data/myData';
import { getProjectMediaKind, selectProjectMedia } from './projectMedia';

const project: Project = {
  ...ai_projects[0],
  image: 'preview.jpg',
  gif: 'preview.gif',
  video: 'preview.mp4',
};

describe('project media helpers', () => {
  it('selects lightweight media for low or unknown connection quality', () => {
    expect(selectProjectMedia(project, null)).toBe('preview.jpg');
    expect(selectProjectMedia(project, 'low')).toBe('preview.jpg');
  });

  it('selects efficient video previews when bandwidth allows', () => {
    expect(selectProjectMedia(project, 'medium')).toBe('preview.mp4');
    expect(selectProjectMedia(project, 'high')).toBe('preview.mp4');
  });

  it('recognizes supported media extensions with URLs and mixed casing', () => {
    expect(getProjectMediaKind('demo.WEBM?cache=1')).toBe('video');
    expect(getProjectMediaKind('demo.gif#frame')).toBe('gif');
    expect(getProjectMediaKind('demo.avif')).toBe('image');
    expect(getProjectMediaKind('demo.txt')).toBeNull();
  });
});
