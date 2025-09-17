import { Box, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { MovingTube } from "./MovingTube"
import Scene from "./Scene"

// const Scene = () => {
//   const boxRef = useRef()
//   useFrame((state, delta) => {
//     boxRef.current.rotation.y += 0.02
//   })

//   return (
//     <>
//       <Box ref={boxRef} args={[1, 1, 1]} rotation={[0.5, 0, 0]}>
//         <meshNormalMaterial />
//       </Box>
//       <MovingTube />
//       <ambientLight />
//     </>
//   )
// }

const VisualOutput = () => {
  return (
    <Canvas camera={{ position: [0, -10, 10], fov: 75 }}>
      <OrbitControls />
      <Scene />
    </Canvas>
  )
}

export default VisualOutput
