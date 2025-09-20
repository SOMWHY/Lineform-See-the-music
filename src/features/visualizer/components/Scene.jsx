import { CameraControls } from "@react-three/drei"
import { useControls } from "leva" // 导入 Leva
import VisualizerContainer from "./VisualizerContainer"

export default function Scene() {
  // 1. 使用 Leva 创建光照控制面板
  const {
    ambientIntensity,
    ambientColor,
    directionalIntensity,
    directionalColor,
    directionalPosX,
    directionalPosY,
    directionalPosZ,
    spot1Intensity,
    spot1Color,
    spot1PosX,
    spot1PosY,
    spot1PosZ,
    spot2Intensity,
    spot2Color,
    spot2PosX,
    spot2PosY,
    spot2PosZ,
    spot3Intensity,
    spot3Color,
    spot3PosX,
    spot3PosY,
    spot3PosZ,
  } = useControls("Scene Lights", {
    // 环境光 (Ambient Light) 配置
    ambientIntensity: { value: Math.PI / 2.5, min: 0, max: 5, step: 0.1, label: "Ambient Intensity" },
    ambientColor: { value: "#bd687e", label: "Ambient Color" },
    // 平行光 (Directional Light) 配置
    directionalIntensity: { value: 1.2, min: 0, max: 10, step: 0.1, label: "Sun Intensity" },
    directionalColor: { value: "#ffffff", label: "Sun Color" },
    directionalPosX: { value: 50, min: -100, max: 100, step: 1, label: "Sun X" },
    directionalPosY: { value: 50, min: -100, max: 100, step: 1, label: "Sun Y" },
    directionalPosZ: { value: 50, min: -100, max: 100, step: 1, label: "Sun Z" },
    // 聚光灯 1 (Spotlight 1) 配置
    spot1Intensity: { value: 40, min: 0, max: 100, step: 1, label: "Spot 1 Intensity" },
    spot1Color: { value: "#88afd4", label: "Spot 1 Color" },
    spot1PosX: { value: 0, min: -50, max: 50, step: 1, label: "Spot 1 X" },
    spot1PosY: { value: 40, min: -50, max: 50, step: 1, label: "Spot 1 Y" },
    spot1PosZ: { value: 0, min: -50, max: 50, step: 1, label: "Spot 1 Z" },
    // 聚光灯 2 (Spotlight 2) 配置
    spot2Intensity: { value: 10, min: 0, max: 50, step: 0.5, label: "Spot 2 Intensity" },
    spot2Color: { value: "#a1aaff", label: "Spot 2 Color" },
    spot2PosX: { value: -20, min: -50, max: 50, step: 1, label: "Spot 2 X" },
    spot2PosY: { value: 0, min: -50, max: 50, step: 1, label: "Spot 2 Y" },
    spot2PosZ: { value: 10, min: -50, max: 50, step: 1, label: "Spot 2 Z" },
    // 聚光灯 3 (Spotlight 3) 配置
    spot3Intensity: { value: 8, min: 0, max: 50, step: 0.5, label: "Spot 3 Intensity" },
    spot3Color: { value: "#97f192", label: "Spot 3 Color" },
    spot3PosX: { value: 20, min: -50, max: 50, step: 1, label: "Spot 3 X" },
    spot3PosY: { value: -10, min: -50, max: 50, step: 1, label: "Spot 3 Y" },
    spot3PosZ: { value: 10, min: -50, max: 50, step: 1, label: "Spot 3 Z" },
  },{collapsed: true})

  return (
    <>
      <VisualizerContainer />
      {/* 使用 Leva 控制的灯光 */}
      <ambientLight intensity={ambientIntensity} color={ambientColor} />
      <directionalLight
        position={[directionalPosX, directionalPosY, directionalPosZ]}
        intensity={directionalIntensity}
        color={directionalColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[spot1PosX, spot1PosY, spot1PosZ]}
        decay={0}
        distance={45}
        penumbra={1}
        intensity={spot1Intensity}
        color={spot1Color}
      />
      <spotLight
        position={[spot2PosX, spot2PosY, spot2PosZ]}
        color={spot2Color}
        angle={0.15}
        decay={0}
        penumbra={-1}
        intensity={spot2Intensity}
      />
      <spotLight
        position={[spot3PosX, spot3PosY, spot3PosZ]}
        color={spot3Color}
        angle={0.2}
        decay={0}
        penumbra={-1}
        intensity={spot3Intensity}
      />
      <CameraControls />
    </>
  )
}
