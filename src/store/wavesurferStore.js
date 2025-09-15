import { create } from "zustand"

export const useWavesurferStore = create((set, get) => ({
 zoomInLevel:50,
 setZoomInLevel:(zoomInLevel)=>{
    set({zoomInLevel})
 }
}))


