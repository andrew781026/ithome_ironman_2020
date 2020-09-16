const path = require('path');
const {app, BrowserWindow, ipcMain, dialog} = require('electron');

let win;

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,  // 寬度
        height: 500, // 高度
        autoHideMenuBar: true, //  工具列不顯示
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.loadFile('index.html');
    win = mainWindow;
}

app.on('ready', () => createWindow()) // Main Process 準備 OK 後 , 建立一個 瀏覽器視窗 顯示給使用者
app.on('window-all-closed', () => app.quit()) // 所有 BrowserWindow 關閉後 , 結束 Main Process

ipcMain.on("open", () => {

    dialog.showOpenDialogSync({
        filters: [
            {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
            {name: 'Custom File Type', extensions: ['as']},
            {name: 'All Files', extensions: ['*']}
        ],
        properties: ['openFile', 'openDirectory'] // if you set both , on windows it will only show openDirectory dialog
    })
        .then(result => {
            console.log(result.canceled)
            console.log(result.filePaths)
        })
        .catch(err => {
            console.log(err)
        });
});
ipcMain.on("save", () => {

    dialog.showSaveDialog({

        title: 'Save panel',
        defaultPath: 'D:/test/ithome_ironman_2020',
        buttonLabel: '是' //  label for the confirmation button

    })
        .then(result => {
            console.log(result.canceled)
            console.log(result.filePath)
        })
        .catch(err => {
            console.log(err)
        });
});
ipcMain.on("message-box", () => {

    dialog.showOpenDialogSync(win, {
        filters: [
            {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
            {name: 'Custom File Type', extensions: ['as']},
            {name: 'All Files', extensions: ['*']}
        ]
    });
});
ipcMain.on("error-box", () => {

    dialog.showOpenDialogSync(win, {
        filters: [
            {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
            {name: 'Custom File Type', extensions: ['as']},
            {name: 'All Files', extensions: ['*']}
        ]
    });
});
ipcMain.on("certificate-trust", () => {

    dialog.showOpenDialogSync(win, {
        filters: [
            {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
            {name: 'Custom File Type', extensions: ['as']},
            {name: 'All Files', extensions: ['*']}
        ]
    });
});

