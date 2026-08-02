import ReactGA from 'react-ga4';
import { create } from 'zustand';
import type { ConnectionQualityType } from '../data/myData';
import { allProjects } from '../data/projectGroups';
interface ProjectStoreProps {
  play: boolean;
  setPlay: (m: boolean) => void;
  mutedArray: boolean[];
  setMuted: (index: number, isMuted: boolean) => void;
  hasTouchedAudioButton: boolean;
  connectionQuality: ConnectionQualityType | null;
  setConnectionQuality: (quality: ConnectionQualityType) => void;
  activeProjectIndex: number | null;
  setActiveProjectIndex: (index: number | null) => void;
}

const createMutedArray = () => allProjects.map(() => true);

export const ProjectStore = create<ProjectStoreProps>((set) => ({
  hasTouchedAudioButton: false,
  mutedArray: createMutedArray(),
  play: true,
  connectionQuality: null,
  activeProjectIndex: null,
  setPlay: (newPlayState: boolean) => {
    set({ hasTouchedAudioButton: true, mutedArray: createMutedArray(), play: newPlayState });
    ReactGA.event({
      category: 'User',
      action: 'Audio Spectrum Clicked',
      label: newPlayState ? 'Play' : 'Pause',
    });
  },
  setMuted: (index: number, isMuted: boolean) => {
    set(() => {
      const mutedArray = createMutedArray();
      mutedArray[index] = isMuted;

      ReactGA.event({
        category: 'User',
        action: 'Project Audio Clicked',
        label: isMuted ? 'Mute' : 'Unmute',
      });

      return { hasTouchedAudioButton: true, mutedArray, play: false };
    });
  },
  setConnectionQuality: (quality: ConnectionQualityType) => {
    set({ connectionQuality: quality });

    ReactGA.event({
      category: 'User',
      action: 'Connection Quality',
      label: quality,
    });
  },
  setActiveProjectIndex: (index: number | null) => {
    set({ activeProjectIndex: index });

    if (index !== null) {
      ReactGA.event({
        category: 'User',
        action: 'Project Expanded',
        label: allProjects[index].title,
      });
    }
  },
}));
