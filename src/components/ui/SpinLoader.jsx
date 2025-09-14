import React from "react"
import { SIZE } from "../../lib/CONSTANTS"

const SpinLoader = ({ size = SIZE.MEDIUM,className }) => {
  return (
    <div
      className={`text-bunker-900 bg-bunker-300 flex-center flex aspect-square ${size === SIZE.SMALL && "w-md"} ${size === SIZE.MEDIUM && "w-xl"} ${size === SIZE.LARGE && "w-2xl"} ${size === SIZE.EXTRA_LARGE && "w-3xl"} animate-spin overflow-hidden rounded-full text-xl font-bold ${className}`}
    >
      .
    </div>
  )
}

export default SpinLoader
