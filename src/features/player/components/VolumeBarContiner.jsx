import React, { useCallback, useRef, useEffect } from "react"
import { useAudioStore } from "../../../store/audioStore"

const VolumeBarContainer = ({ children }) => {
  const audioEl = useAudioStore(state => state.audioEl)
  const setVolume = useAudioStore(state => state.setVolume)
  const volContainerRef = useRef()
  const isDraggingRef = useRef(false)

  const handleVolumeChange = useCallback((clientX) => {
    if (!volContainerRef.current || !audioEl) return

    const { left, width } = volContainerRef.current.getBoundingClientRect()
    const clickPosition = Math.max(0, Math.min(1, (clientX - left) / width))
    const clickVolume = clickPosition * 1
    setVolume(clickVolume)
    audioEl.volume = clickVolume
  }, [audioEl, setVolume])

  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true
    handleVolumeChange(e.clientX)
  }, [handleVolumeChange])

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) {
      handleVolumeChange(e.clientX)
    }
  }, [handleVolumeChange])

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div 
      ref={volContainerRef} 
      onMouseDown={handleMouseDown}
      className='bg-bunker-300/60 h-xs w-full cursor-pointer'
    >
      {children}
    </div>
  )
}

export default VolumeBarContainer