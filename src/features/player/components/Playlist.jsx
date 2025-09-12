import { useEffect, useState } from "react"
import { useAudioStore } from "../../../store/audioStore"
import { PlayBar } from "./PlayBar"
import ActiveIndicator from "../../../components/ui/ActiveIndicator"
import SongTitle from "../../../components/ui/SongTitle"
import InstructionText from "../../../components/ui/InstructionText"
import BrandTitle from "../../../components/ui/BrandTitle"
import Footer from "./Footer"
import ToggleBtn from "../../../components/ui/ToggleBtn"
export const Playlist = () => {
  // TODO
  //Volume control
  //waveform
  //progress bar
  const [hideSidebar, setHideSidebar] = useState(false)

  const { songs, setCurrentSongIndex, currentSongIndex } = useAudioStore()

  function toggleSideBar() {
    setHideSidebar(curHideState => !curHideState)
  }
  return (
    <div
      className={`bg-bunker-950 text-bunker-100/90 shadow-bunker-900 absolute top-0 left-0 z-[1] flex h-full w-full ${hideSidebar ? "-translate-x-[100%]" : "translate-x-0"} max-w-5xl origin-left flex-col gap-[0.5em] p-[1.5em] shadow-md transition duration-250 ease-in hover:shadow-xl`}
    >
      <ToggleBtn toggleSideBar={toggleSideBar} hideSidebar={hideSidebar} />
      <div className='flex-center flex flex-col gap-[2em] text-center'>
        <BrandTitle />
        <InstructionText />
      </div>
      <div className='scrollbar-hidden h-[6rem] snap-start overflow-y-scroll scroll-smooth'>
        {songs.map(({ song, artist }, index) => (
          <div
            className='p-2xs gap-2xs text-bunker-100/60 hover:bg-bunker-900/80 hover:text-bunker-50/100 flex w-full cursor-pointer items-center justify-start rounded-sm leading-loose hover:italic hover:underline'
            key={artist + song}
            onClick={() => setCurrentSongIndex(index)}
          >
            <ActiveIndicator songIndex={index} />

            <SongTitle song={song} artist={artist} />
          </div>
        ))}
      </div>
      <PlayBar />

      <Footer />
    </div>
  )
}
