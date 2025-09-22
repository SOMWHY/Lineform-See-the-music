# Contribute to lineform-see-the-music

This website is completely community-driven by volunteers and is not affiliated with Porter Robinson or his management. The website is open-source and contributions are welcome.

# What can you contribute?

**As a developer**, you can contribute code, you can update songs and more.  
**As a modeler**, you can contribute the models needed for the 3D scene to *1928135011@qq.com*.  
**As a designer**, you can contribute design proposals to *1928135011@qq.com*.    
**As a user**, you can report bugs or request features via issues.

# For dev

## Before start developing

The project is a Vite&React Start application using

- React-Three-Fiber for 3d objects
- Zustand for state management
- Tailwindcss 4 for styling
- React-icons for icons
- Wavesurfer for 2d waveform.
  It is currently deployed to Netlify.

```bash
git clone https://github.com/SOMWHY/Lineform-See-the-music.git
npm install
npm run dev
```

## Folder structure

📦public  
┣ 📂audio  
┣ 📂textures  
┃ ┣ 📂grass  
┃ ┗ 📂sky  
┣ 📜audioData.json

📦src  
┣ 📂assets  
┃ ┗ 📂fonts  
┣ 📂components  
┃ ┣ 📂ui  
┣ 📂features  
┃ ┣ 📂globalControl  
┃ ┃ ┗ 📂components  
┃ ┣ 📂infoDisplay  
┃ ┃ ┗ 📂components  
┃ ┣ 📂player  
┃ ┃ ┗ 📂components  
┃ ┗ 📂visualizer  
┃ ┃ ┗ 📂components  
┣ 📂hooks  
┣ 📂lib  
┣ 📂store  
┣ 📜App.jsx  
┣ 📜index.jsx  
┗ 📜styles.css

## Update songs

📦public  
┣ 📂audio  
┣ 📜audioData.json

Add your songs(.mp3) here in the audio folder, then update audioData.json. You can write "unknown" if you are not sure about the genre.

## Fix bug

When you commit or submit a pull request, please briefly describe what bug you fixed, and include the issue number if applicable. If no relevant issue exists yet, please create one first.

## Implement features

When you commit or submit a pull request, please briefly describe what feature you implemented.

1. Add a folder for new feature
   If you want to add new feature, go to 'features' folder and add
   a folder below for new feature. The name of folder should be same as your feature name. Also add a 'components' folder.
   📂featureName  
   ┗ 📂components

2. Then continue your work

### Add a new 3d background

📦lib  
┣ 📜CONSTANTS.js

```js
export const BACKGROUND = {
  NONE: "NONE",
  SKY: "SKY",
  GRASS: "GRASS",
  CITY: "CITY",
  //Add your background here
  NEW_BG: "NEW_BG",
}
```

📦features  
┣ 📂globalControl  
┃ ┗ 📂components  
┃ ┃ ┣ 📜VisualizerAndBackgroundSelect.jsx

```js
<select name='background' id='background'>
  <option className='option' value={BACKGROUND.NEW_BG}>
    your background
  </option>
</select>
```

📦features  
┗ 📂visualizer  
┃ ┗ 📂components  
┃ ┃ ┣ 📜City.jsx  
┃ ┃ ┣ 📜Grass.jsx  
┃ ┃ ┣ 📜Sky.jsx  
┃ ┃ ┣ 📜YourBackground.jsx

Then you can start to write YourBackground.jsx!

### Add a new 3d visualizer

📦lib  
┣ 📜CONSTANTS.js

```js
export const VISUALIZER = {
  NONE: "NONE",
  LINE_FORM: "LINE_FORM",
  //Add your background here
  NEW_VISUALIZER: "NEW_VISUALIZER",
}
```

📦features  
┣ 📂globalControl  
┃ ┗ 📂components  
┃ ┃ ┣ 📜VisualizerAndBackgroundSelect.jsx

```js
<select name='visualizer' id='visualizer'>
  <option className='option' value={VISUALIZER.NEW_VISUALIZER}>
    your visualizer
  </option>
</select>
```

📦features  
┗ 📂visualizer  
┃ ┗ 📂components  
┃ ┃ ┣ 📜City.jsx  
┃ ┃ ┣ 📜Grass.jsx  
┃ ┃ ┣ 📜Sky.jsx  
┃ ┃ ┣ 📜YourVisualizer.jsx

Then you can start to write YourVisualizer.jsx!

You can get audio data for visualization by using the next few lines.

```js
const { update } = useAudioStore(state => state.analyser)

const { frequencyData, timeDomainData, rms, peak, sampleRate, frequencyBinCount } = update()
```

📦src  
📦components  
 ┣ 📜AudioEl.jsx  

If you want more types of audio data to be returned，you could 
edit updateAudioData function inside AudioEl.jsx.

## Update docs

If the documentation is outdated and no longer matches the code, you can update it.

# License

All contents of this repository are licensed under the MIT License.

# Docs you might need

R3F: https://r3f.docs.pmnd.rs/getting-started/your-first-scene  
Drei: https://drei.docs.pmnd.rs/getting-started/introduction  
Tailwindcss: https://tailwindcss.com/docs/installation/using-vite  
