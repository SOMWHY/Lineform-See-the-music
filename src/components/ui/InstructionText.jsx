import React from 'react'
import { useAudioStore } from '../../store/audioStore';

const InstructionText = () => {
    const { currentSongIndex } = useAudioStore();
    const hasSelectedSong=typeof currentSongIndex==="number"
  return (
      <h2 className={`font-comingSoon ${!hasSelectedSong?"animate-pulse":""}`}>Click on song title to play audio</h2>
  )
}

export default InstructionText