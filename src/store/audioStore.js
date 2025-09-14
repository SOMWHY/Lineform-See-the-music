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
  audio: null,
  
  setVisualizer: visualizer => set({ visualizer }),
  setAudioEl: audioEl => set({ audioEl }),
  setVolume: volume => {
    const currentState = get();
    set({ volume, prevVolume: currentState.volume });
  },
  setCurTime: curTime => set({ curTime }),
  
  // 清理音频节点的 action
  cleanupAudio: () => {
    const currentAudio = get().audio;
    if (currentAudio) {
      currentAudio.source?.disconnect();
      currentAudio.analyzer?.disconnect();
      currentAudio.context?.close().catch(console.error);
    }
    set({ audio: null });
  },
  
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
  
  setAudio: audio => set({ audio }),
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