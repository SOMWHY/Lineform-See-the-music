import React from "react"
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa"

const BtnPlayPause = ({ togglePlaying, playing }) => {
  return (
    <div className='btn hover:text-bunker-300' aria-label='play / pause' onClick={togglePlaying}>
      {playing ? <FaPauseCircle /> : <FaPlayCircle />}
    </div>
  )
}

export default BtnPlayPause
