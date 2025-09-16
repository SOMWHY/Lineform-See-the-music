import React, { useEffect, useState } from 'react'

export const useCheckTouchDevice = () => {
      
    const [isTouchDevice,setIsTouchDevice]=useState(false)
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
      
  return (
   [isTouchDevice,setIsTouchDevice]
  )
}

