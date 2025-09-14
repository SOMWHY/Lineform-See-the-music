export default function getAdvancedAudioInfo(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        // 创建临时 AudioContext 用于解码
        const AudioContext = window.AudioContext || window.webkitAudioContext
        const tempContext = new AudioContext()

        return tempContext.decodeAudioData(arrayBuffer).then(audioBuffer => {
          // 解码完成后关闭临时上下文
          tempContext.close()
          return audioBuffer
        })
      })
      .then(audioBuffer => {
        // 获取第一个声道的数据
        const channelData = audioBuffer.getChannelData(0)

        // 计算各种统计信息
        let peak = 0
        let sum = 0
        let sumOfSquares = 0

        for (let i = 0; i < channelData.length; i++) {
          const value = channelData[i]
          const absValue = Math.abs(value)

          // 峰值
          if (absValue > peak) {
            peak = absValue
          }

          // 用于RMS和平均值
          sum += value
          sumOfSquares += value * value
        }

        const rms = Math.sqrt(sumOfSquares / channelData.length)

        resolve({
          // 基本信息
          sampleRate: audioBuffer.sampleRate,
          numberOfChannels: audioBuffer.numberOfChannels,
          length: audioBuffer.length,
          duration: audioBuffer.duration,

          // 统计信息
          peakValue: peak,
          peakDb: 20 * Math.log10(peak),

          rmsValue: rms,
          rmsDb: 20 * Math.log10(rms),
          crestFactor: 20 * Math.log10(peak / rms),

          // 数据可用性标记
          hasData: channelData.length > 0,
        })
      })
      .catch(error => {
        console.error("处理音频数据时出错:", error)
        reject(error)
      })
  })
}
