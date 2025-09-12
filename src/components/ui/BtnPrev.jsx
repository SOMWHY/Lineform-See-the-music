import { BiSkipPrevious } from "react-icons/bi";

const BtnPrev = ({ prevTrack }) => {
  return (
    <div className='btn hover:text-bunker-300' aria-label='previous track' onClick={prevTrack}>
      <BiSkipPrevious />
    </div>
  );
};

export default BtnPrev;
