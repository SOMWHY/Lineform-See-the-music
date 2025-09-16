import React, { useCallback, useRef } from "react";
import { useAudioStore } from "../../../store/audioStore";
import DraggableContainer from "../../../components/DraggableContainer";
import { VOLUME } from "../../../lib/CONSTANTS";
import { returnClickValue } from "../../../lib/utils";

const VolumeBarContainer = ({ children }) => {
  const audioEl = useAudioStore(state => state.audioEl);
  const setVolume = useAudioStore(state => state.setVolume);
  const containerRef = useRef();

  const handleVolumeChange = useCallback((clientX) => {
    if (!containerRef.current || !audioEl) return;

  
    const clickVolume = returnClickValue(clientX,containerRef,VOLUME.MAX)
    setVolume(clickVolume);
    audioEl.volume = clickVolume;
  }, [audioEl, setVolume]);

  return (
    <DraggableContainer
      containerRef={containerRef}
      handleValueChange={handleVolumeChange}
      className='bg-bunker-300/60 h-xs w-full cursor-pointer'
    >
      {children}
    </DraggableContainer>
  );
};

export default VolumeBarContainer;