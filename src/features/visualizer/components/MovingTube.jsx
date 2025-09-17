import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, CatmullRomCurve3, TubeGeometry } from 'three';

export function MovingTube() {
  const meshRef = useRef();
  // 创建一条示例曲线路径 (Catmull-Rom 曲线)
  const curve = useMemo(() => {
    const points = [
      new Vector3(-10, 0, 0),
      new Vector3(-5, 5, 0),
      new Vector3(0, 0, 0),
      new Vector3(5, -5, 0),
      new Vector3(10, 0, 0)
    ];
    return new CatmullRomCurve3(points);
  }, []);

  // 使用曲线创建管状几何体
  const args = useMemo(() => [
    curve,
    64,    //  tubularSegments
    0.2,   //  radius
    8,     //  radialSegments
    false  //  closed
  ], [curve]);

  useFrame((state) => {
    // 每一帧旋转网格物体，创造动画效果
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      // 你也可以在这里更新曲线控制点来让线条本身变形
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* @ts-ignore: 有时 TubeGeometry 的类型可能需要处理 */}
      <tubeGeometry args={args} />
      <meshPhongMaterial emissive={0x3399ff} emissiveIntensity={0.5} transparent opacity={0.6} side={"DoubleSide"} />
    </mesh>
  );
}
