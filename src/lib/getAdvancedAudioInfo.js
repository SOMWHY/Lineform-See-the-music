export default async function getAdvancedAudioInfo(url) {
  if(url===undefined) return
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const tempContext = new AudioContext()

  try {
    // 获取音频数据
    const response = await fetch(url)
    console.log("url", url)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await tempContext.decodeAudioData(arrayBuffer)
    tempContext.close()
    // 计算高级音频信息
    const channelData = audioBuffer.getChannelData(0)
    let peak = 0
    let sum = 0
    let sumOfSquares = 0

    for (let i = 0; i < channelData.length; i++) {
      const value = channelData[i]
      const absValue = Math.abs(value)

      peak = Math.max(peak, absValue)
      sum += value
      sumOfSquares += value * value
    }

    const rms = Math.sqrt(sumOfSquares / channelData.length)

    return {
      sampleRate: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels,
      length: audioBuffer.length,
      duration: audioBuffer.duration,
      peakValue: peak,
      peakDb: 20 * Math.log10(peak),
      rmsValue: rms,
      rmsDb: 20 * Math.log10(rms),
      crestFactor: 20 * Math.log10(peak / rms),
      hasData: channelData.length > 0,
    }
  } catch (error) {
    console.error("处理音频数据时出错:", error)
    throw error
  }
}
