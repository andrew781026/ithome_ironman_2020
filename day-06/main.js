const {app, Menu, BrowserWindow} = require('electron');
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

    const template = [
        {label: '關閉', role: 'close'},
        {label: '全螢幕', role: 'togglefullscreen'},
        {label: '刷新', role: 'reload'},
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // mainWindow.loadURL(`https://www.google.com`);
    mainWindow.loadFile('index.html');
}

app.on('ready', () => {

    createWindow();
})

app.on('window-all-closed', () => {

    app.quit();
})