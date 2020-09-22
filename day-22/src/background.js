import {app, protocol, ipcMain, Menu, MenuItem, BrowserWindow} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
import path from 'path'
import './ipcmains/image'
import {BadgeManager} from './ipcmains/notify';

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
]);

function createWindow() {

    // Create the browser window.
    win = new BrowserWindow({
        icon: './cat.png',
        width: 800,
        height: 600,
        // autoHideMenuBar: true,  //  工具列不顯示
        frame: false,           //  標題列不顯示
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js'),
            // devTools: false
        }
    })

    const applicationMenu = Menu.buildFromTemplate([

        {
            label: '編輯',
            submenu: [
                {role: 'undo', label: '返回'},
                {role: 'redo', label: '重做'},
                {type: 'separator'},
                {
                    label: '常用功能',
                    submenu: [
                        {role: 'cut'},
                        {role: 'copy'},
                        {role: 'paste'},
                        {role: 'delete'},
                    ]
                },
                {type: 'separator'},
                {role: 'selectAll', label: '全選'}
            ]
        },
        {
            label: '關閉',
            click: () => app.quit(),
        },
    ]);
    Menu.setApplicationMenu(applicationMenu);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    const badgeManager = new BadgeManager(win);
    win.on('focus', () => badgeManager.removeNumber()); // 移除 badge

    win.on('closed', () => win = null)
}

// Quit when all windows are closed.
app.on('window-all-closed', () => app.quit())

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow();
});

ipcMain.on('minimize', () => {
    const win = BrowserWindow.getFocusedWindow();
    win.minimize();
});

ipcMain.on('maximize', () => {
    const win = BrowserWindow.getFocusedWindow();
    win.setFullScreen(!win.isFullScreen());
});

ipcMain.on('close', () => app.quit());

ipcMain.on('open-contextmenu', (event, chat) => {

    const menu = Menu.buildFromTemplate([
        {label: '複製', click: () => event.reply('chatroom:copy-msg', chat)},
        {label: '刪除', click: () => event.reply('chatroom:delete-msg', chat)},
        {label: '收回', click: () => event.reply('chatroom:take-back-msg', chat)},
    ]);

    if (chat.type === 'image') {
        menu.append(new MenuItem({label: '下載', click: () => event.reply('chatroom:save-img', chat)}));
    }
    menu.popup(BrowserWindow.getFocusedWindow())
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
