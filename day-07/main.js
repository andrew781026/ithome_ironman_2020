const {app, Menu, MenuItem, BrowserWindow, ipcMain, globalShortcut, Notification} = require('electron');
const path = require('path');
require('electron-reload')(__dirname);

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 350,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
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

    // mainWindow.webContents.openDevTools()

    return mainWindow;
}

app.on('ready', () => {

    const win = createWindow();

    win.setProgressBar(0.3);  // 工具列 icon 進度條 ( 0 ~ 1 )
    win.flashFrame(true);        // 工具列 icon 閃爍

    globalShortcut.register('CommandOrControl+P', () => win.webContents.send('hide-bg'))
    globalShortcut.register('CommandOrControl+O', () => win.webContents.send('show-bg'))
})

app.on('web-contents-created', (event, win) => {

    const template = [
        {label: '關閉', role: 'close'},
        {label: '全螢幕', role: 'togglefullscreen'},
        {label: '重新載入', role: 'reload'},
        {
            label: '隱藏背景',
            accelerator: 'CommandOrControl+P',
            click: () => win.webContents.send('hide-bg')
        },
        {
            label: '顯示背景',
            accelerator: 'CommandOrControl+O',
            click: () => win.webContents.send('show-bg')
        },
    ];

    const ctxMenu = new Menu();
    template.map(item => ctxMenu.append(new MenuItem(item)));

    win.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup(win, params.x, params.y)
    })
})


app.on('window-all-closed', () => {

    app.quit();
})

app.on('will-quit', () => {

    // 取消註冊快速鍵。
    globalShortcut.unregister('CommandOrControl+P')
    globalShortcut.unregister('CommandOrControl+O')

    // 取消註冊所有快速鍵。
    globalShortcut.unregisterAll()
})

ipcMain.on('change-drag', (event, {draggable}) => {

    // 通知
    new Notification({

        title: '改變背景',
        // subtitle: '背景可見',
        body: draggable ? 'Ctrl+O 顯示背景' : 'Ctrl+P 隱藏背景',
        icon: path.join(__dirname, '/cat.png'),

        // hasReply: true,               // only work on macOs
        // replyPlaceholder: '回應訊息',  // only work on macOs

    }).show();

})
