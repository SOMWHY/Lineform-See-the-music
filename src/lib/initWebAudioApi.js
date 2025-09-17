let audioContext = null;

const initWebAudioApi = () => {
  // 如果已经存在 AudioContext，直接返回
  if (audioContext) {
    return audioContext;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
  
  return audioContext;
};

// 清理函数
export const cleanupWebAudioApi = () => {
  if (audioContext) {
    audioContext.close().then(() => {
      audioContext = null;
      console.log("AudioContext 已关闭");
    }).catch(error => {
      console.error("关闭 AudioContext 时出错:", error);
    });
  }
};

export default initWebAudioApi;