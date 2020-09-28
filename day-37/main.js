const {app, BrowserWindow, ipcMain, screen} = require('electron');
const path = require('path');
require('electron-reload')(__dirname);

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        // frame: false,      // 標題列不顯示
        // transparent: true, // 背景透明
        autoHideMenuBar: true //  工具列不顯示
    });


    mainWindow.loadFile('index.html');

    return mainWindow;
}

app.on('ready', () => {

    // const win = createWindow();
    // const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    // win = new BrowserWindow({ width, height });
    // win.loadURL('https://github.com');


    // 指定 BrowserWindow 開啟的位置
    let displays = screen.getAllDisplays();
    let externalDisplay = displays.find((display) => (display.bounds.x !== 0 || display.bounds.y !== 0));

    if (externalDisplay) {

        console.log(externalDisplay.bounds);

        win = new BrowserWindow({
            x: externalDisplay.bounds.x + 50, // 開啟時的最左側 x 座標
            y: externalDisplay.bounds.y + 50, // 開啟時的最上方 y 座標
            width: 800,
            height: 600,
        });
        win.loadURL('https://github.com');

        setInterval(() => {

            const point = screen.getCursorScreenPoint();
            console.log(point);
        },500);
    }
})

app.on('window-all-closed', () => app.quit())
