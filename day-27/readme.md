# [ Day 27 ] - 分享螢幕(四) - 分享螢幕 Electron 版

今天接續昨天的 WebRTC , 我們將做成 Electron 的版本 ,   
而且將攝像頭的使用改成用擷取螢幕訊息作替代

成果圖

![](https://i.imgur.com/TCLXDOe.gif)

## 實作開始

> 修改 window.navigator.mediaDevices.getUserMedia 的 stream 來源

將昨天 html 的部分中的 async createMedia 方法 , 改成用指定 sourceId 的形式取得 localstream

```diff
async createMedia() {

+  const desktopCapture = async (sourceId) => {
+
+    constraints = {
+            audio: false,
+            video: {
+                mandatory: {
+                    chromeMediaSource: 'desktop',
+                    chromeMediaSourceId: sourceId,
+                    minWidth: 1280,
+                    maxWidth: 1280,
+                    minHeight: 720,
+                    maxHeight: 720
+                }
+            }
+        };
+
+        return await navigator.mediaDevices.getUserMedia(constraints);
+    };
    
    // 儲存本地流到全域
+    this.localstream = await desktopCapture(this.sourceId);
-    this.localstream = await window.navigator.mediaDevices.getUserMedia({ audio: true, video: true })

    this.$refs.myVideo.srcObject = this.localstream;
},
```

在 main.js 中追加兩個 ipcMain channel - `pick-sourceId` . `mounted-webRTC-html`

- pick-sourceId = 收集選到的那個指定的畫面它的 sourceId , 並更換 mainWindow 使用的 HTML
- mounted-webRTC-html = 當 webrtc-electron.html 載入完成後 , 將 sourceId 轉到 vue 的 this.sourceId 中

```javascript
// add below in main.js

ipcMain.on('pick-sourceId', (event, sourceId) => {

    electronSourceId = sourceId;
    win.loadFile('webrtc-electron.html');
});

ipcMain.on('mounted-webRTC-html', (event) => {

    event.reply('setting-sourceId', electronSourceId);
});
```

要用到 `mounted-webRTC-html` 這個 channel 那 html 的部分要追加 mounted

```javascript
// 追加 mounted 到 webrtc.html 中的 Vue 物件 
mounted() {

    ipcRenderer.on('setting-sourceId', (event, sourceId) => this.sourceId = sourceId);
    ipcRenderer.send('mounted-webRTC-html');
},
```

當然我們需要準備選擇 sourceId 用到的 HTML - [select-source.html](https://github.com/andrew781026/ithome_ironman_2020/blob/master/day-27/select-source.html)

接著 createWindow 載入 select-source.html 

```javascript
 mainWindow.loadFile('select-source.html');
```

我們就有分享桌面訊息的 Electron 應用程式了 !

![](https://i.imgur.com/TCLXDOe.gif)


## 參考資料

- [初探 WebRTC — 手把手建立線上視訊 (3)](https://medium.com/@jedy05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87)
- [且戰且走HTML5(28) 建立視訊會議](https://ithelp.ithome.com.tw/articles/10109585)
- [Getting Started with WebRTC](https://www.html5rocks.com/en/tutorials/webrtc/basics/)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
