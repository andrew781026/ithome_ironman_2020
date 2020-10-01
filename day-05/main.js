const {app, BrowserWindow, Tray, Menu, globalShortcut} = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 420,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: false,      // 標題列不顯示
        transparent: true, // 背景透明
        autoHideMenuBar: true, //  工具列不顯示
        show: false,      // 不顯示 BrowserWindow
    });

    mainWindow.loadFile('index.html');

    return mainWindow;
}

function createTray(win) {

    const switchCat = (catNo) => () => {
        win.show();
        win.webContents.send('switch-cat', catNo);
    }

    const iconPath = path.join(__dirname, './imgs/tray_cat.png');
    const tray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        {label: '貓咪 4', click: switchCat(4)},
        {label: '貓咪 5', click: switchCat(5)},
        {label: '貓咪 6', click: switchCat(6)},
        {label: '縮小', click: () => win.hide()},
        {label: '結束', click: () => app.quit()}
    ]);
    tray.setToolTip('這是縮小的小貓');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => win.show())

    return tray;
}

app.on('ready', () => {

    const win = createWindow();
    createTray(win);

    [1, 2, 3].map(number => {

        globalShortcut.register(`CommandOrControl+${number}`, () => {
            win.webContents.send('switch-cat', number);
            win.show();  // Shows and gives focus to the window.
        })
    })
})

app.on('window-all-closed', () => app.quit())
