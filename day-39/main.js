const {app, BrowserWindow, crashReporter} = require('electron');

crashReporter.start({
  uploadToServer: true,
  companyName: 'ezoom',
  productName: 'test-crashReporter',
  submitURL: 'https://ezoom_test.bugsplat.com/post/electron/crash',
  ignoreSystemCrashHandler: true,
  // submitURL: 'http://localhost:3007/crashreports',
  extra: {
    'key': 'en-US',
    'email': 'andrewwang1@micb2b.com',
    'comments': 'BugSplat rocks!'
  }
})

let win;

/*
    Crash reports 會暫存在 `Crashpad` 資料夾中 (called 'Crashpad' on Windows and Mac, or 'Crash Reports' on Linux)
    直到上傳到伺服器中才清除掉 ,
    當然 , 你可以用 app.setPath('crashDumps', '/path/to/crashes') 改變 Crash reports 的暫存目錄
 */

// crashReporter.start({submitURL: 'http://localhost:3007/crashreports'});

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

  setTimeout(() => process.crash(), 1000);
});

app.on('window-all-closed', () => app.quit());
