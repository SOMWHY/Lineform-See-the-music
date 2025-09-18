import { useEffect, useRef } from "react"
import getAdvancedAudioInfo from "../lib/getAdvancedAudioInfo"
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

  const audioRef = useRef()
  const song = typeof currentSongIndex === "number" ? songs[currentSongIndex] : undefined

  useEffect(() => {
    getAdvancedAudioInfo(song?.uri).then(info => setAudio({ ...audio, ...info }))
  }, [song?.uri])

  // 设置音频元素引用
  useEffect(() => {
    const audioEl = audioRef?.current
    if (audioEl) {
      setAudioEl(audioEl)

      // 初始化Web Audio API
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const context = new AudioContext()
      const source = context.createMediaElementSource(audioEl)
      const gain = context.createGain()
      const analyser = context.createAnalyser()
      analyser.fftSize = 64

      // 连接节点: source -> analyser -> gain -> destination
      source.connect(analyser)
      analyser.connect(gain)
      gain.connect(context.destination)

      // 存储到状态
      setAudio({ ...audio, context, source, gain, analyser })

      // 创建频率数据数组
      const frequencyData = new Uint8Array(analyser.frequencyBinCount)
      setFrequencyData(frequencyData)
    }
  }, [])

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

  // 更新频率数据的函数
  const updateFrequencyData = () => {
    if (audio.analyser && audio.frequencyData) {
      audio.analyser.getByteFrequencyData(audio.frequencyData)
      return audio.frequencyData.reduce((prev, cur) => prev + cur / audio.frequencyData.length, 0)
    }
    return 0
  }

  // 存储更新函数到状态
  useEffect(() => {
    if (audio.context) {
      setAnalyser({ update: updateFrequencyData })
    }
  }, [audio.context, audio.analyser, audio.frequencyData])

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
