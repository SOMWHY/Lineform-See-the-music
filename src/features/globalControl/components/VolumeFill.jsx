import { VOLUME } from "../../../lib/CONSTANTS"
import { useAudioStore } from "../../../store/audioStore"

const VolumeFill = () => {
 
  const volume = useAudioStore(state => state.volume)


  const progressBarWidth = volume ? `${(volume / VOLUME.MAX) * 100}%` : "0%"
  return (
    <div
      style={{ width: progressBarWidth }}
      className='progress-bar after:w-sm after:bg-bunker-50  bg-bunker-600'
    ></div>
  )
}

export default VolumeFill
