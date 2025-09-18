export function secondToMinuteSecond(seconds) {
  if (seconds < 60) {
    return (seconds < 10 ? "0" + seconds : seconds) + "s"
  } else {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return minutes + "min" + (remainingSeconds > 0 ? (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds) + "s" : "")
  }
}

export function returnCountedStates(audioEl, currentSongIndex) {
  const hasSelectedSong = audioEl && typeof currentSongIndex === "number"
  const duration = hasSelectedSong ? audioEl?.duration : "--"
  const hasDuration = typeof duration === "number"
  return { hasSelectedSong, hasDuration, duration }
}

export const randomColor = () =>`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

export function returnClickValue(clientX,containerRef,valueMax){


  const { left, width } = containerRef.current.getBoundingClientRect();
  const clickPosition = Math.max(0, Math.min(1, (clientX - left) / width));
  const clickVolume = clickPosition * valueMax

  return clickVolume
}

export function getSongUrl(currentSongIndex,songs){
  const song=typeof currentSongIndex==="number"?songs[currentSongIndex]:undefined
  return song?.url

}