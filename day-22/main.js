const {app, BrowserWindow, Menu, Tray} = require('electron');

// https://www.electronjs.org/docs/api/tray
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 320,
        height: 350,
        frame: false,      // 標題列不顯示
        transparent: true, // 背景透明
        autoHideMenuBar: true //  工具列不顯示
    });

    mainWindow.loadFile('index.html');
}


let tray = null;

app.on('ready', () => {

    // createWindow();

    tray = new Tray('./cat.png')
    const contextMenu = Menu.buildFromTemplate([
        {label: '可愛小貓', click: () => {
                createWindow()
                tray.destroy();
            }},
        {label: 'Item2', type: 'radio'},
        {label: 'Item3', type: 'radio', checked: true},
        {label: 'Item4', type: 'radio'}
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
})

app.on('window-all-closed', () => {

    app.quit();
})