import { useEffect, useRef } from "react"
import getAdvancedAudioInfo from "../lib/getAdvancedAudioInfo"
import { initContext } from "../lib/initContext"
import { useAudioStore } from "../store/audioStore"
export default function AudioEl() {
  const songs = useAudioStore(state => state.songs)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const playing = useAudioStore(state => state.playing)
  const setPlaying = useAudioStore(state => state.setPlaying)
  const audio = useAudioStore(state => state.audio)
  const setAudio = useAudioStore(state => state.setAudio)
  const setAudioEl = useAudioStore(state => state.setAudioEl)
  const volume = useAudioStore(state => state.volume)
  const setAnalyser = useAudioStore(state => state.setAnalyser)
  const setFrequencyData = useAudioStore(state => state.setFrequencyData)
  const setTimeDomainData = useAudioStore(state => state.setTimeDomainData)

  const audioRef = useRef()
  const song = typeof currentSongIndex === "number" ? songs[currentSongIndex] : undefined

  // 设置音频元素引用
  useEffect(() => {
    const audioEl = audioRef?.current
    if (audioEl) {
      console.log(audioEl)
      setAudioEl(audioEl)

      // 初始化Web Audio API
      const context = initContext()
      const source = context.createMediaElementSource(audioEl)
      const gain = context.createGain()
      const analyser = context.createAnalyser()
      analyser.fftSize = 512 // 增加FFT大小以获取更详细的数据
      analyser.smoothingTimeConstant = 0.8 // 平滑因子，使可视化更流畅
      
      // 连接节点: source -> analyser -> gain -> destination
      source.connect(analyser)
      analyser.connect(gain)
      gain.connect(context.destination)

      // 存储到状态
      setAudio({ ...audio, context, source, gain, analyser })

      // 创建频率数据和时域数据数组
      const frequencyData = new Uint8Array(analyser.frequencyBinCount)
      const timeDomainData = new Uint8Array(analyser.frequencyBinCount)
      setFrequencyData(frequencyData)
      setTimeDomainData(timeDomainData)
    }
  }, [])

  useEffect(() => {
    if(audio?.context)
    getAdvancedAudioInfo(song?.uri, audio?.context).then(info => setAudio({ ...audio, ...info }))
    
  }, [song?.uri])
  // 处理歌曲切换
  useEffect(() => {
    const audioEl = audioRef?.current
    if (audioEl && song?.uri) {
      // 先暂停当前播放
      audioEl.pause()

      // 设置新的音频源
      audioEl.src = song?.uri
      audioEl.load()

      // 如果之前是播放状态，自动播放新歌曲
      if (playing) {
        setTimeout(() => {
          audioEl.play().catch(error => {
            console.error("自动播放失败:", error)
            setPlaying(false)
          })
        }, 100)
      }
    }
  }, [song?.uri])

  // 控制音量
  useEffect(() => {
    const audioEl = audioRef?.current
    if (audioEl) {
      audioEl.volume = volume
    }
    if (audio.gain) {
      audio.gain.gain.value = volume
    }
  }, [volume])

  // 控制播放/暂停
  useEffect(() => {
    const audioEl = audioRef?.current
    if (audioEl && song?.uri) {
      if (playing) {
        // 恢复音频上下文（如果被暂停）
        if (audio.context && audio.context.state === "suspended") {
          audio.context.resume()
        }
        audioEl.play().catch(error => {
          console.error("播放失败:", error)
          setPlaying(false)
        })
      } else {
        audioEl.pause()
      }
    }
  }, [playing])

  // 更新音频分析数据的函数
  const updateAudioData = () => {
    if (audio.analyser && audio.frequencyData && audio.timeDomainData) {
      // 获取频率数据
      audio.analyser.getByteFrequencyData(audio.frequencyData)
      
      // 获取时域数据
      audio.analyser.getByteTimeDomainData(audio.timeDomainData)
      
      // 计算实时能量值（RMS）
      let sum = 0
      for (let i = 0; i < audio.timeDomainData.length; i++) {
        const value = (audio.timeDomainData[i] - 128) / 128
        sum += value * value
      }
      const rms = Math.sqrt(sum / audio.timeDomainData.length)
      
      // 计算实时峰值
      let peak = 0
      for (let i = 0; i < audio.frequencyData.length; i++) {
        if (audio.frequencyData[i] > peak) {
          peak = audio.frequencyData[i]
        }
      }
      
      // 返回所有实时分析数据
      return {
        frequencyData: audio.frequencyData,
        timeDomainData: audio.timeDomainData,
        rms, // 实时能量值
        peak, // 实时峰值
        sampleRate: audio.context?.sampleRate || 44100,
        frequencyBinCount: audio.analyser.frequencyBinCount
      }
    }
    return {
      frequencyData: new Uint8Array(0),
      timeDomainData: new Uint8Array(0),
      rms: 0,
      peak: 0,
      sampleRate: 44100,
      frequencyBinCount: 0
    }
  }

  // 存储更新函数到状态
  useEffect(() => {
    if (audio.context) {
      setAnalyser({ update: updateAudioData })
    }
  }, [audio.context, audio.analyser, audio.frequencyData, audio.timeDomainData])

  return (
    <audio
      ref={audioRef}
      src={song?.uri ?? null}
      onPause={() => setPlaying(false)}
      onPlay={() => setPlaying(true)}
      onEnded={() => setPlaying(false)}
    />
  )
}