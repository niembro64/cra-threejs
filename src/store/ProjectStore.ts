import ReactGA from 'react-ga4';
import { create } from 'zustand';
import { ConnectionQualityType, coding_projects, art_projects } from '../data/myData';
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

const allProjects = [...coding_projects, ...art_projects];

export const ProjectStore = create<ProjectStoreProps>((set) => ({
  hasTouchedAudioButton: false,
  mutedArray: [...allProjects.map(() => true)],
  play: true,
  connectionQuality: null,
  activeProjectIndex: null,
  setPlay: (newPlayState: boolean) => {
    set({ hasTouchedAudioButton: true });
    set({ mutedArray: [...allProjects.map(() => true)] });
    set({ play: newPlayState });
    ReactGA.event({
      category: 'User',
      action: 'Audio Spectrum Clicked',
      label: newPlayState ? 'Play' : 'Pause',
    });
  },
  setMuted: (index: number, isMuted: boolean) => {
    set({ hasTouchedAudioButton: true });
    set({ play: false });
    set(() => {
      const m: boolean[] = [...allProjects.map((p) => true)];
      m[index] = isMuted;

      ReactGA.event({
        category: 'User',
        action: 'Project Audio Clicked',
        label: isMuted ? 'Mute' : 'Unmute',
      });

      return { mutedArray: m };
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
