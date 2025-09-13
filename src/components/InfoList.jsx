import { useAudioStore } from "../store/audioStore"
import InfoText from "../components/ui/InfoText"
import { secondToMinuteSecond } from "../lib/utils"
const InfoList = () => {
  const audioEl = useAudioStore(state => state.audioEl)
  const curTime = useAudioStore(state => state.curTime)
  const volume = useAudioStore(state => state.volume)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)

  const hasSelectedSong = audioEl && typeof currentSongIndex === "number"
  const duration = hasSelectedSong ? audioEl?.duration : "--"

  const formattedCurTime = secondToMinuteSecond(Math.trunc(curTime))
  const formattedDuration = secondToMinuteSecond(Math.trunc(duration))
  const formattedVolume=volume.toFixed(2)
  return (
    <div className='info-list'>
      <InfoText name={"currentTime"}>{formattedCurTime?.toString()}</InfoText>
      <InfoText name={"duration"}>{formattedDuration?.toString()}</InfoText>
      
      <InfoText name={"volume"}>{formattedVolume?.toString()}</InfoText>
    </div>
  )
}

export default InfoList
