import { create } from "zustand"
import { BACKGROUND, VISUALIZER } from "../lib/CONSTANTS"

export const useCanvasStore = create((set, get) => ({
   visualizer: VISUALIZER.LINE_FORM,
   background: BACKGROUND.NONE,//default set to none for better performance

 setVisualizer:(visualizer)=>{
    set({visualizer})
 },
  setBackground:(background)=>{
    set({background})
 }
}))


