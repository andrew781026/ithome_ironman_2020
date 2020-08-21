# 第二天 - 桌面小圖示 - 用 electron-quick-start 當初始版型

今天先動手做一個 Electron 小程式 , 感受一下 Electron 

首先 , 我們先做隻小貓咪放到桌面上吧

預計效果
![](https://i.imgur.com/MfEjj5I.gif)

小貓圖 - 可愛吧 😁 

<div style="display: flex ; flex-direction: column;align-items: center;width: 300px">
    <a href="https://i.imgur.com/6O1RzBu.gif" download="playing-cat">
      <img src="https://i.imgur.com/6O1RzBu.gif" alt="玩耍的小貓">
    </a>
    <a href="https://www.ilikesticker.com/LineStickerAnimation/W550562-Ginger-Cat-Animation/zh-Hant" >
      圖片來源 - ilikesticker.com
    </a>
</div> 

第一步 , 下載專案模板 

```shell script
# 複製 Quick Start 儲存庫
$ git clone https://github.com/electron/electron-quick-start

# 進到儲存庫裡
$ cd electron-quick-start

# 安裝相依的套件並執行
$ npm install && npm start
```

第二步 , 將可愛的貓咪載入

```html=
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'unsafe-inline'">
</head>
<body>
    <img src="playing-cat-loop.gif">
</body>
</html>
``` 

第三步 , 隱藏工具列與標題列 , 並將背景透明化

new BrowserWindow 時 , 建立參數
- `frame`           : 標題列不顯示
- `transparent`     : 背景透明
- `autoHideMenuBar` : 工具列不顯示
  
```javascript=
const mainWindow = new BrowserWindow({
    width: 350,
    height: 350,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
+   frame: false,          // 標題列不顯示
+   transparent: true,     // 背景透明
+   autoHideMenuBar: true  // 工具列不顯示
});
``` 

第四步 , 讓圖片可以用滑鼠抓著移動

在 body 標籤上追加 `style="-webkit-app-region: drag"`

```html=
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'unsafe-inline'">
</head>
<body style="-webkit-app-region: drag">
    <img src="playing-cat-loop.gif">
</body>
</html>
``` 

第五步 , 讓圖片無法選取

在 body 標籤上追加 `style="user-select: none"`

```html=
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'unsafe-inline'">
</head>
<body style="-webkit-app-region: drag;user-select: none">
    <img src="playing-cat-loop.gif">
</body>
</html>
``` 

## 參考資料

- [Electron 官網](https://www.electronjs.org/)
