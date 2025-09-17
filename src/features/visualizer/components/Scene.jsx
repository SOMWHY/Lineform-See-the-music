import { CameraControls, StatsGl } from "@react-three/drei"
import { Sky } from "./Sky"

export default function Scene() {
  return (
    <>
      <Sky />
      {/* 调整光照参数创建自然蓝天效果 */}
      <ambientLight intensity={Math.PI / 2.5} color="#a0c0ff" /> {/* 使用淡蓝色环境光模拟天空光 */}
      <directionalLight 
        position={[50, 50, 50]} 
        intensity={1.2} 
        color="#ffffff" 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      /> {/* 使用方向光模拟太阳光 */}
      <spotLight position={[0, 40, 0]} decay={0} distance={45} penumbra={1} intensity={40} color="#ffffff" /> {/* 降低强度 */}
      <spotLight position={[-20, 0, 10]} color='#a0ffff' angle={0.15} decay={0} penumbra={-1} intensity={10} /> {/* 大幅减少青色光强度 */}
      <spotLight position={[20, -10, 10]} color='#a0ffff' angle={0.2} decay={0} penumbra={-1} intensity={8} /> {/* 大幅减少青色光强度 */}
      <CameraControls />
    </>
  )
}