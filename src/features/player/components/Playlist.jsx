import { useState } from "react"
import { useAudioStore } from "../../../store/audioStore"
import { PlayBar } from "./PlayBar"
import InstructionText from "../../../components/ui/InstructionText"
import BrandTitle from "../../../components/ui/BrandTitle"
import Footer from "./Footer"
import ToggleBtn from "../../../components/ui/ToggleBtn"
import InfoList from "../../../components/InfoList"
import SongItem from "./SongItem"
import { DIRECTION, POSITION } from "../../../lib/CONSTANTS"
export const Playlist = () => {
  //TODO
  //waveform
  const [hideSidebar, setHideSidebar] = useState(false)
  const songs = useAudioStore(state => state.songs)

  function toggleSideBar() {
    setHideSidebar(curHideState => !curHideState)
  }
  return (
    <div
      className={` general-container absolute top-0 left-0  flex h-full w-full ${hideSidebar ? "-translate-x-[100%]" : "translate-x-0"} max-w-5xl origin-left flex-col gap-[0.5em] p-[1.5em] `}
    >
      <ToggleBtn toggleSideBar={toggleSideBar} hideSidebar={hideSidebar} direction={DIRECTION.LEFT_RIGHT} position={POSITION.RIGHT}/>
      <div className='flex-center flex flex-col gap-[2em] text-center'>
        <BrandTitle />
        <InstructionText />
      </div>
      <div className='scrollbar-hidden h-[6rem] snap-start overflow-y-scroll scroll-smooth'>
        {songs.map(({ song, artist }, index) => (
          <SongItem key={artist + song} index={index} song={song} artist={artist} />
        ))}
      </div>
      <PlayBar />
      
      <Footer />
    </div>
  )
}
