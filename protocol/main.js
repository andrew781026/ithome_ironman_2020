// Modules to control application life and create native browser window
const {app, protocol, BrowserWindow, BrowserView, ipcMain} = require('electron')
const path = require('path')

const CUSTOM_SCHEME = 'tmcopwin.oidc';

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'tmcopwin.oidc',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    }
  },
  {
    scheme: 'tmcopwin.test',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    }
  }
])

process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})

const args = process.argv.slice(1);
const params = args.reduce((prev, curr) => {

  if (curr.trim().startsWith('--')) {
    const equalPosition = curr.indexOf('=')
    const key = curr.substring(2, equalPosition)
    const value = curr.substring(equalPosition + 1)
    return {...prev, [key]: value}
  } else return prev
}, {})


const isDev = Boolean(params['windows']);
const url = params.url;

// ref : https://blog.stranianelli.com/how-to-use-browser-view-with-electron/
function resizeView(view, mainWindow) {
  const bound = mainWindow.getBounds();
  const height = process.platform !== 'win32' ? 60 : 40
  view.setBounds({x: 0, y: height, width: bound.width, height: bound.height - height});
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    // transparent: true,
    // titleBarStyle: 'hidden',
    // backgroundColor: '#2e2c29',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // mainWindow.loadURL(url || 'https://andrew781026.github.io/daliy-web-ui/__tests__/fetch-testing.html')

  // Open the DevTools.
  // if (isDev) mainWindow.webContents.openDevTools()
  // mainWindow.webContents.openDevTools()
  mainWindow.webContents.send('switch-cat', JSON.stringify(params));

  function DeepLink() {

    if (process.defaultApp) {
      if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('tmcopwin.test', process.execPath, [path.resolve(process.argv[1])])
      }
    } else {
      app.setAsDefaultProtocolClient('tmcopwin.test')
    }

    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
      // the commandLine is array of strings in which last element is deep link url
      // dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop()}`)
    })
  }

  DeepLink()

  mainWindow.webContents.on('did-finish-load', () => {
    const [width, height] = mainWindow.getSize();
    const view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({
      x: 1,
      y: 32,
      width: width - 2,
      height: height - 33,
    });
    view.setAutoResize({
      width: true,
      height: true,
    });
    view.webContents.loadURL('https://beta.account.trendmicro.com/setup/jpsss/monitor')
    resizeView(view, mainWindow)
  });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  protocol.handle(CUSTOM_SCHEME, (req) => {
    //     method: req.method,
    //     headers: req.headers,
    //     body: req.body
    console.log('protocol.handle ->', req.url)
    return new Response('<h1>hello, world</h1>', {
      headers: {'content-type': 'text/html'}
    })
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// minimize . maximize . close events
ipcMain.on('minimize', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.minimize();
});

ipcMain.on('maximize', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.setFullScreen(!win.isFullScreen());
});

ipcMain.on('close', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.close();
});
