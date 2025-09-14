import { Playlist } from "./features/player/components/Playlist"
import VisualOutput from "./features/visualizer/components/VisualOutput"
import GlobalControlContainer from "./features/globalControl/components/GlobalControlContainer"
import InfoDisplayContainer from "./features/infoDisplay/components/InfoDisplayContainer"


const App = () => {
  return (
    <>
      <VisualOutput />
      <Playlist />
      <GlobalControlContainer />
      <InfoDisplayContainer />
    
    </>
  )
}

export default App
