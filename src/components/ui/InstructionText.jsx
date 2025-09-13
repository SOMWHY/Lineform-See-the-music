import { returnCountedStates } from "../../lib/utils"
import { useAudioStore } from "../../store/audioStore"

const InstructionText = () => {
  const audioEl = useAudioStore(state => state.audioEl)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const { hasSelectedSong } = returnCountedStates(audioEl, currentSongIndex)
  return <h2 className={`font-comingSoon ${!hasSelectedSong ? "animate-pulse" : ""}`}>Click on song title to play audio</h2>
}

export default InstructionText
