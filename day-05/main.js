const {app, BrowserWindow, globalShortcut} = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 380,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: false,      // 標題列不顯示
        transparent: true, // 背景透明
        autoHideMenuBar: true, //  工具列不顯示
    });

    mainWindow.loadFile('index.html');

    return mainWindow;
}

app.on('ready', () => {

    const win = createWindow();

    [1, 2, 3].map(number => {

        globalShortcut.register(`CommandOrControl+${number}`, () => {
            win.webContents.send('switch-cat', number);
            win.show();  // Shows and gives focus to the window.
        })
    })
})

app.on('window-all-closed', () => app.quit())
