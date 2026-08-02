import type { ConnectionQualityType, Project } from '../data/myData';

export type ProjectMediaKind = 'video' | 'gif' | 'image';

const firstAvailable = (...sources: Array<string | null>): string | null =>
  sources.find((source): source is string => Boolean(source)) ?? null;

export const selectProjectMedia = (
  project: Project,
  connectionQuality: ConnectionQualityType | null
): string | null => {
  if (connectionQuality === 'low' || connectionQuality === null) {
    return firstAvailable(project.image, project.gif, project.video);
  }

  return firstAvailable(project.video, project.gif, project.image);
};

export const getProjectMediaKind = (source: string): ProjectMediaKind | null => {
  const extension = source.split(/[?#]/, 1)[0].split('.').pop()?.toLowerCase();

  if (extension === 'mp4' || extension === 'webm') return 'video';
  if (extension === 'gif') return 'gif';
  if (extension && ['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(extension)) return 'image';
  return null;
};
