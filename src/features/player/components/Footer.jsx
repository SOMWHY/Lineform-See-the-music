import React from "react"
import Divider from "../../../components/ui/Divider"
import { FaGithub } from "react-icons/fa"
import { AiFillBilibili } from 'react-icons/ai';
import { SiNeteasecloudmusic } from 'react-icons/si';
import ListItem from "../../../components/ui/ListItem"
const Footer = () => {
  return (
    <div className='absolute bottom-0 left-0 w-full overflow-hidden'>
      <Divider />
      <ul>
        <ListItem text='Github' icon={ <FaGithub />}/>
        <ListItem text='Cloudmusic' icon={ <SiNeteasecloudmusic />}/>
        <ListItem text='Bilibili' icon={ <AiFillBilibili />}/>
       
      </ul>
    </div>
  )
}

export default Footer
