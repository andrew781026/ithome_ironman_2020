const {app, BrowserWindow} = require('electron');

let win;

function createDefaultWindow() {
    win = new BrowserWindow();
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
    win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
    return win;
}

app.on('ready', function () {

    createDefaultWindow();
});
app.on('window-all-closed', () => {
    app.quit();
});
