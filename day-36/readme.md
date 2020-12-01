# [ Day 36 ] - Electron 應用程式 - 更新自動化 ( 實做篇 )

昨天我們談論了 Electron 應用程式手動更新的流程 ,

今天 , 我們在 app 開啟時執行昨天的那些手動更新的流程 ,

讓我們的 app 有自動更新的功能 (^.^)/

---

## 更新流程分析

| 類型 | 流程 |
| -------- | -------- | 
| Portal    | 下載新執行檔 => 取代舊檔
| NSIS     |  下載安裝檔 => 執行安裝 

Portal 的更新與 NSIS 的更新流程差別不大 , 因此下方本魯將介紹 NSIS 的更新流程 ,

相信厲害的邦友們 , 必定能舉一反三 , 寫出 Portal 版本的更新自動化

### 下載檔案 

我們利用 [download.js](download.js) 輔助我們下載新版的 exe 檔案

> 首先 , 製作 downloadUtil.js 方便我們之後操作下載行為

```javascript
// utils/downloadUtil.js 
const download = require('download');
const fs = require('fs');
const _ = require('lodash');

const fileDownload = (url, dest) => {

    // duplexStream is a Promise & EventEmitter
    const duplexStream = download(url);

    const writeStream = fs.createWriteStream(dest);
    writeStream.on("finish", () => duplexStream.emit('write-finish'));     // 完成寫入檔案到指定位置
    writeStream.on("error", err => duplexStream.emit('write-error',err));

    // 限制每 0.5 秒至多執行 1 次
    const throttleFunc = _.throttle(func => func(), 500);

    let downloadedLength = 0;
    duplexStream.on('response', res => {
        const totalLength = res.headers['content-length'];

        res.on('data', data => {
            downloadedLength += data.length;

            // 因為 duplexStream 是 EventEmitter 所以 emit channel : "got-data"
            throttleFunc(() => duplexStream.emit('got-data', {data, downloadedLength, totalLength}));
        });
    });

    duplexStream.on("error", err => console.error(err));

    duplexStream.pipe(writeStream);

    // duplexStream.pause();  // 下載暫停
    // duplexStream.resume(); // 下載繼續
    return duplexStream;
}

module.exports = fileDownload;
```

如何使用 downloadUtil.js ?

```javascript
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
            .on('write-error', console.error)
            .catch(reject);
    })
}
```

> 顯示對話框 , 讓使用者決定是否要更新到最新的版本

```javascript
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
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Confirm</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
    <style>
        body {
            user-select: none;
            height: 100%;
            background-color: #3cc245;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        h1 {
            margin: 20px;
        }
    </style>
</head>
<body>
<h1>有新的版本可使用 , 您是否要更新 ?</h1>
<div class="progress" style="width: 150px;display: none">
    <div class="progress-bar progress-bar-striped progress-bar-animated"></div>
</div>
<div id="btn-group">
    <button class="btn btn-primary" onclick="confirm()">更新</button>
    <button class="btn btn-secondary" onclick="cancel()">取消</button>
</div>
<script>
    // ...JS code , 可參考 https://github.com/andrew781026/ithome_ironman_2020/blob/master/day-36/update.html
</script>
</body>
</html>
```

![](https://i.imgur.com/hw0xEsT.gif)

> 確認更新後 , 下載新的檔案 & 利用 spawn 執行它

利用昨天整理的 doInstall 函式 , 執行之

```javascript
const doInstall = (exe = 'installer_path', args = '["--updated"]') => {

    return new Promise((resolve, reject) => {

        const process = spawn(exe, args, {
            detached: true,  // 讓執行緒與 NodeJS 脫鉤
            stdio: "ignore",
        })
        process.on("error", error => reject(error))
        process.unref()

        if (process.pid) resolve(true);
    })
}
```

> 利用 spawn 執行時 , 會出現安裝畫面

![](https://i.imgur.com/1ytO8Qc.gif)

之後你利用捷徑  ![](https://i.imgur.com/AJULof5.png) 開啟應用程式 , 就會看到更新後的版本了 !

### 成果圖

> 更新  

![](https://i.imgur.com/hw0xEsT.gif)

> 不執行更新  

![](https://i.imgur.com/ZrD396G.gif)

> 下方為範例的安裝檔

[![](https://i.imgur.com/PBzYZZq.png)](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/andrew781026/ithome_ironman_2020/blob/master/day-36/installer/electron-autoupdate-done-Setup-0.0.36.exe)

## 參考資料

- [download.js](https://www.npmjs.com/package/download)
- [electron-builder Docs - Auto Update](https://www.electron.build/auto-update)
- [how-electron-builder-auto-update-work](https://stackoverflow.com/questions/59922073/how-to-get-my-electron-auto-updater-to-work)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
