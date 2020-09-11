const {app, ipcMain, BrowserWindow} = require('electron');

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
app.on('window-all-closed', () => app.quit()) // 所有 BrowserWindow 關閉後 , 結束 Main Process

ipcMain.handle('async-handle', async (event, arg) => {
    console.log(arg) // prints "帶小貓回家"
    return '小貓肚子餓，喵喵叫'
})

ipcMain.on('sync-handle', (event, arg) => {
    console.log(arg) // prints "帶小貓回家"
    // event 回傳前你一直關注著小貓
    event.returnValue = '小貓肚子餓'
})

ipcMain.on('other-channel-handle', (event, arg) => {
    console.log(arg) // prints "帶小貓回家"
    event.reply('need-clean-reply', '貓咪肚子餓')
})