export const initContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const context = new AudioContext()
  return context
}
