import { StatsGl } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { returnCountedStates, secondToMinuteSecond } from "../lib/utils"
import { useAudioStore } from "../store/audioStore"
import InfoText from "./ui/InfoText"

const InfoList = () => {
  const audioEl = useAudioStore(state => state.audioEl)
  const curTime = useAudioStore(state => state.curTime)
  const volume = useAudioStore(state => state.volume)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const audio = useAudioStore(state => state.audio) // 获取 audio 状态

  const { duration } = returnCountedStates(audioEl, currentSongIndex)

  const formattedCurTime = secondToMinuteSecond(Math.trunc(curTime))
  const formattedDuration = secondToMinuteSecond(Math.trunc(duration))
  const formattedVolume = volume.toFixed(2)

  // 从 audio 状态中获取声道数和采样率
  const numberOfChannels = audio?.numberOfChannels || "--"
  const sampleRate = audio?.sampleRate ? `${audio.sampleRate}hz` : "--"
  const formattedLength = audio?.length || "--"
  const formattedPeakDb = typeof audio?.peakDb === "number" ? `${audio.peakDb?.toFixed(2)}db` : "--"
  const formattedRmsDb = audio?.rmsDb ? `${audio.rmsDb?.toFixed(2)}db` : "--"
  const formattedCrestFactor = audio?.crestFactor?.toFixed(2) || "--"
  return (
    <div className='info-list overflow-y-scroll overflow-x-hidden scrollbar-hidden border-light-blue '>
 
      <InfoText name={"currentTime"}>{formattedCurTime}</InfoText>
      <InfoText name={"duration"}>{typeof duration === "number" ? formattedDuration : "--min--s"}</InfoText>
      <InfoText name={"volume"}>{formattedVolume}</InfoText>
      <InfoText name={"numberOfChannels"}>{numberOfChannels}</InfoText>
      <InfoText name={"sampleRate"}>{sampleRate}</InfoText>
      <InfoText name={"length"}>{formattedLength}</InfoText>
      <InfoText name={"peakDb"}>{formattedPeakDb}</InfoText>
      <InfoText name={"rmsDb"}>{formattedRmsDb}</InfoText>
      <InfoText name={"crestFactor"}>{formattedCrestFactor}</InfoText>
    </div>
  )
}

export default InfoList
