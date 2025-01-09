import { create } from 'zustand';

interface AudioState {
  setIsMutedArray: (m: boolean[]) => void;
  isMutedArray: boolean[];
  setIsMuted: (index: number, isMuted: boolean) => void;
  hasTouchedAMuteButton: boolean;
  setHasTouchedAMuteButton: (hasTouched: boolean) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isMutedArray: [],
  setIsMuted: (index, isMuted) =>
    set((state: AudioState) => {
      const newMutedArray = [...state.isMutedArray];
      newMutedArray[index] = isMuted;
      return { isMutedArray: newMutedArray };
    }),
  hasTouchedAMuteButton: false,
  setIsMutedArray: (m: boolean[]) => {
    set({ isMutedArray: m });
  },
  setHasTouchedAMuteButton: (hasTouched) =>
    set({ hasTouchedAMuteButton: hasTouched }),
}));
