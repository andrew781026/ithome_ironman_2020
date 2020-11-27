import {spawn} from "child_process";

const {app, BrowserWindow} = require('electron');
const leftpad = require('./leftpad');

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

    if (currentVersion > 100) {

        const exe = options.installerPath;
        const args = {};

        // 下載檔案

        // 下載完成後 , 執行下載的安裝檔

        try {
            const process = spawn(exe, args, {
                detached: true,
                stdio: "ignore",
            })
            process.on("error", error => console.error(error))
            process.unref()

            if (process.pid) return true;

        } catch (error) {
            console.error('fail to exec installer exe')
        }


    } else createDefaultWindow();
});
app.on('window-all-closed', () => app.quit());
