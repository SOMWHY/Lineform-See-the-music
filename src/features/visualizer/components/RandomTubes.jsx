import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, CatmullRomCurve3, TubeGeometry, Color } from 'three';
import { useControls } from 'leva';

function RandomTube({ index, lineCount, radius, opacity, speed, spread }) {
  const meshRef = useRef();
  const curveRef = useRef();
  
  // 创建随机点来形成曲线
  const points = useMemo(() => {
    const pts = [];
    const numPoints = 4 + Math.floor(Math.random() * 3); // 4-6个点
    
    for (let i = 0; i < numPoints; i++) {
      // 使用spread参数控制分布范围
      pts.push(
        new Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * (spread / 2)
        )
      );
    }
    return pts;
  }, [index, lineCount, spread]); // 添加spread依赖

  // 创建曲线
  const curve = useMemo(() => new CatmullRomCurve3(points), [points]);

  // 保存曲线引用以便后续更新
  useEffect(() => {
    curveRef.current = curve;
  }, [curve]);

  // 使用曲线创建管状几何体
  const args = useMemo(() => [
    curve,
    64,    // tubularSegments
    radius,  // radius - 线条粗细
    8,     // radialSegments
    false  // closed
  ], [curve, radius]);

  useFrame((state) => {
    if (meshRef.current && curveRef.current) {
      // 缓慢的整体旋转
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1 * speed) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.15 * speed) * 0.1;
      
      // 让曲线点随时间轻微移动，创造流动效果
      const time = state.clock.getElapsedTime();
      const points = curveRef.current.points;
      
      points.forEach((point, i) => {
        // 每个点以不同的频率和方向移动
        // 移动幅度与spread成比例，保持相对运动的一致性
        const moveFactor = 0.005 * speed * (spread / 15);
        point.x += Math.sin(time * 0.2 * speed + i * 0.5) * moveFactor;
        point.y += Math.cos(time * 0.3 * speed + i * 0.7) * moveFactor;
        point.z += Math.sin(time * 0.4 * speed + i) * moveFactor;
      });
      
      // 更新曲线
      curveRef.current.needsUpdate = true;
      
      // 创建新的几何体并替换旧的
      const newGeometry = new TubeGeometry(
        curveRef.current,
        64,
        radius,
        8,
        false
      );
      
      // 替换几何体并处理旧几何体
      if (meshRef.current.geometry) {
        meshRef.current.geometry.dispose();
      }
      meshRef.current.geometry = newGeometry;
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={args} />
      <meshBasicMaterial 
        color={new Color(1, 1, 1)} // 纯白色
        transparent 
        opacity={opacity} 
      />
    </mesh>
  );
}

export function RandomTubes() {
  // 使用Leva创建控制面板，添加spread参数
  const { lineCount, radius, opacity, speed, spread } = useControls('Random Tubes', {
    lineCount: { value: 12, min: 1, max: 30, step: 1 },
    radius: { value: 0.03, min: 0.01, max: 0.1, step: 0.01 },
    opacity: { value: 0.6, min: 0.1, max: 1, step: 0.05 },
    speed: { value: 1, min: 0.1, max: 3, step: 0.1 },
    spread: { value: 15, min: 5, max: 450, step: 1 }
  });

  // 创建多条线
  const tubes = useMemo(() => {
    const tubesArray = [];
    for (let i = 0; i < lineCount; i++) {
      tubesArray.push(
        <RandomTube 
          key={i} 
          index={i} 
          lineCount={lineCount}
          radius={radius}
          opacity={opacity}
          speed={speed}
          spread={spread}
        />
      );
    }
    return tubesArray;
  }, [lineCount, radius, opacity, speed, spread]);

  return <>{tubes}</>;
}