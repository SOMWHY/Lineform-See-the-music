import { useEffect, useState } from "react"
import { useAudioStore } from "../../store/audioStore"
import InfoText from "./InfoText"

const ProgressBar = ({ audioEl }) => {
  const { songs, setCurrentSongIndex, currentSongIndex } = useAudioStore()
  const [curTime, setCurTime] = useState(0) //TODO:change to zustand:add audioEl,curTime,setCurTime
  //change s to xxminxxs
  //after using zustand,move info-list below playBar
  useEffect(() => {
    if (!audioEl) return

    const handleTimeUpdate = () => {
      setCurTime(audioEl.currentTime)
    }

    audioEl.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      audioEl.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [audioEl])

  const hasSelectedSong = audioEl && typeof currentSongIndex === "number"
  const duration = hasSelectedSong ? audioEl?.duration : "--"
  const hasDuration = typeof duration === "number"
  return (
    <>
      <div className='bg-bunker-300/60 h-2xs mx-2xs mb-sm mt-lg w-full cursor-pointer'>
        <div
          style={{ width: hasDuration ? `${(curTime / duration) * 100}%` : "0%" }}
          className='progress-bar bg-froly-500 relative h-full transition-all hover:scale-y-150 hover:after:scale-x-150'
        ></div>
      </div>
      {/* <div className='info-list'>
        <InfoText name={"currentTime"}>{Math.trunc(curTime)?.toString()}s</InfoText>
        <InfoText name={"duration"}>{duration?.toString()}s</InfoText> 
      </div> */}
    </>
  )
}
export default ProgressBar
