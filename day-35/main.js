const {app, BrowserWindow} = require('electron');

let win;

function createDefaultWindow() {
    win = new BrowserWindow();
    win.on('closed', () => {
        win = null;
    });
    win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
    return win;
}

app.on('ready', () => createDefaultWindow());
app.on('window-all-closed', () => app.quit());
