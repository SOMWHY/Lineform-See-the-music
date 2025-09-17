import { Cloud, Clouds, Sky as SkyImpl } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"
import * as THREE from "three"

export function Sky() {
  const ref = useRef()
  const cloud0 = useRef()
  
  // 调整参数创建蓝天白云效果
  const { color, x, y, z, range, ...config } = useControls({
    seed: { value: 1, min: 1, max: 100, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 },
    volume: { value: 10, min: 0, max: 100, step: 0.1 }, // 增加云体积
    opacity: { value: 0.9, min: 0, max: 1, step: 0.01 }, // 增加不透明度使云更白
    fade: { value: 12, min: 0, max: 400, step: 1 },
    growth: { value: 6, min: 0, max: 20, step: 1 },
    speed: { value: 0.03, min: 0, max: 1, step: 0.01 }, // 减慢速度
    x: { value: 10, min: 0, max: 100, step: 1 },
    y: { value: 4, min: 0, max: 100, step: 1 },
    z: { value: 3, min: 0, max: 100, step: 1 },
    color: "#ffffff", // 将云改为白色
  })
  
  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 6) / 6 // 进一步减慢旋转
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 6) / 6
    cloud0.current.rotation.y -= delta / 3 // 进一步减慢云旋转
  })
  
  return (
    <>
      {/* 调整天空参数使其更蓝 */}
      <SkyImpl 
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
        mieCoefficient={0.004}
        mieDirectionalG={0.7}
        rayleigh={3} // 增加瑞利散射使天空更蓝
        turbidity={4} // 降低浊度使天空更清澈
      />
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={range}>
          <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={color} />
          {/* 将所有云颜色改为白色或淡灰色 */}
          <Cloud {...config} bounds={[x, y, z]} color='#f8f8f8' seed={2} position={[15, 3, 0]} />
          <Cloud {...config} bounds={[x, y, z]} color='#f0f0f0' seed={3} position={[-15, 2, 0]} />
          <Cloud {...config} bounds={[x, y, z]} color='#f5f5f5' seed={4} position={[0, 4, -12]} />
          <Cloud {...config} bounds={[x, y, z]} color='#fafafa' seed={5} position={[0, 3, 12]} />
          {/* 修改大型云的颜色和参数 */}
          <Cloud concentrate='outside' growth={70} color='#eeeeee' opacity={0.8} seed={0.3} bounds={160} volume={160} />
        </Clouds>
      </group>
    </>
  )
}