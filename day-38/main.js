const {app, BrowserWindow, crashReporter} = require('electron');

let win;

function createDefaultWindow() {
  win = new BrowserWindow();
  win.on('closed', () => win = null);
  win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
  return win;
}

app.on('ready', () => {

  createDefaultWindow();
  const crashesDirectory = app.getPath('crashDumps');
  console.log('crashesDirectory=', crashesDirectory);

  process.crash();
});

app.on('window-all-closed', () => app.quit());
