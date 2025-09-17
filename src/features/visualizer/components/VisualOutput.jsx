import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Scene from "./Scene"

const VisualOutput = () => {
  return (
    <Canvas camera={{ position: [0, -10, 10], fov: 75 }}>
      <OrbitControls />
      <Scene />
    </Canvas>
  )
}

export default VisualOutput
