import React, { useCallback, useRef, useEffect } from "react";

const DraggableContainer = ({ children, containerRef, handleValueChange, className }) => {
  const isDraggingRef = useRef(false);
  const touchIdRef = useRef(null); // 用于跟踪特定触摸点

  // 通用处理函数 - 根据事件类型获取客户端X坐标
  const getClientX = useCallback((event) => {
    if (event.type.includes('touch')) {
      // 如果是触摸事件，尝试使用我们跟踪的触摸点，如果没有则使用第一个触摸点
      if (touchIdRef.current !== null) {
        const touch = Array.from(event.touches).find(t => t.identifier === touchIdRef.current);
        if (touch) return touch.clientX;
      }
      return event.touches[0].clientX;
    }
    return event.clientX;
  }, []);

  // 开始拖拽/触摸
  const handleStart = useCallback((e) => {
    isDraggingRef.current = true;
    
    // 如果是触摸事件，跟踪特定触摸点
    if (e.type === 'touchstart') {
      touchIdRef.current = e.touches[0].identifier;
    }
    
    handleValueChange(getClientX(e));
  }, [handleValueChange, getClientX]);

  // 移动处理
  const handleMove = useCallback((e) => {
    if (isDraggingRef.current) {
      // 使用 requestAnimationFrame 避免阻止默认行为的问题
      requestAnimationFrame(() => {
        handleValueChange(getClientX(e));
      });
    }
  }, [handleValueChange, getClientX]);

  // 结束拖拽/触摸
  const handleEnd = useCallback(() => {
    isDraggingRef.current = false;
    touchIdRef.current = null;
  }, []);

  // 添加事件监听器
  useEffect(() => {
    const options = { passive: false };
    
    // 鼠标事件监听器
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    
    // 触摸事件监听器 - 使用 passive: false 选项
    document.addEventListener('touchmove', handleMove, options);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchcancel', handleEnd);
    
    return () => {
      // 清理鼠标事件监听器
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      
      // 清理触摸事件监听器
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchcancel', handleEnd);
    };
  }, [handleMove, handleEnd]);

  return (
    <div 
      ref={containerRef} 
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      className={className}
      style={{ touchAction: 'none' }} // 防止浏览器处理触摸事件
    >
      {children}
    </div>
  );
};

export default DraggableContainer;