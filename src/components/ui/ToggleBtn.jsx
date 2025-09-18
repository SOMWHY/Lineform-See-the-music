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
      if (position === POSITION.BOTTOM) {
        Icon = hideSidebar ? <FaAngleDown /> : <FaAngleUp />
      }
      if (position === POSITION.TOP) {
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
      className={`bg-bunker-900/90 text-bunker-300/75 flex-center non-scale-btn hover:text-bunker-300/100 absolute flex  text-2xl ${position === POSITION.RIGHT && "position-right"} ${position === POSITION.LEFT && "position-left"} ${position === POSITION.TOP && "position-top"} ${position === POSITION.BOTTOM && "position-bottom"} ${direction === DIRECTION.UP_DOWN && "h-md w-full"} ${direction === DIRECTION.LEFT_RIGHT && "h-full w-md"} `}
    >
      {Icon}
    </div>
  )
}

export default ToggleBtn
