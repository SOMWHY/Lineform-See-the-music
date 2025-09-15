import React from 'react'
import { useWavesurferStore } from '../../../store/wavesurferStore'
import { ZOOM_IN_LEVEL_RANGE } from '../../../lib/CONSTANTS'

const ZoomInLevelFill = () => {
  const zoomInLevel = useWavesurferStore(state => state.zoomInLevel)


  const progressBarWidth = zoomInLevel ? `${(zoomInLevel / ZOOM_IN_LEVEL_RANGE.MAX) * 100}%` : "0%"
  return (
    <div
      style={{ width: progressBarWidth }}
      className='progress-bar after:w-sm after:bg-bunker-50  bg-bunker-600'
    ></div>
  )
}

export default ZoomInLevelFill