import { useEffect } from "react"
import { useAudioStore } from "../../../store/audioStore"
import ProgressBarContainer from "./ProgressBarContainer"
import ProgressFill from "./ProgressFill"

const ProgressBar = () => {
  const audioEl = useAudioStore(state => state.audioEl)
  const setCurTime = useAudioStore(state => state.setCurTime)

  useEffect(() => {
    if (!audioEl) return

    const handleTimeUpdate = () => {
      setCurTime(audioEl?.currentTime)
    }

    audioEl?.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      audioEl?.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [audioEl])

  return (
    <ProgressBarContainer>
      <ProgressFill />
    </ProgressBarContainer>
  )
}
export default ProgressBar
