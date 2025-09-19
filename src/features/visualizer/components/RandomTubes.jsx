import { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, CatmullRomCurve3, TubeGeometry, Color } from 'three';
import { useControls } from 'leva';
import { useAudioStore } from "../../../store/audioStore";

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
  }, [index, lineCount, spread]); 

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
  const { update } = useAudioStore(state => state.analyser);
  const playing = useAudioStore(state => state.playing);
  
  // 使用Leva创建控制面板
  const { 
    lineCount: baseLineCount, 
    radius, 
    opacity: baseOpacity, 
    speed: baseSpeed, 
    spread: baseSpread, 
    audioInfluence,
    rmsSensitivity,
    peakSensitivity,
    freqSensitivity,
    timeSensitivity
  } = useControls('Random Tubes', {
    lineCount: { value: 12, min: 1, max: 30, step: 1 },
    radius: { value: 0.03, min: 0.01, max: 0.1, step: 0.01 },
    opacity: { value: 0.6, min: 0.1, max: 1, step: 0.05 },
    speed: { value: 1, min: 0.1, max: 3, step: 0.1 },
    spread: { value: 15, min: 5, max: 450, step: 1 },
    audioInfluence: { value: 0.8, min: 0, max: 1, step: 0.1 }, // 增加默认影响值
    rmsSensitivity: { value: 2.0, min: 0.5, max: 5, step: 0.1 }, // RMS灵敏度
    peakSensitivity: { value: 1.5, min: 0.5, max: 5, step: 0.1 }, // 峰值灵敏度
    freqSensitivity: { value: 1.0, min: 0.5, max: 5, step: 0.1 }, // 频率灵敏度
    timeSensitivity: { value: 0.8, min: 0.5, max: 5, step: 0.1 } // 时域灵敏度
  });

  // 使用ref存储动态变化的值
  const lineCountRef = useRef(baseLineCount);
  const opacityRef = useRef(baseOpacity);
  const speedRef = useRef(baseSpeed);
  const spreadRef = useRef(baseSpread);

  useFrame(() => {
    if (playing && audioInfluence > 0) {
      const audioData = update();
      const { rms, peak, frequencyData, timeDomainData } = audioData;
      
      // 增强音频数据的影响
      const enhancedRMS = Math.pow(rms, rmsSensitivity);
      const enhancedPeak = Math.pow(peak / 255, peakSensitivity);
      
      // 计算频率数据的动态范围
      let freqDynamic = 0;
      if (frequencyData && frequencyData.length > 0) {
        let min = 255;
        let max = 0;
        for (let i = 0; i < frequencyData.length; i++) {
          if (frequencyData[i] < min) min = frequencyData[i];
          if (frequencyData[i] > max) max = frequencyData[i];
        }
        freqDynamic = Math.pow((max - min) / 255, freqSensitivity);
      }
      
      // 计算时域数据的动态范围
      let timeDynamic = 0;
      if (timeDomainData && timeDomainData.length > 0) {
        let min = 255;
        let max = 0;
        for (let i = 0; i < timeDomainData.length; i++) {
          if (timeDomainData[i] < min) min = timeDomainData[i];
          if (timeDomainData[i] > max) max = timeDomainData[i];
        }
        timeDynamic = Math.pow((max - min) / 255, timeSensitivity);
      }
      
      // 计算综合音频影响 - 使用非线性组合增强效果
      const combinedAudioEffect = (
        enhancedRMS * 0.4 + 
        enhancedPeak * 0.3 + 
        freqDynamic * 0.2 + 
        timeDynamic * 0.1
      );
      
      // 计算音频影响因子
      const influence = audioInfluence;
      
      // 使用非线性映射函数增强视觉效果
      lineCountRef.current = Math.floor(
        baseLineCount * (1 - influence) + 
        (5 + Math.floor(Math.pow(combinedAudioEffect, 1.5) * 25)) * influence
      );
      
      opacityRef.current = 
        baseOpacity * (1 - influence) + 
        (0.2 + Math.pow(combinedAudioEffect, 1.2) * 0.8) * influence;
      
      speedRef.current = 
        baseSpeed * (1 - influence) + 
        (0.2 + Math.pow(combinedAudioEffect, 1.3) * 2.8) * influence;
      
      spreadRef.current = 
        baseSpread * (1 - influence) + 
        (5 + Math.pow(combinedAudioEffect, 1.4) * 45) * influence;
    } else {
      // 如果没有播放音乐或影响度为0，使用Leva控制的值
      lineCountRef.current = baseLineCount;
      opacityRef.current = baseOpacity;
      speedRef.current = baseSpeed;
      spreadRef.current = baseSpread;
    }
  });

  // 创建多条线
  const tubes = useMemo(() => {
    const tubesArray = [];
    for (let i = 0; i < lineCountRef.current; i++) {
      tubesArray.push(
        <RandomTube 
          key={i} 
          index={i} 
          lineCount={lineCountRef.current}
          radius={radius}
          opacity={opacityRef.current}
          speed={speedRef.current}
          spread={spreadRef.current}
        />
      );
    }
    return tubesArray;
  }, [lineCountRef.current, radius, opacityRef.current, speedRef.current, spreadRef.current]);

  return <>{tubes}</>;
}