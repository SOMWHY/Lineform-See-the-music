import { useEffect, useRef } from "react"

import { useAudioStore } from "../store/audioStore"
import initWebAudioApi from "../lib/initWebAudioApi"

export default function AudioEl() {
  const songs = useAudioStore(state => state.songs)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)
  const playing = useAudioStore(state => state.playing)
  const setPlaying = useAudioStore(state => state.setPlaying)
  const audio = useAudioStore(state => state.audio)
  const setAudio = useAudioStore(state => state.setAudio)
  const setAudioEl = useAudioStore(state => state.setAudioEl)
  const volume = useAudioStore(state => state.volume)

  const audioRef = useRef()

  const song = typeof currentSongIndex === "number" ? songs[currentSongIndex] : undefined

  // on every song.uri, play it on mount - if there is no audio element create a new AudioContext
  useEffect(() => {
    const audioEl = audioRef?.current
    if (audioEl && song?.uri) {
      if (!audio) {
        const { context, source, analyzer, frequencyDataBuffer } = initWebAudioApi(audioEl)
        setAudio({ context, source, analyzer, frequencyDataBuffer })
      }
      setAudioEl(audioEl)
      audioEl.volume = volume
      audioEl.play()
    }
  }, [song?.uri, volume])

  useEffect(() => {
    const audioEl = audioRef.current
    if (audioEl && song?.uri) {
      if (!playing) {
        audioEl.pause()
      } else {
        audioEl.play()
      }
    }
  }, [playing])

  return (
    <audio
      ref={audioRef}
      src={song?.uri ?? null}
      onPause={event => setPlaying(!event.currentTarget.paused)}
      onPlay={event => setPlaying(!event.currentTarget.paused)}
    />
  )
}
