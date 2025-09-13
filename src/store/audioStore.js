import { create } from "zustand"

export const useAudioStore = create((set, get) => ({
  songs: [],
  currentSongIndex: undefined,
  playing: false,
  visualizer: "geometry-particles",
  audioEl: undefined,
  volume: 0.6,
  prevVolume: 0.6, // 添加 prevVolume 状态
  curTime: 0,
  setVisualizer: visualizer => {
    set({ visualizer })
  },
  setAudioEl: audioEl => {
    set({ audioEl })
  },
  setVolume: volume => {
    const currentState = get()
    // 设置音量时同时更新 prevVolume
    set({ volume, prevVolume: currentState.volume })
  },
  setCurTime: curTime => {
    set({ curTime })
  },
  fetchSongs: async () => {
    const response = await fetch("/audioData.json")
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
