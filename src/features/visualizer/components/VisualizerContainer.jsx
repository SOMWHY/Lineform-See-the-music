import { BACKGROUND, VISUALIZER } from "../../../lib/CONSTANTS"
import { useCanvasStore } from "../../../store/canvasStore"
import City from "./City"
import Grass from "./Grass"
import { RandomTubes } from "./RandomTubes"
import Sky from "./Sky"

const VisualizerContainer = () => {
  const background = useCanvasStore(state => state.background)
  const visualizer = useCanvasStore(state => state.visualizer)

  return (
    <>
      {background === BACKGROUND.SKY && <Sky />}
      {background === BACKGROUND.GRASS && <Grass />}
      {background === BACKGROUND.CITY && <City />}
      {visualizer === VISUALIZER.LINE_FORM && <RandomTubes />}
    </>
  )
}

export default VisualizerContainer
