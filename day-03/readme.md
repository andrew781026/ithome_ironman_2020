# [ Day 3 ] - 桌面小圖示(二) - Electron 架構說明

昨天我們快速製作了一個 "玩耍的小貓" ,

可是細節與觀念的部分沒有提及 , 

今天我們來說明一下 , Electron 的內部架構與核心

> Electron 架構在 Chromium 及 Node.js 上，讓你可以用 HTML、CSS 和 JavaScript 打造自己的應用程式。

以上說明來自官方網站 , 可能這樣說明有點抽象 , 我們來一張圖解釋一下

[![electron 基礎架構](https://i.imgur.com/N9r4qT9.png)](https://www.udemy.com/course/electron-from-scratch/)
[ 圖片來源 : Udemy 課程 - Electron From Scratch: Build Desktop Apps With JavaScript ]

可以看到有 `Main Process` 又有 `Window` , 這些東西是什麼  ![](https://i.imgur.com/uXglvKh.png)

```
Main Process 也就是 Electron 在背景執行的地方 ,  
它可以利用 node.js 的內建函式與系統進行溝通 ,   
也可以用 new BrowserWindow 建立一個新的 Chromium 瀏覽器視窗 ,  
然後用 IPC 與 BrowserWindow 上的 preload.js 做溝通訊息
```

翻譯成白話文 , 就是下面這張圖

![](https://i.imgur.com/HwueFRu.png)

下面我們不用 `electron-quick-start` , 從頭建立 electron 程式吧 !

```shell script
npm init -- 建立 package.json 
npm i -D electron -- 安裝 electron 套件
```

之後修改一下 , package.json 中的 start script . 新增 main 區段
```diff
{
  "name": "electron-practice-day03",
  "version": "0.0.3",
  "description": "day03 apps",
+   "main": "./main.js",
  "scripts": {
+   "start": "electron ."
  },
  "author": "andrew",
  "license": "MIT",
  "devDependencies": {
    "electron": "10.1.3"
  }
}
```

新建一個主程序 main.js

```javascript
// main.js
const app =  require('electron').app; // app 就是 Main Process 自身
const BrowserWindow = require('electron').BrowserWindow; // 瀏覽器視窗

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1000,  // 寬度
        height: 650, // 高度
    });

    mainWindow.loadURL('https://www.google.com'); // 載入頁面 www.google.com
}

app.on('ready', () => createWindow()) // Main Process 準備 OK 後 , 建立一個 瀏覽器視窗 顯示給使用者
app.on('window-all-closed', () =>  app.quit()) // 所有 BrowserWindow 關閉後 , 結束 Main Process
```

之後使用 `npm start` 我們可以看到

![](https://i.imgur.com/PEg2ulu.png)

之後 , 建立一個 index.html 

```html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
    <meta charset="UTF-8">
    <title>無限的神奇狗</title>
</head>
<body>
<img src="https://i.imgur.com/iBfH0vx.gif" alt="infinite-dog">
</body>
</html>
```

將 main.js 中 mainWindow.loadURL 改成 mainWindow.loadFile 

```javascript
// main.js
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1000,  // 寬度
        height: 650, // 高度
    });

-    mainWindow.loadURL('https://www.google.com'); // 載入頁面 www.google.com
+    mainWindow.loadFile('index.html'); // 載入同層的 index.html 檔案
}
```

然後 `npm start` 看到 "無限的神奇狗"

![](https://i.imgur.com/XUC0vBW.gif)

接下來 , 我們可以遵循昨天的 3 . 4 . 5 步驟將狗狗轉換成桌面應用程式 

![](https://i.imgur.com/Oaw49ch.gif)

不過這張圖放在桌面上 , 比起療育 , 還蠻驚悚的 ![cold-man](https://ithelp.ithome.com.tw/images/emoticon/emoticon21.gif)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```