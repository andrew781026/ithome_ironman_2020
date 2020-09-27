const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let win, electronSourceId;

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1050,
        height: 600,
        autoHideMenuBar: true, //  工具列不顯示
        icon: path.join(__dirname, 'cat.png'), // app icon
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('select-source.html');
    return mainWindow;
}

app.on('ready', () => {

    win = createWindow();
});

ipcMain.on('pick-sourceId', (event, sourceId) => {

    electronSourceId = sourceId;
    console.log('sourceId=',sourceId);
    win.loadFile('webrtc-electron.html');
});

ipcMain.on('mounted-webRTC-html', (event) => {

    console.log('electronSourceId=',electronSourceId);
    event.reply('setting-sourceId', electronSourceId);
});

app.on('window-all-closed', app.quit)
