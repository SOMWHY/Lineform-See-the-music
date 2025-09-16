import { useCallback, useRef } from "react"
import DraggableContainer from "../../../components/DraggableContainer"
import { useCheckTouchDevice } from "../../../hooks/useCheckTouchDevice"
import { returnClickValue } from "../../../lib/utils"
import { useAudioStore } from "../../../store/audioStore"

const ProgressBarContainer = ({ children }) => {
  const audioEl = useAudioStore(state => state.audioEl)
  const setCurTime = useAudioStore(state => state.setCurTime)
  const containerRef = useRef()
  const [isTouchDevice] = useCheckTouchDevice()

  const handleProgressChange = useCallback(
    clientX => {
      if (!containerRef.current || !audioEl || !audioEl.duration || audioEl.duration <= 0) return

      const clickCurTime = returnClickValue(clientX,containerRef, audioEl.duration)
      setCurTime(clickCurTime)
      audioEl.currentTime = clickCurTime
    },
    [audioEl, setCurTime]
  )

  // 根据设备类型动态设置高度类
  const heightClass = isTouchDevice ? "h-sm" : "h-2xs"

  return (
    <DraggableContainer
      containerRef={containerRef}
      handleValueChange={handleProgressChange}
      className={`bg-bunker-300/60 ${heightClass} mx-2xs mb-sm mt-lg w-full cursor-pointer `}
    >
      {children}
    </DraggableContainer>
  )
}

export default ProgressBarContainer
