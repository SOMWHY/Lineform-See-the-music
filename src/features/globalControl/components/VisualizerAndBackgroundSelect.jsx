import { BACKGROUND, VISUALIZER } from "../../../lib/CONSTANTS"
import { useCanvasStore } from "../../../store/canvasStore"

const VisualizerAndBackgroundSelect = () => {
  const background = useCanvasStore(state => state.background)
  const visualizer = useCanvasStore(state => state.visualizer)
  const setBackground = useCanvasStore(state => state.setBackground)
  const setVisualizer = useCanvasStore(state => state.setVisualizer)
  return (
    <div className='mt-xs px-md h-sm py-xs flex-center flex '>
      <div className='gap-md flex w-[100%] items-center justify-start font-comingSoon text-lg'>
        <select
          className='select'
          name='background'
          id='background'
          value={background}
          onChange={e => setBackground(e.target.value)}
        >
          <option className='option' value='none'>
            none
          </option>
          <option className='option' value={BACKGROUND.SKY}>
            sky
          </option>
        </select>
        <select
          className='select'
          name='visualizer'
          id='visualizer'
          value={visualizer}
          onChange={e => setVisualizer(e.target.value)}
        >
          <option className='option' value='none'>
            none
          </option>
          <option className='option' value={VISUALIZER.LINE_FORM}>
            lineform
          </option>
        </select>
      </div>
    </div>
  )
}

export default VisualizerAndBackgroundSelect
