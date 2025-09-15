import React from "react"
import ZoomInLevelFill from "./ZoomInLevelFill"
import ZoomInLevelContainer from "./ZoomInLevelContainer"
import { RiZoomInFill } from "react-icons/ri"
const ZoomInLevelControl = () => {
  return (
    <div className='mt-xs px-md h-sm py-xs flex-center flex'>
      <div className='gap-md flex w-[100%] items-center'>
        <ZoomInLevelContainer>
          <ZoomInLevelFill />
        </ZoomInLevelContainer>
        <RiZoomInFill className='shrink-0' />
      </div>
    </div>
  )
}

export default ZoomInLevelControl
