import React, { useCallback, useRef, useEffect } from "react"
import { useAudioStore } from "../../../store/audioStore"
import DraggableContainer from "../../../components/DraggableContainer"

const VolumeBarContainer = ({ children }) => {
  const audioEl = useAudioStore(state => state.audioEl)
  const setVolume = useAudioStore(state => state.setVolume)
  const containerRef = useRef()


  const handleVolumeChange = useCallback((clientX) => {
    if (!containerRef.current || !audioEl) return

    const { left, width } = containerRef.current.getBoundingClientRect()
    const clickPosition = Math.max(0, Math.min(1, (clientX - left) / width))
    const clickVolume = clickPosition * 1
    setVolume(clickVolume)
    audioEl.volume = clickVolume
  }, [audioEl, setVolume])



  return (
    <DraggableContainer
    containerRef={containerRef}
    handleValueChange={handleVolumeChange}
      className='bg-bunker-300/60 h-xs w-full cursor-pointer'
    >
      {children}
    </DraggableContainer>
  )
}

export default VolumeBarContainer