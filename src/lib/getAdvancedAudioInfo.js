export default async function getAdvancedAudioInfo(url) {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const context = new AudioContext()

  try {
    // 获取音频数据
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await context.decodeAudioData(arrayBuffer)

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

    // 创建音频节点
    const source = context.createBufferSource()
    source.buffer = audioBuffer
    source.loop = true

    const gain = context.createGain()
    const analyser = context.createAnalyser()
    analyser.fftSize = 64

    source.connect(analyser)
    analyser.connect(gain)
    gain.connect(context.destination)

    const frequencyData = new Uint8Array(analyser.frequencyBinCount)

    return {
      context,
      source,
      gain,
      analyser,
      frequencyData,
      audioBuffer,
      advancedInfo: {
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
      },
      update: () => {
        analyser.getByteFrequencyData(frequencyData)
        return frequencyData.reduce((prev, cur) => prev + cur / frequencyData.length, 0)
      },
    }
  } catch (error) {
    console.error("处理音频数据时出错:", error)
    throw error
  }
}
