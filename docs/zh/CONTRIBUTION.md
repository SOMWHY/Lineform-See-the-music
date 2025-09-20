[English](/docs/en/CONTRIBUTION.en.md)
# 欢迎参与 Lineform-See-the-Music 项目贡献 🎵

本网站完全由志愿者社区驱动，与 Porter Robinson 或其官方团队无任何关联。项目完全开源，我们非常欢迎和感谢每一位贡献者的付出！

# 你可以贡献什么？

**作为开发者**：你可以贡献代码、更新歌曲等等  
**作为设计师**：你可以将设计提案发送至 *1928135011@qq.com*  
**作为用户**：你可以通过提交 Issue 来报告 Bug 或提出功能需求

# 开发者指南

## 开发前准备

本项目是基于 Vite & React 创建的，使用了以下技术栈：

- React-Three-Fiber：用于构建 3D 对象
- Zustand：进行状态管理
- Tailwindcss 4：样式设计
- React-icons：图标库
- Wavesurfer：生成 2D 波形图  
目前项目部署在 Netlify 上。

```bash
git clone https://github.com/SOMWHY/Lineform-See-the-music.git
npm install
npm run dev
```

# 文件夹结构
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

# 如何更新歌曲
📦public  
┣ 📂audio  
┣ 📜audioData.json  

请将你的歌曲文件（.mp3格式）添加到 audio 文件夹中，并同步更新 audioData.json 文件。如果不确定歌曲风格，可以暂时填写 "unknown"。

# 修复 Bug
提交 Commit 或 Pull Request 时，请简要描述修复的 Bug，如果有关联的 Issue 请附上编号。如果还没有相关 Issue，请先创建一个。

# 实现新功能
提交 Commit 或 Pull Request 时，请简要描述你实现的新功能。

## 为新功能创建文件夹
1. 如果你想添加新功能，请在 'features' 文件夹下新建一个与功能同名的文件夹，并在其中创建 'components' 子文件夹。
📂featureName  
┗ 📂components

2. 继续你的开发工作

### 添加新的 3D 背景
📦lib  
┣ 📜CONSTANTS.js

``` js
export const BACKGROUND = {
  NONE: "NONE",
  SKY: "SKY",
  GRASS: "GRASS",
  CITY: "CITY",
  //在此处添加你的新背景
  NEW_BG: "NEW_BG",
}
```
📦features  
┣ 📂globalControl  
┃ ┗ 📂components   
┃ ┃ ┣ 📜VisualizerAndBackgroundSelect.jsx

``` js
<select name='background' id='background'>
  <option className='option' value={BACKGROUND.NEW_BG}>
    你的背景名称
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

接下来就可以开始编写 YourBackground.jsx 啦！

### 添加新的 3D 可视化效果
📦lib  
┣ 📜CONSTANTS.js

```js
export const VISUALIZER = {
  NONE: "NONE",
  LINE_FORM: "LINE_FORM",
  //在此处添加你的新可视化效果
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
    你的可视化效果名称
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

接下来就可以开始编写 YourVisualizer.jsx 啦！

# 更新文档
如果你发现文档内容已过时，与最新代码不匹配，欢迎及时更新它！

# 许可证
本仓库所有内容均采用 MIT 许可证授权。

# 可能需要用到的文档
R3F: https://r3f.docs.pmnd.rs/getting-started/your-first-scene
Drei: https://drei.docs.pmnd.rs/getting-started/introduction
Tailwindcss: https://tailwindcss.com/docs/installation/using-vite