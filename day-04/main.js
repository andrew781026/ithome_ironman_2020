const {app, Menu, BrowserWindow, ipcMain, Notification} = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 350,
        height: 350,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: false,      // 標題列不顯示
        // transparent: true, // 背景透明
        autoHideMenuBar: true //  工具列不顯示
    });

    const template = [
        {label: '關閉', role: 'close'},
        {label: '全螢幕', role: 'togglefullscreen'},
        {label: '刷新', role: 'reload'},
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // mainWindow.loadURL(`https://www.google.com`);
    mainWindow.loadFile('index.html');

    mainWindow.webContents.openDevTools()
}

app.on('ready', () => {

    createWindow();
})

app.on('window-all-closed', () => {

    app.quit();
})

ipcMain.on('notify', () => {

    // 通知
    new Notification({

        title: '標題',
        subtitle: '副標題',
        body: '內容',
        icon: path.join(__dirname, '/cat.png'),

    }).show();

});