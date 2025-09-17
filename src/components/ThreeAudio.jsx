import { AudioListener, AudioLoader, PositionalAudio } from "three"

import { useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useAudioStore } from "../store/audioStore"
const ThreeAudio = ({ element }) => {
  const audioRef = useRef(null)
  const { camera } = useThree()

  const songs = useAudioStore(state => state.songs)
  const currentSongIndex = useAudioStore(state => state.currentSongIndex)

  const song = typeof currentSongIndex === "number" ? songs[currentSongIndex] : undefined

  useEffect(() => {

    const listener = new AudioListener()
    camera.add(listener)

    const sound = new PositionalAudio(listener)

    const audioLoader = new AudioLoader()

    audioLoader.load(song?.uri, buffer => {
      sound.setBuffer(buffer)
      sound.setLoop(false)
      sound.setVolume(0.5)

      sound.setRefDistance(5)

      audioRef.current = sound

      const handleClick = () => {
        sound.play()
      }
      window.addEventListener("click", handleClick)
    })
  }, [song?.uri])

  return <mesh ref={audioRef}>{element}</mesh>
}

export default ThreeAudio
