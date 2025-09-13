import React from "react"
import { FaAngleLeft, FaAngleRight, FaAngleUp, FaAngleDown } from "react-icons/fa"
import { DIRECTION, POSITION } from "../../lib/CONSTANTS"
const ToggleBtn = ({ toggleSideBar, hideSidebar, direction, position }) => {
  let Icon
  switch (direction) {
    case DIRECTION.LEFT_RIGHT:
      if (position === POSITION.LEFT) {
        Icon = hideSidebar ? <FaAngleLeft /> : <FaAngleRight />
      }
      if (position === POSITION.RIGHT) {
        Icon = hideSidebar ? <FaAngleRight /> : <FaAngleLeft />
      }
      break
    case DIRECTION.UP_DOWN: 
      if (position === POSITION.DOWN) {
        Icon = hideSidebar ? <FaAngleDown /> : <FaAngleUp />
      }
      if (position === POSITION.UP) {
        Icon = hideSidebar ? <FaAngleUp /> : <FaAngleDown />
      }
      break
    default:
      console.error("No such direction!")
      break
  }
  return (
    <div
      onClick={toggleSideBar}
      className={`bg-bunker-100/60 text-bunker-950/95 flex-center shadow-bunker-300/50 btn hover:text-bunker-300 absolute flex aspect-square w-xl  rounded-full text-2xl shadow-inner ${position===POSITION.RIGHT&&"position-right"} ${position===POSITION.LEFT&&"position-left"} ${position===POSITION.TOP&&"position-top"} ${position===POSITION.BOTTOM&&"position-bottom"} `}
    >
      {Icon}
    </div>
  )
}

export default ToggleBtn
