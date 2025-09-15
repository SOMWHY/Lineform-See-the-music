import React, { useCallback, useRef, useState, useEffect } from "react"
import { useAudioStore } from "../../../store/audioStore"
import DraggableContainer from "../../../components/DraggableContainer"

const ProgressBarContainer = ({ children }) => {
  const audioEl = useAudioStore(state => state.audioEl)
  const setCurTime = useAudioStore(state => state.setCurTime)
  const containerRef = useRef()
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  // 检测是否为触摸设备
  useEffect(() => {
    const checkTouchDevice = () => {
      // 方法1: 检查是否存在触摸事件支持
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // 方法2: 检查指针精度（触摸设备通常是coarse）
      const mediaQuery = window.matchMedia("(pointer: coarse)")
      
      // 使用任一方法检测为触摸设备
      setIsTouchDevice(hasTouch || mediaQuery.matches)
    }
    
    checkTouchDevice()
    
    // 监听窗口变化，重新检测
    window.addEventListener('resize', checkTouchDevice)
    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])
  
  const handleProgressChange = useCallback((clientX) => {
    if (!containerRef.current || !audioEl || !audioEl.duration || audioEl.duration <= 0) return

    const { left, width } = containerRef.current.getBoundingClientRect()
    const clickPosition = Math.max(0, Math.min(1, (clientX - left) / width))
    const clickCurTime = clickPosition * audioEl.duration
    setCurTime(clickCurTime)
    audioEl.currentTime = clickCurTime
  }, [audioEl, setCurTime])

  // 根据设备类型动态设置高度类
  const heightClass = isTouchDevice ? 'h-sm' : 'h-2xs'

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