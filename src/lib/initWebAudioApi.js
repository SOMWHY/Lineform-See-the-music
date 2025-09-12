import React from 'react'

const initWebAudioApi = (audioEl) => {
          const context = new AudioContext();
        const source = context.createMediaElementSource(audioEl);
        const analyzer = context.createAnalyser();
        analyzer.connect(context.destination);
        analyzer.fftSize = 256;

        const frequencyDataBuffer = new Uint8Array(analyzer.frequencyBinCount);
       
        source.connect(analyzer);
  return {context,source,analyzer,frequencyDataBuffer}
}

export default initWebAudioApi