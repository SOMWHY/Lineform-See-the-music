import { FaCaretRight } from "react-icons/fa";
import { useAudioStore } from "../../store/audioStore";

const ActiveIndicator = ({songIndex}) => {
  const { currentSongIndex } = useAudioStore();
  return (
    <div className='flex-center flex aspect-square w-sm animate-pulse'>{currentSongIndex === songIndex && <FaCaretRight />}</div>
  );
};

export default ActiveIndicator;
