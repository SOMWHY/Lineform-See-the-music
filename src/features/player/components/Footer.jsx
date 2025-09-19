import { AiFillBilibili } from "react-icons/ai"
import { FaGithub, FaYoutube } from "react-icons/fa"
import { RiMoneyCnyCircleFill } from "react-icons/ri"
import Divider from "../../../components/ui/Divider"
import ListItem from "../../../components/ui/ListItem"
const Footer = () => {
  return (
    <div className='absolute bottom-0 left-0 w-full overflow-hidden'>
      <Divider />
      <ul>
        <ListItem link={"https://space.bilibili.com/394014714"} text='Bilibili' icon={<AiFillBilibili />} />
        <ListItem link={"https://github.com/SOMWHY/Lineform-See-the-music"} text='Github' icon={<FaGithub />} />
        <ListItem link={"https://www.youtube.com/@%E7%B4%A2%E5%A7%86%E6%AD%AA"} text='Youtube' icon={<FaYoutube />} />
        <ListItem link={"https://somwhy.loopspace.club/channel/2336"} text='Buy me a coffee' icon={<RiMoneyCnyCircleFill />} />
      </ul>
    </div>
  )
}

export default Footer
