const {app, BrowserWindow,screen} = require('electron');
const path = require('path');
const {createTray} = require('./customTray');
const {registerShortcut} = require('./customShortcut');

function createWindow() {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        x: width - 350 - 30 , // 距離左方 x 單位
        y: 350 + 30,  // 距離下方 y 單位
        width: 350,
        height: 350,
        frame: false,      // 標題列不顯示
        transparent: true, // 背景透明
        autoHideMenuBar: true, //  工具列不顯示
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');

    return mainWindow;
}

app.on('ready', () => {

    const win = createWindow();

    const iconPath = path.join(__dirname, './imgs/tray_cat.png');
    createTray(win, iconPath);
    registerShortcut(win);
})

app.on('window-all-closed', app.quit);