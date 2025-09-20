import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Scene from "./Scene"

const VisualOutput = () => {
  return (
    <Canvas  camera={{  position: [15, 15, 30] , fov: 75 }}>
    
      <OrbitControls />
      <Scene />
    </Canvas>
  )
}

export default VisualOutput
