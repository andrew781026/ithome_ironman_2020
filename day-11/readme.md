# [ Day 11 ] -  動物聊天室(四) - 貓狗聊天畫面 

在 [ Day 09 ] 時了解要用到 IPC 需要在 preload.js 中取得 ipcRenderer 才能跟 Main Process 的 ipcMain 傳遞訊息
而在 vue 框架上要如何設定 preload.js 呢 ? 

首先 , 我們按照 [ Day 8 ] 的做法建立一個含有 electron 功能的 vue 專案 ,

按照 [ Day 09 ] 的方式設定 , 在 background.js 中的 new BrowserWindow 區塊追加參數 preload

```diff
win = new BrowserWindow({
        ...
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
+            preload: path.join(__dirname, 'preload.js'),
        }
    })
```

我們將會在 devtool 中看到 preload.js not found 的錯誤訊息   
![](https://i.imgur.com/fDMpdgx.png)

這時可能需要去 [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#preload-files) 查查如何設定 preload ?  

![](https://i.imgur.com/w3djeoS.png)

原來 , 我們需要在跟目錄多設定 `vue.config.js`  這樣 preload.js 才會被 build 到 dist_electron 這個資料夾中

```javascript
module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      // Or, for multiple preload files:
      // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
    }
  }
}
```

我們可以在 preload.js 中設定 `window.ipcRenderer = ipcRenderer`  

```javascript
// in preload.js
const {ipcRenderer} = require('electron');
window.ipcRenderer = ipcRenderer;
```

// 5 個按鈕開啟不同的貓咪 ? + 隱藏貓咪的按鈕 
// 用 input 儲存訊息到檔案中 

## 參考資料

- [DongGuaLemon - f2e7week](https://github.com/DongGuaLemon/f2e7week)
- [vue-cli-plugin-electron-builder 文件](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#preload-files)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```