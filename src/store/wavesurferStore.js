import { create } from "zustand"

export const wavesurferStore = create((set, get) => ({
 zoomInLevel:50,
 setZoomInLevel:(zoomInLevel)=>{
    set({zoomInLevel})
 }
}))


