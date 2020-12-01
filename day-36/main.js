const {spawn} = require('child_process');
const {app, BrowserWindow, ipcMain} = require('electron');
const downloadUtil = require('./utils/downloadUtil');

let win;

// 更新對話框
function createUpdateWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,      // 標題列不顯示
    transparent: true, // 背景透明
    autoHideMenuBar: true, //  工具列不顯示
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('./update.html');
  return win;
}

function createDefaultWindow() {
  win = new BrowserWindow();
  win.on('closed', () => win = null);
  win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
  return win;
}

app.on('ready', () => {

  /**
   * @return {int}
   */
  const getCurrentVersion = app => {

    const version = app.getVersion();
    const [x, y, z] = version.split('.');

    return z * 1 + y * 100 + x * (100 ^ 2)
  };

  const currentVersion = getCurrentVersion(app);

  // 比對版本高低
  if (currentVersion < 100) createUpdateWindow();
  else createDefaultWindow();
});

app.on('window-all-closed', () => app.quit());

ipcMain.on('update-dialog-open', (event, arg) => {
  console.log('update-dialog-open !!!')
})

ipcMain.on('update-confirm', (event, arg) => {

  // 下載檔案
  const doDownload = (url, dest, cb) => {

    return new Promise((resolve, reject) => {

      downloadUtil(url, dest)
        .on('got-data', ({downloadedLength, totalLength}) => {

          const saved = new Intl.NumberFormat().format(downloadedLength);
          const total = new Intl.NumberFormat().format(totalLength);
          const percent = ((downloadedLength / totalLength) * 100).toFixed(4)
          console.log(`downloaded :  ${saved} / ${total}  ( ${percent} % ) `);

          // 取得資料時 , 呼叫回呼函式 cb
          cb && cb({downloadedLength, totalLength});
        })
        .on('write-finish', resolve)
        .catch(reject);
    })
  }

  // 下載完成後 , 執行下載的安裝檔
  const doInstall = (exe) => new Promise((resolve, reject) => {

    const args = [
      "--updated",   // for update
      '/S',          // silent mode
      "--force-run", // run app after install complete
    ];

    try {
      const process = spawn(exe, args, {
        detached: true,
        stdio: "ignore",
      })
      process.on("error", error => reject(error))
      process.unref()

      if (process.pid) return resolve(true);

    } catch (error) {
      // 'fail to exec installer exe'
      reject(error)
    }
  })

  let hasQuited = false;
  const exe = './installer.exe';
  const installerUrl = 'https://github.com/andrew781026/ithome_ironman_2020/raw/master/day-35/installer/electron-autoupdate-Setup-0.5.1.exe';
  const cb = ({downloadedLength, totalLength}) => !hasQuited && event.reply('download-process', {
    downloadedLength,
    totalLength
  });

  doDownload(installerUrl, exe, cb)
    .then(
      () => doInstall(exe),
      err => console.error(err)
    )
    .then(
      () => (hasQuited = true) && app.quit(),
      err => console.error(err)
    )
})

ipcMain.on('update-cancel', (event, arg) => {
  console.log('update-cancel !!!')
  createDefaultWindow()
})
