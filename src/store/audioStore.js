import { create } from "zustand"

export const useAudioStore = create((set, get) => ({
  songs: [],
  currentSongIndex: undefined,
  playing: false,
  visualizer: "geometry-particles",
  setVisualizer: visualizer => {
    set({ visualizer })
  },
  fetchSongs: async () => {
    const response = await fetch(import.meta.env.BASE_URL+"/audioData.json")
    if (!response.ok) {
      throw new Error("Failed to fetch audio data")
    }

    const { songs } = await response.json()
    set({ songs })
  },
  setCurrentSongIndex: async currentSongIndex => {
    const song = get().songs[currentSongIndex]
    if (!song) {
      throw new Error(`Song for index ${currentSongIndex} does not exist`)
    }

    set({ currentSongIndex, playing: true })
  },
  setAudio: audio => {
    set({ audio })
  },
  setPlaying: playing => {
    const { currentSongIndex } = get()
    if (playing && typeof currentSongIndex !== "number") {
      throw new Error("Can't start playing because there is no active song")
    }

    set({ playing })
  },
}))

// initialise data
useAudioStore.getState().fetchSongs()
