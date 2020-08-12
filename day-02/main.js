// Modules to control application life and create native browser window
const {app, Menu, isMac, BrowserWindow} = require('electron');
const path = require('path');
// require('electron-reload')(__dirname);

// 使用 vue.js 開發 , 然後將畫面改到 electron 上面 (將編譯後的 vue 轉到 main.js 上面)

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services'},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: '檔案',
        submenu: [
            isMac ? {label: '離開', role: 'close'} : {label: '離開', role: 'quit'}
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'delete'},
            {type: 'separator'},
            {
                label: '開發者工具',
                role: 'toggledevtools'
            }
        ]
    },
    // { role: 'viewMenu' }
    {
        label: '查看',
        submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {
                label: '開發者工具',
                role: 'toggledevtools'
            },
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            {role: 'minimize'},
            {role: 'zoom'},
            ...(isMac ? [
                {type: 'separator'},
                {role: 'front'},
                {type: 'separator'},
                {role: 'window'}
            ] : [
                {role: 'close'}
            ])
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    const {shell} = require('electron');
                    await shell.openExternal('https://electronjs.org')
                }
            }
        ]
    }
];

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // nodeIntegration: false,
        },
        // frame: false,
        // autoHideMenuBar: true
    });

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    // mainWindow.setMenu(menu);


    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
