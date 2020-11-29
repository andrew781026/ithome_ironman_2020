const {spawn} = require('child_process');
const {app, BrowserWindow} = require('electron');
const downloadUtil = require('./utils/downloadUtil');

let win;

function createDefaultWindow() {
    win = new BrowserWindow();
    win.on('closed', () => {
        win = null;
    });
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

    console.log(currentVersion);

    if (currentVersion < 100) {

        // 需要先確認

        const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))

        // 下載檔案
        const doDownload = (url, dest) => {

            return new Promise((resolve, reject) => {

                downloadUtil(url, dest)
                    .on('got-data', ({downloadedLength, totalLength}) => {

                        const saved = new Intl.NumberFormat().format(downloadedLength);
                        const total = new Intl.NumberFormat().format(totalLength);
                        const percent = ((downloadedLength / totalLength) * 100).toFixed(4)
                        console.log(`downloaded :  ${saved} / ${total}  ( ${percent} % ) `);
                    })
                    .on('write-finish', resolve)
                    .catch(reject);
            })
        }

        // 下載完成後 , 執行下載的安裝檔
        const doInstall = (exe) => new Promise((resolve, reject) => {

            const args = ["--updated"];

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

        const exe = './downloads/installer.exe';
        const installerUrl = 'https://github.com/andrew781026/ithome_ironman_2020/raw/master/day-35/installer/electron-autoupdate-Setup-0.5.1.exe';

        doDownload(installerUrl, exe)
            // .then(() => wait(2))
            .then(
                () => doInstall(exe),
                err => console.error(err)
            )
            .then(
                () => app.quit(),
                err => console.error(err)
            )

    } else createDefaultWindow();
});
app.on('window-all-closed', () => app.quit());
