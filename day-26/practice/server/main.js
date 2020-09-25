const {app, BrowserWindow,} = require('electron');
const path = require('path');

// https://www.electronjs.org/docs/api/tray
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true, //  工具列不顯示
        icon: path.join(__dirname, 'cat.png'), // app icon
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');

    return mainWindow;
}


app.on('ready', () => {

    createWindow();


})

app.on('window-all-closed', app.quit)
