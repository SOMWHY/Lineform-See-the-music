import { useCallback, useRef } from "react"
import DraggableContainer from "../../../components/DraggableContainer"
import { ZOOM_IN_LEVEL_RANGE } from "../../../lib/CONSTANTS"
import { returnClickValue } from "../../../lib/utils"
import { useWavesurferStore } from "../../../store/wavesurferStore"

const ZoomInLevelContainer = ({ children }) => {
  const setZoomInLevel = useWavesurferStore(state => state.setZoomInLevel)
  const containerRef = useRef()

  const handleZoomInLevelChange = useCallback(
    clientX => {
      if (!containerRef.current) return

      const clickZoomInLevel = returnClickValue(clientX, containerRef, ZOOM_IN_LEVEL_RANGE.MAX)
      setZoomInLevel(clickZoomInLevel)
    },
    [setZoomInLevel]
  )

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
