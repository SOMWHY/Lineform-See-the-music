import { returnCountedStates } from "../../../lib/utils"
import { useAudioStore } from "../../../store/audioStore"

const ProgressFill = () => {
  const audioEl = useAudioStore(state => state.audioEl)
  const curTime = useAudioStore(state => state.curTime)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const { hasDuration, duration } = returnCountedStates(audioEl, currentSongIndex)

  const progressBarWidth = hasDuration ? `${(curTime / duration) * 100}%` : "0%"
  return <div style={{ width: progressBarWidth }} className='progress-bar bg-froly-500 after:bg-bunker-50 after:w-xs'></div>
}

export default ProgressFill
