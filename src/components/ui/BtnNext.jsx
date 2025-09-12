import React from 'react'
import { BiSkipNext } from 'react-icons/bi'

const BtnNext = ({nextTrack}) => {
  return (
       <div className=' btn hover:text-bunker-300' aria-label='next track' onClick={nextTrack}>
          <BiSkipNext />
        </div>
  )
}

export default BtnNext