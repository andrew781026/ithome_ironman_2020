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

// 選擇檔案
ipcMain.on("open-file", event => {

    dialog.showOpenDialog({
        filters: [
            {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
            {name: 'Custom File Type', extensions: ['as']},
            {name: 'All Files', extensions: ['*']}
        ],
        properties: ['openFile', 'multiSelections'] // if you set both , on windows it will only show openDirectory dialog
    })
        .then(result => {
            console.log(result.canceled)
            console.log('filePaths=', result.filePaths)
            event.reply('open-file-path', result.filePaths)
        })
        .catch(err => {
            console.log(err)
        });
});

// 選擇資料夾
ipcMain.on("open-directory", () => {

    dialog.showOpenDialog({
        properties: ['openDirectory'] // if you set both , on windows it will only show openDirectory dialog
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

        title: '儲存圖片',  // dialog 標題
        buttonLabel: '是', //  label for the confirmation button
        defaultPath: 'D:\\test\\ithome_ironman_2020', // dialog 的預設路徑

    })
        .then(result => {

            if (result.canceled) {

                console.log('使用者關閉 SaveDialog')

            } else {

                console.log(result.filePath)
                // create a file

            }

        })
        .catch(err => {
            console.log(err)
        });
});

ipcMain.on("message-box", () => {

    dialog.showMessageBox({
        title: '提示框',
        message: '這是提示框的內容訊息',
    });
});

ipcMain.on("error-box", () => {

    dialog.showErrorBox('錯誤訊息', '您的貓咪主人禁止您進入');
});
