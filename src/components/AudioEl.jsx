import { useEffect, useRef, useCallback } from "react";
import { useAudioStore } from "../store/audioStore";
import initWebAudioApi, { cleanupWebAudioApi } from "../lib/initWebAudioApi";
import getAdvancedAudioInfo from "../lib/getAdvancedAudioInfo";

export default function AudioEl() {
  const songs = useAudioStore(state => state.songs);
  const currentSongIndex = useAudioStore(state => state.currentSongIndex);
  const playing = useAudioStore(state => state.playing);
  const setPlaying = useAudioStore(state => state.setPlaying);
  const audio = useAudioStore(state => state.audio);
  const setAudio = useAudioStore(state => state.setAudio);
  const setAudioEl = useAudioStore(state => state.setAudioEl);
  const volume = useAudioStore(state => state.volume);

  const audioRef = useRef();
  const song = typeof currentSongIndex === "number" ? songs[currentSongIndex] : undefined;

  // 初始化 Web Audio API (只执行一次)
  useEffect(() => {
    const context = initWebAudioApi();
    setAudio({ context });
    
    return () => {
      // 组件卸载时清理
      cleanupWebAudioApi();
    };
  }, []);

  // 设置音频元素引用
  useEffect(() => {
    const audioEl = audioRef?.current;
    if (audioEl) {
      setAudioEl(audioEl);
    }
  }, []);

  // 处理歌曲切换
  useEffect(() => {
    const audioEl = audioRef?.current;
    if (audioEl && song?.uri) {
      // 先暂停当前播放
      audioEl.pause();
      
      // 设置新的音频源
      audioEl.src = song.uri;
      audioEl.load();
      
      // 获取高级音频信息
      getAdvancedAudioInfo(song.uri)
        .then(advancedInfo => {
          //Question
          setAudio(({ ...audio, ...advancedInfo }));
          console.log(advancedInfo)
        })
        .catch(error => {
          console.error("获取高级音频信息失败:", error);
        });
      
      // 如果之前是播放状态，自动播放新歌曲
      if (playing) {
        setTimeout(() => {
          audioEl.play().catch(error => {
            console.error("自动播放失败:", error);
            setPlaying(false);
          });
        }, 100);
      }
    }
  }, [song?.uri]);

  // 控制音量
  useEffect(() => {
    const audioEl = audioRef?.current;
    if (audioEl) {
      audioEl.volume = volume;
    }
  }, [volume]);

  // 控制播放/暂停
  useEffect(() => {
    const audioEl = audioRef?.current;
    if (audioEl && song?.uri) {
      if (playing) {
        audioEl.play().catch(error => {
          console.error("播放失败:", error);
          setPlaying(false);
        });
      } else {
        audioEl.pause();
      }
    }
  }, [playing]);

  // 连接音频元素到 Web Audio API (在音频元素就绪后执行)
  const connectAudioToWebAudio = useCallback(() => {
    const audioEl = audioRef?.current;
    const context = audio?.context;
    
    if (audioEl && context && context.state === 'running') {
      try {
        // 创建源节点
        const source = context.createMediaElementSource(audioEl);
        const analyzer = context.createAnalyser();
        analyzer.fftSize = 256;
        
        const frequencyDataBuffer = new Uint8Array(analyzer.frequencyBinCount);
        
        // 连接节点
        source.connect(analyzer);
        analyzer.connect(context.destination);
        
        // 更新状态
        setAudio(prev => ({ 
          ...prev, 
          source, 
          analyzer, 
          frequencyDataBuffer 
        }));
        
        console.log("音频元素已连接到 Web Audio API");
      } catch (error) {
        console.error("连接音频元素到 Web Audio API 失败:", error);
      }
    }
  }, [audio?.context]);

  // 当音频元素就绪时连接 Web Audio API
  useEffect(() => {
    const audioEl = audioRef?.current;
    if (audioEl) {
      const handleCanPlay = () => {
        connectAudioToWebAudio();
      };
      
      audioEl.addEventListener('canplay', handleCanPlay);
      
      return () => {
        audioEl.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [connectAudioToWebAudio]);

  return (
    <audio
      ref={audioRef}
      src={song?.uri ?? null}
      onPause={() => setPlaying(false)}
      onPlay={() => setPlaying(true)}
      onEnded={() => setPlaying(false)}
    />
  );
}