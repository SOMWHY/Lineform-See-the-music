import ActiveIndicator from "../../../components/ui/ActiveIndicator"
import { useAudioStore } from "../../../store/audioStore"
import SongTitle from "./SongTitle"

const SongItem = ({ song, artist, index }) => {
  const setCurrentSongIndex = useAudioStore(state => state.setCurrentSongIndex)
  return (
    <div
      className='p-2xs gap-2xs text-bunker-100/60 hover:bg-bunker-900/80 hover:text-bunker-50/100 flex w-full cursor-pointer items-center justify-start rounded-sm leading-loose hover:italic hover:underline'
      onClick={() => setCurrentSongIndex(index)}
    >
      <ActiveIndicator songIndex={index} />

      <SongTitle song={song} artist={artist} />
    </div>
  )
}

export default SongItem
