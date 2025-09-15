import { BsFillVolumeMuteFill } from "react-icons/bs"
import { useAudioStore } from "../../../store/audioStore"
import VolumeBarContainer from "./VolumeBarContiner"
import VolumeFill from "./VolumeFill"
import { HiSpeakerWave } from "react-icons/hi2"
const VolumeControl = () => {
  const volume = useAudioStore(state => state.volume)
  const prevVolume = useAudioStore(state => state.prevVolume)
  const setVolume = useAudioStore(state => state.setVolume)
  const audioEl = useAudioStore(state => state.audioEl)

  const toggleMuted = () => {
    if (audioEl?.volume === 0) setVolume(prevVolume)
    else setVolume(0)
  }

  const isMuted = volume === 0
  return (
    <div className='mt-xs px-md h-sm py-xs flex-center flex'>
      <div className='gap-md flex w-[100%] items-center'>
        <VolumeBarContainer>
          <VolumeFill />
        </VolumeBarContainer>
        {/* icon depends on isMuted */}
        <span onClick={toggleMuted}>{isMuted ? <BsFillVolumeMuteFill className="shrink-0"/> : <HiSpeakerWave className="shrink-0"/>}</span>
      </div>
    </div>
  )
}

export default VolumeControl
