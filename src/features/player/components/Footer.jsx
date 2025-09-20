import { AiFillBilibili } from "react-icons/ai"
import { FaGithub, FaYoutube } from "react-icons/fa"
import { RiMoneyCnyCircleFill } from "react-icons/ri"
import { FaLink } from 'react-icons/fa';
import Divider from "../../../components/ui/Divider"
import ListItem from "../../../components/ui/ListItem"
const Footer = () => {
  return (
    <div className='absolute bottom-0 left-0 w-full overflow-hidden'>
      <Divider />
      <ul>
        <ListItem link={"https://space.bilibili.com/394014714"} text='Bilibili' icon={<AiFillBilibili />} />
        <ListItem link={"https://github.com/SOMWHY/Lineform-See-the-music"} text='Contribution' icon={<FaGithub />} />
        <ListItem link={"https://porterrobinson.live/"} text='Porter live' icon={<FaLink />} />
        <ListItem link={"https://porterrobinson.sbs/"} text='Porter side by side' icon={<FaLink />} />
        <ListItem link={"https://somwhy.loopspace.club/channel/2336"} text='Buy me a coffee' icon={<RiMoneyCnyCircleFill />} />
      </ul>
    </div>
  )
}

export default Footer
