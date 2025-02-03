import { create } from 'zustand'
import { ConnectionQualityType, Project, projects } from '../data/projects'

interface AudioState {
  play: boolean
  setPlay: (m: boolean) => void
  mutedArray: boolean[]
  setMuted: (index: number, isMuted: boolean) => void
  hasTouchedAudioButton: boolean
  connectionQuality: ConnectionQualityType | null
  setConnectionQuality: (quality: ConnectionQualityType) => void
}

export const useResumeStore = create<AudioState>((set) => ({
  hasTouchedAudioButton: false,
  mutedArray: [...projects.map((p: Project) => true)],
  play: true,
  connectionQuality: null,
  setPlay: (newPlayState: boolean) => {
    set({ hasTouchedAudioButton: true })
    set({ mutedArray: [...projects.map((p: Project) => true)] })
    set({ play: newPlayState })
  },
  setMuted: (index: number, isMuted: boolean) => {
    set({ hasTouchedAudioButton: true })
    set({ play: false })
    set((state: AudioState) => {
      const m: boolean[] = [...projects.map((p) => true)]
      m[index] = isMuted

      return { mutedArray: m }
    })
  },
  setConnectionQuality: (quality: ConnectionQualityType) => {
    set({ connectionQuality: quality })
  },
}))
