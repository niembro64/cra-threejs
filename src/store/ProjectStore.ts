import { create } from 'zustand'
import { ConnectionQualityType, projects } from '../data/projects'

interface ProjectStoreProps {
  play: boolean
  setPlay: (m: boolean) => void
  mutedArray: boolean[]
  setMuted: (index: number, isMuted: boolean) => void
  hasTouchedAudioButton: boolean
  connectionQuality: ConnectionQualityType | null
  setConnectionQuality: (quality: ConnectionQualityType) => void
}

export const ProjectStore = create<ProjectStoreProps>((set) => ({
  hasTouchedAudioButton: false,
  mutedArray: [...projects.map(() => true)],
  play: true,
  connectionQuality: null,
  setPlay: (newPlayState: boolean) => {
    set({ hasTouchedAudioButton: true })
    set({ mutedArray: [...projects.map(() => true)] })
    set({ play: newPlayState })
  },
  setMuted: (index: number, isMuted: boolean) => {
    set({ hasTouchedAudioButton: true })
    set({ play: false })
    set(() => {
      const m: boolean[] = [...projects.map((p) => true)]
      m[index] = isMuted

      return { mutedArray: m }
    })
  },
  setConnectionQuality: (quality: ConnectionQualityType) => {
    set({ connectionQuality: quality })
  },
}))
