const {app, BrowserWindow,} = require('electron');
const path = require('path');
const {ipcMain} = require('electron');

// https://www.electronjs.org/docs/api/tray
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 350,
        height: 400,
        autoHideMenuBar: true, //  工具列不顯示
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.openDevTools();

    return mainWindow;
}


app.on('ready', () => {

    createWindow();


})

app.on('window-all-closed', app.quit)

ipcMain.on('ondragstart', (event) => {
    event.sender.startDrag({
        files: [path.join(__dirname, 'head.jpg')],
        icon: path.join(__dirname, 'head.jpg'),
    })

})