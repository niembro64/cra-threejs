import { create } from 'zustand';
import { Project, projects } from '../data/projects';

interface AudioState {
  play: boolean;
  setPlay: (m: boolean) => void;
  mutedArray: boolean[];
  setMuted: (index: number, isMuted: boolean) => void;
  hasTouchedAudioButton: boolean;
}

export const useAudioStore = create<AudioState>((set) => ({
  hasTouchedAudioButton: false,
  mutedArray: [...projects.map((p: Project) => true)],
  play: true,
  setPlay: (newPlayState: boolean) => {
    set({ hasTouchedAudioButton: true });
    set({ mutedArray: [...projects.map((p: Project) => true)] });
    set({ play: newPlayState });
  },
  setMuted: (index: number, isMuted: boolean) => {
    set({ hasTouchedAudioButton: true });
    set({ play: false });
    set((state: AudioState) => {
      const m: boolean[] = [...projects.map((p) => true)];
      m[index] = isMuted;

      return { mutedArray: m };
    });
  },
}));
