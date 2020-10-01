const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        icon: path.join(__dirname, 'cat.png'),
        width: 320,
        height: 350,
        frame: false,      // 標題列不顯示
        transparent: true, // 背景透明
        autoHideMenuBar: true //  工具列不顯示
    });

    mainWindow.loadFile('index.html');
}

app.on('ready', () => {

    createWindow();
})

app.on('window-all-closed', () => {

    app.quit();
})