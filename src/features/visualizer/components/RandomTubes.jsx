import { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, CatmullRomCurve3, TubeGeometry, Color } from 'three';
import { useControls } from 'leva';
import { useAudioStore } from "../../../store/audioStore";

function RandomTube({ index, radius, opacity, speed, spread }) {
  const meshRef = useRef();
  const curveRef = useRef();
  const geometryRef = useRef();
  const initialPointsRef = useRef(); // 存储初始点
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  
  // 创建随机点来形成曲线
  const points = useMemo(() => {
    const pts = [];
    const numPoints = 4 + Math.floor(Math.random() * 3); // 4-6个点
    
    for (let i = 0; i < numPoints; i++) {
      // 使用固定的spread因子创建点，后续通过缩放控制实际spread
      pts.push(
        new Vector3(
          (Math.random() - 0.5) * 1, // 使用1作为基础spread
          (Math.random() - 0.5) * 1,
          (Math.random() - 0.5) * 0.5
        )
      );
    }
    
    // 保存初始点
    initialPointsRef.current = pts.map(point => point.clone());
    
    return pts;
  }, [index]); // 移除spread依赖

  // 创建曲线
  const curve = useMemo(() => new CatmullRomCurve3(points), [points]);

  // 保存曲线引用以便后续更新
  useEffect(() => {
    curveRef.current = curve;
    
    // 初始创建几何体
    geometryRef.current = new TubeGeometry(
      curve,
      32, // 减少分段数以提高性能
      radius,
      8,
      false
    );
    
    return () => {
      // 清理几何体
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
    };
  }, [curve, radius]);

  useFrame((state, delta) => {
    if (meshRef.current && curveRef.current && initialPointsRef.current) {
      const time = state.clock.getElapsedTime();
      
      // 使用传入的速度控制旋转和移动
      const movementSpeed = speed;
      
      // 持续的单向旋转 - 使用递增的角度而不是正弦/余弦
      rotationX.current += delta * 0.1 * movementSpeed;
      rotationY.current += delta * 0.15 * movementSpeed;
      
      meshRef.current.rotation.x = rotationX.current;
      meshRef.current.rotation.y = rotationY.current;
      
      // 根据当前spread缩放初始点
      const points = curveRef.current.points;
      for (let i = 0; i < points.length; i++) {
        points[i].copy(initialPointsRef.current[i]);
        points[i].multiplyScalar(spread);
      }
      
      // 让曲线点随时间轻微移动，创造流动效果
      points.forEach((point, i) => {
        // 每个点以不同的频率和方向移动
        // 移动幅度与spread成比例，使用较小的系数
        const moveFactor = 0.001 * movementSpeed * (spread / 15);
        point.x += Math.sin(time * 0.2 * movementSpeed + i * 0.5) * moveFactor;
        point.y += Math.cos(time * 0.3 * movementSpeed + i * 0.7) * moveFactor;
        point.z += Math.sin(time * 0.4 * movementSpeed + i) * moveFactor;
      });
      
      // 更新曲线
      curveRef.current.needsUpdate = true;
      
      // 更新几何体而不是重新创建
      if (geometryRef.current) {
        // 先清理旧几何体
        geometryRef.current.dispose();
        
        // 创建新几何体
        geometryRef.current = new TubeGeometry(
          curveRef.current,
          32,
          radius, // 使用传入的半径
          8,
          false
        );
        
        // 更新网格几何体
        meshRef.current.geometry = geometryRef.current;
      }
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometryRef.current}>
      <meshBasicMaterial 
        color={new Color(1, 1, 1)} // 纯白色
        transparent 
        opacity={opacity}
        side={2} // 双面渲染，避免背面变黑
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
    radius: baseRadius, 
    opacity: baseOpacity, 
    speed: baseSpeed, 
    spread: baseSpread,
    freqSensitivity,
    speedInfluence,
    radiusInfluence,
    opacityInfluence,
    spreadInfluence,
    spreadChangeThreshold // 添加阈值控制
  } = useControls('Random Tubes', {
    lineCount: { value: 12, min: 1, max: 30, step: 1 },
    radius: { value: 0.03, min: 0.01, max: 0.1, step: 0.01 },
    opacity: { value: 0.6, min: 0.1, max: 1, step: 0.05 },
    speed: { value: 0.5, min: 0.1, max: 3, step: 0.1 }, // 控制旋转速度
    spread: { value: 15, min: 5, max: 450, step: 1 },
    freqSensitivity: { value: 1.2, min: 0.5, max: 5, step: 0.1 },
    speedInfluence: { value: 0.2, min: 0, max: 1, step: 0.05 }, // 控制音频对速度的影响程度
    radiusInfluence: { value: 0.3, min: 0, max: 1, step: 0.05 }, // 控制频率对半径的影响程度
    opacityInfluence: { value: 0.4, min: 0, max: 1, step: 0.05 }, // 控制频率对透明度的影响程度
    spreadInfluence: { value: 0.3, min: 0, max: 1, step: 0.05 }, // 控制声场对分布范围的影响程度
    spreadChangeThreshold: { value: 0.3, min: 0.1, max: 0.8, step: 0.05 } // 控制spread变化的阈值
  });

  // 使用状态来跟踪所有参数
  const [lineCount, setLineCount] = useState(baseLineCount);
  const [radius, setRadius] = useState(baseRadius);
  const [opacity, setOpacity] = useState(baseOpacity);
  const [speed, setSpeed] = useState(baseSpeed);
  const [spread, setSpread] = useState(baseSpread);

  // 使用ref来跟踪之前的声场状态
  const prevTimeDynamic = useRef(0);
  const currentSpreadLevel = useRef(0);

  useFrame(() => {
    if (playing) {
      const audioData = update();
      const { frequencyData, rms, timeDomainData } = audioData;
      
      // 计算频率数据的平均值
      let freqAvg = 0;
      if (frequencyData && frequencyData.length > 0) {
        for (let i = 0; i < frequencyData.length; i++) {
          freqAvg += frequencyData[i];
        }
        freqAvg /= frequencyData.length;
        freqAvg = Math.pow(freqAvg / 255, freqSensitivity);
        
        // 使用频率影响线条数量
        setLineCount(Math.max(1, Math.min(30, Math.floor(1 + freqAvg * 29))));
        
        // 使用频率影响半径
        const radiusVariation = freqAvg * radiusInfluence;
        setRadius(Math.max(0.01, Math.min(0.1, baseRadius * (1 + radiusVariation))));
        
        // 使用频率影响透明度
        const opacityVariation = freqAvg * opacityInfluence;
        setOpacity(Math.max(0.1, Math.min(1.0, baseOpacity * (1 + opacityVariation))));
      }
      
      // 使用RMS轻微影响速度
      const speedVariation = rms * speedInfluence;
      setSpeed(Math.max(0.1, Math.min(3.0, baseSpeed * (1 + speedVariation))));
      
      // 使用时域数据的动态范围影响分布范围（声场影响）
      if (timeDomainData && timeDomainData.length > 0) {
        let min = 255;
        let max = 0;
        for (let i = 0; i < timeDomainData.length; i++) {
          if (timeDomainData[i] < min) min = timeDomainData[i];
          if (timeDomainData[i] > max) max = timeDomainData[i];
        }
        
        // 计算时域动态范围
        const timeDynamic = (max - min) / 255;
        
        // 只有当声场变化超过阈值时才更新spread
        const dynamicChange = Math.abs(timeDynamic - prevTimeDynamic.current);
        
        if (dynamicChange > spreadChangeThreshold) {
          // 将动态范围映射到离散的spread值
          const spreadLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
          let targetLevel = 0;
          
          for (let i = 0; i < spreadLevels.length; i++) {
            if (timeDynamic <= spreadLevels[i]) {
              targetLevel = i;
              break;
            }
          }
          
          // 只有当目标级别与当前级别不同时才更新spread
          if (targetLevel !== currentSpreadLevel.current) {
            // 计算目标spread值
            const newSpread = baseSpread * (1 + (targetLevel / spreadLevels.length) * spreadInfluence);
            setSpread(Math.max(5, Math.min(450, newSpread)));
            currentSpreadLevel.current = targetLevel;
          }
        }
        
        // 更新前一个声场值
        prevTimeDynamic.current = timeDynamic;
      }
    } else {
      // 如果没有播放音乐，使用控制面板的值
      setLineCount(baseLineCount);
      setRadius(baseRadius);
      setOpacity(baseOpacity);
      setSpeed(baseSpeed);
      setSpread(baseSpread);
      
      // 重置声场状态
      prevTimeDynamic.current = 0;
      currentSpreadLevel.current = 0;
    }
  });

  // 创建多条线
  const tubes = useMemo(() => {
    const tubesArray = [];
    // 只创建需要显示的线条
    for (let i = 0; i < Math.min(30, lineCount); i++) {
      tubesArray.push(
        <RandomTube 
          key={i} 
          index={i} 
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