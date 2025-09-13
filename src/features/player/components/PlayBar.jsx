import { useAudioStore } from "../../../store/audioStore"
import { BsFillVolumeMuteFill } from "react-icons/bs"
import { HiSpeakerWave } from "react-icons/hi2"
import ProgressBar from "./ProgressBar"
import BtnPrev from "./BtnPrev"
import BtnPlayPause from "./BtnPlayPause"
import BtnNext from "./BtnNext"

import AudioEl from "../../../components/AudioEl"
import VolumeBarContainer from "./VolumeBarContiner"
import VolumeFill from "./VolumeFill"

export const PlayBar = () => {
  const songs = useAudioStore(state => state.songs)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const setCurrentSongIndex = useAudioStore(state => state.setCurrentSongIndex)
  const playing = useAudioStore(state => state.playing)
  const setPlaying = useAudioStore(state => state.setPlaying)
  const volume = useAudioStore(state => state.volume)
  const setVolume = useAudioStore(state => state.setVolume)
  const audioEl = useAudioStore(state => state.audioEl)

  const song = typeof currentSongIndex === "number" ? songs[currentSongIndex] : undefined

  const prevTrack = () => {
    if (typeof currentSongIndex === "number") {
      if (currentSongIndex > 0) {
        setCurrentSongIndex(currentSongIndex - 1)
      } else {
        setCurrentSongIndex(songs.length - 1)
      }
    }
  }

  const nextTrack = () => {
    if (typeof currentSongIndex === "number") {
      if (currentSongIndex < songs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1)
      } else {
        setCurrentSongIndex(0)
      }
    }
  }

  const togglePlaying = () => {
    setPlaying(!playing)
  }

  const toggleMute = () => {
    if (audioEl.volume === 0) setVolume(1)
    else setVolume(0)
  }

  const isMuted = volume === 0

  return (
    <div>
      <ProgressBar />
      <div className='flex-center flex flex-row gap-[2em] text-[2em] leading-[2em]'>
        <BtnPrev prevTrack={prevTrack} />

        <BtnPlayPause playing={playing} togglePlaying={togglePlaying} />
        <BtnNext nextTrack={nextTrack} />
      </div>

      <div className='mt-xs px-md h-sm py-xs flex-center flex'>
        <div className='gap-md flex w-[100%] items-center'>
          <VolumeBarContainer>
            <VolumeFill />
          </VolumeBarContainer>
          {/* have song->have icon */}
          {/* icon depends on isMuted */}
          <span onClick={toggleMute}>{song ? isMuted ? <BsFillVolumeMuteFill /> : <HiSpeakerWave /> : ""}</span>
        </div>
      </div>
      <AudioEl />
    </div>
  )
}
