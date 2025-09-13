import { useState } from "react"
import ToggleBtn from "../../../components/ui/ToggleBtn"
import { DIRECTION, POSITION } from "../../../lib/CONSTANTS"
import InfoList from "../../../components/InfoList"

const InfoDisplayContainer = () => {
  const [hideSidebar, setHideSidebar] = useState(false)
  function toggleSideBar() {
    setHideSidebar(curHideState => !curHideState)
  }
  return (
    <div
      className={`general-container h-5xl absolute right-0 bottom-0 flex w-5xl ${hideSidebar ? "translate-x-[100%]" : "translate-x-0"} flex-col gap-[0.5em] p-[1.5em]`}
    >
      <ToggleBtn toggleSideBar={toggleSideBar} hideSidebar={hideSidebar} direction={DIRECTION.LEFT_RIGHT} position={POSITION.LEFT} />
      <InfoList />
    </div>
  )
}

export default InfoDisplayContainer
