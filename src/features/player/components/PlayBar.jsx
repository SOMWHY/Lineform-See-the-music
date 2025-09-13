import { useAudioStore } from "../../../store/audioStore"
import ProgressBar from "./ProgressBar"
import BtnPrev from "./BtnPrev"
import BtnPlayPause from "./BtnPlayPause"
import BtnNext from "./BtnNext"

import AudioEl from "../../../components/AudioEl"


export const PlayBar = () => {
  const songs = useAudioStore(state => state.songs)
  const audioEl = useAudioStore(state => state.audioEl)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const setCurrentSongIndex = useAudioStore(state => state.setCurrentSongIndex)
  const playing = useAudioStore(state => state.playing)
  const setPlaying = useAudioStore(state => state.setPlaying)

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

  return (
    <div>
      <ProgressBar />
      <div className='flex-center flex flex-row gap-[2em] text-[2em] leading-[2em]'>
        <BtnPrev prevTrack={prevTrack} />

        <BtnPlayPause playing={playing} togglePlaying={togglePlaying} />
        <BtnNext nextTrack={nextTrack} />
      </div>

      <AudioEl />
    </div>
  )
}
