import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const ToggleBtn = ({toggleSideBar,hideSidebar}) => {
  return (
    <div
        onClick={toggleSideBar}
        className='bg-bunker-100/60 text-bunker-950/95 flex-center shadow-bunker-300/50 absolute top-[50%] right-0 flex aspect-square w-xl translate-x-[50%] -translate-y-[50%] rounded-full text-2xl shadow-inner btn hover:text-bunker-300
        '
      >
        {hideSidebar ? <FaAngleRight /> : <FaAngleLeft />}
      </div>
  )
}

export default ToggleBtn