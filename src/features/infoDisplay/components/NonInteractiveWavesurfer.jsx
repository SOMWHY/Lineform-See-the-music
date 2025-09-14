import React, { useEffect, useRef } from "react"
import { useAudioStore } from "../../../store/audioStore" // 请更正为您的store路径
import WavesurferPlayer from "@wavesurfer/react"
import SpinLoader from "../../../components/ui/SpinLoader"

/**
 * 非交互式音频可视化组件
 * 基于wavesurfer-react和Zustand store状态显示音频波形
 */
const NonInteractiveWavesurfer = () => {
  const songs = useAudioStore(state => state.songs)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const curTime = useAudioStore(state => state.curTime)
  const setPlaying = useAudioStore(state => state.setPlaying)
  const setCurTime = useAudioStore(state => state.setCurTime)

  const wavesurferRef = useRef(null)
  const currentSong = currentSongIndex !== undefined ? songs[currentSongIndex] : null

  // 处理播放进度同步
  useEffect(() => {
    if (!wavesurferRef.current || !wavesurferRef.current.getDuration()) return

    const duration = wavesurferRef.current.getDuration()
    if (duration > 0) {
      wavesurferRef.current.setTime(curTime)
    }
  }, [curTime])

  // Wavesurfer事件处理函数
  const onReady = ws => {
    wavesurferRef.current = ws
    ws.setVolume(0)
  }

  const onFinish = () => {
    setPlaying(false)
  }

  if (!currentSong) {
    return <SpinLoader className='mx-auto my-auto' />
  }

  return (
    <div style={{ pointerEvents: "none" }}>
      {" "}
      {/* 禁用所有交互 */}
      <WavesurferPlayer
        key={currentSongIndex} // 关键：切换歌曲时重新创建组件
        height={100}
        waveColor='violet'
        progressColor='white'
        cursorColor='transparent' // 隐藏光标
        url={currentSong?.uri} // 请确保歌曲对象中有url属性
        onReady={onReady}
        onFinish={onFinish}
        interact={false} // 禁用波形交互
        hideScrollbar={true} // 隐藏滚动条
        autoCenter={true}
        autoScroll={true}
        minPxPerSec={20}
        backend='MediaElement'
        // 确保即使有用户交互也不会播放声音
        mediaControls={false}
      />
    </div>
  )
}

export default NonInteractiveWavesurfer
