import { useEffect, useRef, useState } from "react"

import { useAudioStore } from "../../../store/audioStore"
import { BsFillVolumeMuteFill } from "react-icons/bs"
import { HiSpeakerWave } from "react-icons/hi2"
import ProgressBar from "../../../components/ui/ProgressBar"
import BtnPrev from "../../../components/ui/BtnPrev"
import BtnPlayPause from "../../../components/ui/BtnPlayPause"
import BtnNext from "../../../components/ui/BtnNext"
import initWebAudioApi from "../../../lib/initWebAudioApi"

export const PlayBar = () => {
  const audioRef = useRef()

  const { songs, currentSongIndex, playing, setCurrentSongIndex, setPlaying, audio, setAudio } = useAudioStore()
  const song = typeof currentSongIndex === "number" ? songs[currentSongIndex] : undefined

  const [volume, setVolume] = useState(0.6)//TODO-change to zustand
  // on every song.uri, play it on mount - if there is no audio element create a new AudioContext
  useEffect(() => {
    const audioEl = audioRef.current
    if (audioEl && song?.uri) {
      if (!audio) {
        const { context, source, analyzer, frequencyDataBuffer } = initWebAudioApi(audioEl)
        setAudio({ context, source, analyzer, frequencyDataBuffer })
      }
      audioEl.volume = volume
      audioEl.play()
    }
  }, [song?.uri, volume])

  useEffect(() => {
    const audio = audioRef.current
    if (audio && song?.uri) {
      if (!playing) {
        audio.pause()
      } else {
        audio.play()
      }
    }
  }, [playing])

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
    if (audioRef?.current?.volume === 0) setVolume(1)
    else setVolume(0)
  }

  const isMuted = volume === 0

  return (
    <div>
      <ProgressBar audioEl={audioRef.current} />
      <div className='flex-center flex flex-row gap-[2em] text-[2em] leading-[2em]'>
        <BtnPrev prevTrack={prevTrack} audioRef={audioRef} />

        <BtnPlayPause playing={playing} togglePlaying={togglePlaying} />
        <BtnNext nextTrack={nextTrack} />
      </div>

      <div onClick={toggleMute} className='mt-xs pr-md flex justify-end'>
        {song ? isMuted ? <BsFillVolumeMuteFill /> : <HiSpeakerWave /> : ""}
      </div>

      <audio
        ref={audioRef}
        src={song?.uri ?? null}
        onPause={event => setPlaying(!event.currentTarget.paused)}
        onPlay={event => setPlaying(!event.currentTarget.paused)}
      />
    </div>
  )
}
