// main.js
const app =  require('electron').app; // app 就是 Main Process 自身
const BrowserWindow = require('electron').BrowserWindow; // 瀏覽器視窗

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,  // 寬度
    height: 500, // 高度
    frame: false,      // 標題列不顯示
    transparent: true, // 背景透明
    autoHideMenuBar: true //  工具列不顯示
  });

  mainWindow.loadFile('index.html')
}

app.on('ready', () => createWindow()) // Main Process 準備 OK 後 , 建立一個 瀏覽器視窗 顯示給使用者
app.on('window-all-closed', () =>  app.quit()) // 所有 BrowserWindow 關閉後 , 結束 Main Process
