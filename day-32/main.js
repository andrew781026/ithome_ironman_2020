const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
const path = require('path');

// createSocketServer
require('./socket-server').createSocketServer(3000);
let win, electronSourceId;

function createWindow(htmlPath) {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1050,
        height: 650,
        autoHideMenuBar: true, //  工具列不顯示
        icon: path.join(__dirname, 'computer-screen.png'), // app icon
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile(htmlPath);
    return mainWindow;
}

app.on('ready', () => {

    const initHtml = 'appPicker.html';

    win = createWindow(initHtml);

    globalShortcut.register(`CommandOrControl+w`, () => win.loadFile(initHtml));
});

ipcMain.on('select-html', (event, html) => {

    win.loadFile(html);
});

ipcMain.on('pick-sourceId', (event, sourceId) => {

    electronSourceId = sourceId;
    console.log('sourceId=', sourceId);
    win.loadFile('webrtc-electron.html');
});

ipcMain.on('mounted-webRTC-html', (event) => {

    console.log('electronSourceId=', electronSourceId);
    event.reply('setting-sourceId', electronSourceId);
});

app.on('window-all-closed', app.quit)
