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
    expect(selectProjectMedia(project, null, false)).toBe('preview.jpg');
    expect(selectProjectMedia(project, 'low', false)).toBe('preview.jpg');
  });

  it('selects GIFs for mobile and video for desktop when bandwidth allows', () => {
    expect(selectProjectMedia(project, 'medium', true)).toBe('preview.gif');
    expect(selectProjectMedia(project, 'high', false)).toBe('preview.mp4');
  });

  it('recognizes supported media extensions with URLs and mixed casing', () => {
    expect(getProjectMediaKind('demo.WEBM?cache=1')).toBe('video');
    expect(getProjectMediaKind('demo.gif#frame')).toBe('gif');
    expect(getProjectMediaKind('demo.avif')).toBe('image');
    expect(getProjectMediaKind('demo.txt')).toBeNull();
  });
});
