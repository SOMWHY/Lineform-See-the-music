import { BACKGROUND, VISUALIZER } from "../../../lib/CONSTANTS"
import { useCanvasStore } from "../../../store/canvasStore"

const VisualizerAndBackgroundSelect = () => {
  const background = useCanvasStore(state => state.background)
  const visualizer = useCanvasStore(state => state.visualizer)
  const setBackground = useCanvasStore(state => state.setBackground)
  const setVisualizer = useCanvasStore(state => state.setVisualizer)
  return (
    <div className='mt-xs px-md  py-xs flex-center flex '>
      <div className='gap-2xs flex flex-col w-[100%]  justify-center items-center font-comingSoon tracking-tight text-lg'>
        <div className='flex  w-full justify-between pr-lg'>
          <label htmlFor='background'>Background:</label>
          <select className='select' name='background' id='background' value={background} onChange={e => setBackground(e.target.value)}>
            <option className='option' value='none'>
              none
            </option>
            <option className='option' value={BACKGROUND.SKY}>
              sky
            </option>
          </select>
        </div>
        <div className='flex w-full justify-between pr-lg'>
          <label htmlFor='visualizer'>Visualizer:</label>
          <select className='select' name='visualizer' id='visualizer' value={visualizer} onChange={e => setVisualizer(e.target.value)}>
            <option className='option' value='none'>
              none
            </option>
            <option className='option' value={VISUALIZER.LINE_FORM}>
              lineform
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default VisualizerAndBackgroundSelect
