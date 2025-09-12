import { useFrame } from "@react-three/fiber"
import { useAudioStore } from "../../../store/audioStore"
import { useEffect, useState } from "react";
import initWebAudioApi from "../../../lib/initWebAudioApi";

const LineForm = () => {
 const audio = useAudioStore(store => store.audio);
const [audioEl,setAudioEl]=useState(null)
 useEffect(()=>{
    setAudioEl(()=>document.querySelector("audio"))
    
 },[])
  useFrame(() => {
    if (audio) {
      const dataArray=audio.analyzer.fftSize.context;
    //   console.log(dataArray)
    console.log(audioEl.currentTime)
    }
  });
  return <>LineForm</>
}

export default LineForm
