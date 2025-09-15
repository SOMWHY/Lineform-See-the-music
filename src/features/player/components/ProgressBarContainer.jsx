import React, { useCallback, useRef } from "react"
import { useAudioStore } from "../../../store/audioStore"
import DraggableContainer from "../../../components/DraggableContainer"

const ProgressBarContainer = ({ children }) => {
  const audioEl = useAudioStore(state => state.audioEl)
  const setCurTime = useAudioStore(state => state.setCurTime)
  const containerRef = useRef()
  
  const handleProgressChange = useCallback((clientX) => {
    if (!containerRef.current || !audioEl || !audioEl.duration || audioEl.duration <= 0) return

    const { left, width } = containerRef.current.getBoundingClientRect()
    const clickPosition = Math.max(0, Math.min(1, (clientX - left) / width))
    const clickCurTime = clickPosition * audioEl.duration
    setCurTime(clickCurTime)
    audioEl.currentTime = clickCurTime
  }, [audioEl, setCurTime])

  return (
    <DraggableContainer 
      containerRef={containerRef} 
      handleValueChange={handleProgressChange}
      className='bg-bunker-300/60 h-2xs mx-2xs mb-sm mt-lg w-full cursor-pointer'
    >
      {children}
    </DraggableContainer>
  )
}

export default ProgressBarContainer