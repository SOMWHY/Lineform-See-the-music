import React, { useCallback, useEffect, useRef } from "react"
import { useAudioStore } from "../../../store/audioStore"
import WavesurferPlayer from "@wavesurfer/react"
import SpinLoader from "../../../components/ui/SpinLoader"
import { randomColor } from "../../../lib/utils"
import { useWavesurferStore } from "../../../store/wavesurferStore"

const NonInteractiveWavesurfer = () => {
  const songs = useAudioStore(state => state.songs)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const curTime = useAudioStore(state => state.curTime)
  const setPlaying = useAudioStore(state => state.setPlaying)

  const zoomInLevel=useWavesurferStore(state=>state.zoomInLevel)

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

  const onReady = useCallback(ws => {
    wavesurferRef.current = ws

    ws.setVolume(0)

    if (ws.backend && ws.backend.disconnect) {
      ws.backend.disconnect()
    }
  }, [])

  const onFinish = () => {
    setPlaying(false)
  }

  // Randomize the wave color
  const onColorChange = () => {
    wavesurferRef?.current?.setOptions({ waveColor: randomColor() }) // fast -- no re-render
  }

  if (!currentSong) {
    return <SpinLoader className='mx-auto my-auto' />
  }

  return (
    <>
      <div style={{ pointerEvents: "none" }}>
        {" "}
        {/* 禁用所有交互 */}
        <WavesurferPlayer
          key={currentSongIndex} // 关键：切换歌曲时重新创建组件
          height={100}
          progressColor='white'
          cursorColor='transparent' // 隐藏光标
          url={currentSong?.uri} // 请确保歌曲对象中有url属性
          onReady={onReady}
          onFinish={onFinish}
          interact={false} // 禁用波形交互
          hideScrollbar={true} // 隐藏滚动条
          autoCenter={true}
          autoScroll={true}
          minPxPerSec={zoomInLevel}
          backend='MediaElement'
          // 确保即使有用户交互也不会播放声音
          mediaControls={false}
        />
      </div>
      <button onClick={onColorChange} className='font-comingSoon text-md font-semibold hover:opacity-100 opacity-80 transition-opacity'>
        Randomize color
      </button>
    </>
  )
}

export default NonInteractiveWavesurfer
