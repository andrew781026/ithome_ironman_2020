[ Day 36 ] - Electron 應用程式 - 更新自動化 ( 實做篇 )

昨天我們談論了 Electron 應用程式手動更新的流程 ,

今天 , 我們在 app 開啟時執行昨天的那些手動更新的流程 ,

讓 app 有自動更新的功能 (^.^)/

---

由於 Portal 的更新為 `下載後取代` , 行為模式與 NSIS 應用的 `下載後安裝` 都是要先下載的

因此我們先來製作能共同使用的下載流程 ,

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

> 讓使用者決定是否要更新到最新的版本之畫面 

?? 利用 Dialog 做處理 ?

> 確認更新後 , 下載新的檔案 & 利用 spawn 執行它

利用昨天的 doInstall 函式 , 執行之

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


## 參考資料

- [electron-builder Docs - Auto Update](https://www.electron.build/auto-update)
- [download.js](https://www.npmjs.com/package/download)
- [how-electron-builder-auto-update-work](https://stackoverflow.com/questions/59922073/how-to-get-my-electron-auto-updater-to-work)
- [electron-builder - Auto Update](https://github.com/electron-userland/electron-builder/tree/master/packages/electron-updater)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
