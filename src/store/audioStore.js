import { create } from "zustand";

export const useAudioStore = create((set, get) => ({
  songs: [],
  currentSongIndex: undefined,
  playing: false,
  visualizer: "geometry-particles",
  audioEl: undefined,
  volume: 0.6,
  prevVolume: 0.6,
  curTime: 0,
  audio: {
    context: null,
    source: null,
    gain: null,
    analyser: null,
    frequencyData: null
  },
  analyser: {
    update: () => 0
  },
  
  setVisualizer: visualizer => set({ visualizer }),
  setAudioEl: audioEl => set({ audioEl }),
  setVolume: volume => {
    const currentState = get();
    set({ volume, prevVolume: currentState.volume });
  },
  setCurTime: curTime => set({ curTime }),
  setAudio: audio => set(state => ({ audio: { ...state.audio, ...audio } })),
  setAnalyser: analyser => set(state => ({ analyser: { ...state.analyser, ...analyser } })),
  setFrequencyData: frequencyData => set(state => ({ 
    audio: { ...state.audio, frequencyData } 
  })),
  
  fetchSongs: async () => {
    const response = await fetch("/audioData.json");
    if (!response.ok) {
      throw new Error("Failed to fetch audio data");
    }
    const { songs } = await response.json();
    set({ songs });
  },
  
  setCurrentSongIndex: currentSongIndex => {
    const song = get().songs[currentSongIndex];
    if (!song) {
      throw new Error(`Song for index ${currentSongIndex} does not exist`);
    }
    
    set({ currentSongIndex, playing: true });
  },
  
  setPlaying: playing => {
    const { currentSongIndex } = get();
    if (playing && typeof currentSongIndex !== "number") {
      throw new Error("Can't start playing because there is no active song");
    }
    set({ playing });
  },
}));

// 初始化数据
useAudioStore.getState().fetchSongs();