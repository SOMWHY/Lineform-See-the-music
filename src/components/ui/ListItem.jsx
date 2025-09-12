import React from "react"

const ListItem = ({ text, icon }) => {
  return (
    <li className='hover:translate-x-md  transition'>
      <a
        href='https://github.com/SOMWHY/3d-audio-visualizer-starter'
        className='gap-sm bg-froly-500/15 pl-sm py-xs flex items-center text-2xl hover:underline'
      >
        {icon}
        <i className='text-sm font-light'>{text}</i>
      </a>
    </li>
  )
}

export default ListItem
