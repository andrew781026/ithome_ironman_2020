// Modules to control application life and create native browser window
const {app, Menu, BrowserWindow} = require('electron');
const path = require('path');
// require('electron-reload')(__dirname);

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 350,
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

// Windows 工作列 - https://www.electronjs.org/docs/tutorial/windows-taskbar
app.setJumpList([
    {
        name: '最近訪問',
        items: [
            {
                type: 'task',
                title: '開啟 Chrome',
                program: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
                icon: 'C:\\Users\\andrew\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Google Profile.ico',
                description: '開新 Chrome 瀏覽器'
            },
        ]
    },
    { // has no name and no type so `type` is assumed to be "tasks"
        items: [
            {
                type: 'task',
                title: 'New Project',
                program: process.execPath,
                args: '--new-project',
                description: 'Create a new project.'
            },
            { type: 'separator' },
            {
                type: 'task',
                title: 'Recover Project',
                program: process.execPath,
                args: '--recover-project',
                description: 'Recover Project'
            }
        ]
    }
])

app.on('ready', () => {

    createWindow();
})

app.on('window-all-closed', () => {

    app.quit();
})