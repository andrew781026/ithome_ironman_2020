const {app, Menu, MenuItem, BrowserWindow, globalShortcut, ipcMain} = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 350,
        height: 380,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        resizable: false, // 視窗大小不能調整
        frame: false,      // 標題列不顯示
        transparent: true, // 背景透明
        autoHideMenuBar: true, //  工具列不顯示
        // Hide the titlebar from MacOS applications while keeping the stop lights
        // titleBarStyle: 'hidden',
    });

    mainWindow.loadFile('index.html');

    mainWindow.webContents.openDevTools();

    return mainWindow;
}

app.on('ready', () => {

    const win = createWindow();

    /*
    globalShortcut.register('CommandOrControl+Q', () => {
        console.log('CommandOrControl+Q is pressed');
        // menu.popup(win);
        // Shows and gives focus to the window.
        win.show();
    })
     */
})

app.on('window-all-closed', () => {

    app.quit();
})

const menu = new Menu()
menu.append(new MenuItem({label: 'Hello'}))
menu.append(new MenuItem({type: 'separator'}))

app.on('browser-window-created', (event, win) => {

    const template = [
        {label: '關閉', role: 'close'},
        {label: '全螢幕', role: 'togglefullscreen'},
        {label: '重新載入', role: 'reload'},
        {
            label: '隱藏',
            click: () => win.webContents.send('hide-bg')
        }
    ];

    const ctxMenu = new Menu();
    template.map(item => ctxMenu.append(new MenuItem(item)));

    win.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup(win, params.x, params.y)
    })

    /*
    menu.append(new MenuItem({
        label: '拖曳',
        type: 'checkbox',
        checked: true,
        click: () => win.webContents.send('toggle-drag')
    }))

    win.webContents.on('context-menu', (e, params) => {
        menu.popup(win, params.x, params.y)
    })
     */

})

ipcMain.on('change-drag', (event, {draggable, region}) => {
    console.log('draggable=', draggable)
    console.log('region=', region)
})

ipcMain.on('show-context-menu', (event) => {
    console.log('show')
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.popup(win)
})

ipcMain.on('close-context-menu', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.closePopup(win)
})
