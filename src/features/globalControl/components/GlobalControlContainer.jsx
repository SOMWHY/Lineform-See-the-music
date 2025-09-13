import { useState } from "react"
import VolumeControl from "./VolumeControl"
import ToggleBtn from "../../../components/ui/ToggleBtn"
import { DIRECTION, POSITION } from "../../../lib/CONSTANTS"

const GlobalControlContainer = () => {
  const [hideSidebar, setHideSidebar] = useState(false)
  function toggleSideBar() {
    setHideSidebar(curHideState => !curHideState)
  }
  return (
    <div
      className={`general-container h-5xl absolute top-0 right-0 flex w-5xl ${hideSidebar ? "-translate-y-[100%]" : "translate-y-0"} flex-col gap-[0.5em] p-[1.5em]`}
    >
      <ToggleBtn toggleSideBar={toggleSideBar} hideSidebar={hideSidebar} direction={DIRECTION.UP_DOWN} position={POSITION.BOTTOM}/>
      <VolumeControl />
    </div>
  )
}

export default GlobalControlContainer
