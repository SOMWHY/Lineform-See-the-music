import React, { useCallback, useRef } from 'react'
import DraggableContainer from '../../../components/DraggableContainer'
import { useWavesurferStore } from '../../../store/wavesurferStore'
import { ZOOM_IN_LEVEL_RANGE } from '../../../lib/CONSTANTS'

const ZoomInLevelContainer = ({children}) => {
const setZoomInLevel=useWavesurferStore(state=>state.setZoomInLevel)
    const containerRef = useRef()
    
    
      const handleZoomInLevelChange = useCallback((clientX) => {
        if (!containerRef.current) return
    
        const { left, width } = containerRef.current.getBoundingClientRect()
        const clickPosition = Math.max(0, Math.min(1, (clientX - left) / width))
        const clickZoomInLevel = clickPosition * ZOOM_IN_LEVEL_RANGE.MAX
        setZoomInLevel(clickZoomInLevel)
    
      }, [ setZoomInLevel])
    
  return (
  <DraggableContainer
    containerRef={containerRef}
    handleValueChange={handleZoomInLevelChange}
      className='bg-bunker-300/60 h-xs w-full cursor-pointer'
    >
      {children}
    </DraggableContainer>
  )
}

export default ZoomInLevelContainer