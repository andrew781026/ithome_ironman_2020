// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
require('electron-reload')(__dirname);

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        autoHideMenuBar: true
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

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

const {listAllStocks, getData} = require('./utils/test-twse-api');

ipcMain.handle('search-stocks', async (event, q) => {

    const data = await listAllStocks(q);

    return data.suggestions
        .map(str => str.split('\t'))
        .map(arr => ({id: arr[0], name: arr[1]}));
});

ipcMain.handle('get-stock-info', async (event, stockId) => {

    const data = await getData([{
        id: stockId,
        date: null,
        type: 'tse',
    }]);

    return data.msgArray
        .map(single => ({
            ...single,
            currentPrice: single.z,
            stockId: single.c,
            stockName: single.n,
            todayLowest: single.l,
            todayHighest: single.h,
        }));
});

const searchStocks = [
    {
        id: '2330',
        date: null,
        type: 'tse',
    },
    {
        id: '2881',
        date: null,
        type: 'tse',
    }
];

