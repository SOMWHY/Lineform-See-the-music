import { Cloud, Clouds, Sky as SkyImpl } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"
import * as THREE from "three"
// import { useAudioStore } from "../../../store/audioStore"

export function Sky() {
  const ref = useRef()
  const cloud0 = useRef()

  // const { update } = useAudioStore(state => state.analyser)
  // const playing = useAudioStore(state => state.playing)

  // leva controls
  const { color, x, y, z, range, ...config } = useControls('Sky',{
    seed: { value: 1, min: 1, max: 100, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 },
    volume: { value: 10, min: 0, max: 100, step: 0.1 },
    opacity: { value: 0.9, min: 0, max: 1, step: 0.01 },
    fade: { value: 12, min: 0, max: 400, step: 1 },
    growth: { value: 6, min: 0, max: 20, step: 1 },
    speed: { value: 0.03, min: 0, max: 1, step: 0.01 },
    x: { value: 10, min: 0, max: 100, step: 1 },
    y: { value: 4, min: 0, max: 100, step: 1 },
    z: { value: 3, min: 0, max: 100, step: 1 },
    color: "#8dbac1",
  },{collapsed: true})

  useFrame((state, delta) => {
    // let avg = playing ? update() :0
    // console.log(avg)
    ref.current.rotation.y =  Math.cos(state.clock.elapsedTime / 6) / 6
    ref.current.rotation.x =  Math.sin(state.clock.elapsedTime / 6) / 6
    cloud0.current.rotation.y -= delta / 3
  })

  return (
    <>
      <SkyImpl
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
        mieCoefficient={0.004}
        mieDirectionalG={0.7}
        rayleigh={3}
        turbidity={4}
      />
      <group ref={ref}>
        <Clouds texture={'/textures/sky/cloud.png'} material={THREE.MeshLambertMaterial} limit={400} range={range}>
          {/* 所有云朵使用相同的配置 */}
          <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={color} />
          <Cloud {...config} bounds={[x, y, z]} color={color} seed={2} position={[15, 3, 0]} />
          <Cloud {...config} bounds={[x, y, z]} color={color} seed={3} position={[-15, 2, 0]} />
          <Cloud {...config} bounds={[x, y, z]} color={color} seed={4} position={[0, 4, -12]} />
          <Cloud {...config} bounds={[x, y, z]} color={color} seed={5} position={[0, 3, 12]} />
          <Cloud 
            {...config} 
            concentrate='outside' 
            color={color} 
            seed={0.3} 
            bounds={160} 
            volume={160} 
          />
        </Clouds>
      </group>
    </>
  )
}

export default Sky