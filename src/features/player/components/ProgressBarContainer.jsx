import React, { useCallback, useRef, useEffect } from "react"
import { useAudioStore } from "../../../store/audioStore"

const ProgressBarContainer = ({ children }) => {
  const audioEl = useAudioStore(state => state.audioEl)
  const setCurTime = useAudioStore(state => state.setCurTime)
  const containerRef = useRef()
  const isDraggingRef = useRef(false)

  const handleProgressChange = useCallback((clientX) => {
    if (!containerRef.current || !audioEl || !audioEl.duration) return

    const { left, width } = containerRef.current.getBoundingClientRect()
    const clickPosition = Math.max(0, Math.min(1, (clientX - left) / width))
    const clickCurTime = clickPosition * audioEl.duration
    setCurTime(clickCurTime)
    audioEl.currentTime = clickCurTime
  }, [audioEl, setCurTime])

  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true
    handleProgressChange(e.clientX)
  }, [handleProgressChange])

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) {
      handleProgressChange(e.clientX)
    }
  }, [handleProgressChange])

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
      ref={containerRef} 
      onMouseDown={handleMouseDown}
      className='bg-bunker-300/60 h-2xs mx-2xs mb-sm mt-lg w-full cursor-pointer'
    >
      {children}
    </div>
  )
}

export default ProgressBarContainer