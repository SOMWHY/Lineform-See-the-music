import { useAudioStore } from "../../../store/audioStore"

const ProgressFill = () => {
  const audioEl = useAudioStore(state => state.audioEl)
  const curTime = useAudioStore(state => state.curTime)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const hasSelectedSong = audioEl && typeof currentSongIndex === "number"
  const duration = hasSelectedSong ? audioEl?.duration : "--"
  const hasDuration = typeof duration === "number"

  const progressBarWidth = hasDuration ? `${(curTime / duration) * 100}%` : "0%"
  return <div style={{ width: progressBarWidth }} className='progress-bar bg-froly-500 after:bg-bunker-50 after:w-xs'></div>
}

export default ProgressFill
