import { FaCaretRight } from "react-icons/fa";
import { useAudioStore } from "../../store/audioStore";

const ActiveIndicator = ({songIndex}) => {
   const currentSongIndex  = useAudioStore(state=>state.currentSongIndex);
   const isSelected=currentSongIndex === songIndex
  return (
    <div className='flex-center flex aspect-square w-sm animate-pulse'>{isSelected && <FaCaretRight />}</div>
  );
};

export default ActiveIndicator;
