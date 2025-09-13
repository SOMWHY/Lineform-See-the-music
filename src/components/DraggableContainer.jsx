import React, { useCallback, useRef, useEffect } from "react"


const DraggableContainer = ({ children,containerRef,handleValueChange ,className}) => {
 

  const isDraggingRef = useRef(false)


  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true
    handleValueChange(e.clientX)
  }, [handleValueChange])

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) {
      handleValueChange(e.clientX)
    }
  }, [handleValueChange])

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div 
      ref={containerRef} 
      onMouseDown={handleMouseDown}
      className={className}
    >
      {children}
    </div>
  )
}

export default DraggableContainer