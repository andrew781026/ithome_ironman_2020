const {app, BrowserWindow} = require('electron');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 320,
        height: 350,
        frame: false,      // 標題列不顯示
        transparent: true, // 背景透明
        autoHideMenuBar: true //  工具列不顯示
    });

    // mainWindow.loadURL(`https://www.google.com`);
    mainWindow.loadFile('index.html');
}

app.on('ready', () => {

    createWindow();
})

app.on('window-all-closed', () => {

    app.quit();
})