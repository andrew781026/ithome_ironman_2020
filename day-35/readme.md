[ Day 35 ] - Electron 應用程式 - 更新自動化 ( 說明篇 )

已經打包拿得客戶那的 Electron 應用程式 , 如果有 BUG 需要更新時該怎麼辦呢 ?

一般的做法 , 請客戶解安裝之前的版本 , 並手動安裝最新的版本 , 

如果這個應用程式有 10 個版本 , 那客戶可能會安裝到很煩 ~~(至少本魯會很煩)~~

今天討論一下 , Electron 應用程式的更新那回事 , 以利明天討論 `自動化更新`

---
## 前言 - 更新之前

在 [Day 6](https://ithelp.ithome.com.tw/articles/10234399) 利用 electron-builder 打包應用程式時 ,
我們有提到在 Windows 平台上可以打包成 NSIS 應用與 Portal 應用兩種類型

| 類型 | 功能特點 |
| -------- | -------- | 
| Portal     | 綠色檔案 , 啟動 exe 即可使用  
| NSIS     |  安裝檔 , 安裝後才能使用 

下方解說一下 , 此 2 種應用在手動更新時需要執行哪些步驟 ?

### Portal 版本

如果你是 Portal 版的程式 , 只要下載新的 exe , 並覆蓋掉舊的應用程式 , 就算完成更新了 !

### NSIS 版本

當你用 electron-builder 生成一個 windows 安裝檔時 , 那個安裝檔就是 NSIS 版本

使用 electron-builder 產出的 NSIS 安裝檔 , 他具體的安裝步驟如下

1. 執行安裝檔  
2. 安裝檔比對 Windows 內有沒有 appId 相同的 Electron 程式  
3. 如果有 appId 相同的 Electron 程式 , 執行 old-uninstaller.exe 將舊版解安裝
4. 安裝目前版本的 Electron 程式 , 並將其開啟 

![](https://i.imgur.com/Qlc9mZr.png)

因此如果你要更新應用程式 , 你只要拿到新版的 NSIS 安裝檔並執行它 , 安裝完成後你就可以享用更新後的應用程式了 ! 

下圖展示拿不同版本的安裝檔 , 安裝會有什麼樣的過程
![](https://i.imgur.com/PUpWHm3.gif)

如果想自己嘗試安裝看看 , 下方提供 3 個 NSIS 安裝檔 , 讓邦友玩玩看

- [v0.0.1 版本](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/andrew781026/ithome_ironman_2020/blob/master/day-35/installer/electron-autoupdate-Setup-0.0.1.exe)
- [v0.5.1 版本](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/andrew781026/ithome_ironman_2020/blob/master/day-35/installer/electron-autoupdate-Setup-0.5.1.exe)
- [v7.1.0 版本](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/andrew781026/ithome_ironman_2020/blob/master/day-35/installer/electron-autoupdate-Setup-7.1.0.exe)

## 結論


| 類型     | 手動更新方式 |
| -------- | --------   | 
| Portal   |  下載新執行檔案 , 關閉並刪除舊執行檔案 => 更新完成
| NSIS     |  下載新安裝檔 , 安裝後重開應用程式 => 更新完成 

## 備註

對於 NSIS 程式更新的流程 , 我個人抓破頭腦都沒想到原來這麼簡單就可以處理

本魯是觀察 [electron-updater 的 NsisUpdater.doInstall 區塊](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/NsisUpdater.ts#L89) 

才知道原來更新 NSIS 應用程式 = 執行新的安裝檔 (￣ ￣|||)

如果邦友覺得 NsisUpdater.doInstall 內的程式碼太雜 , 下方提供本魯調整後的簡化版 

```javascript
// 下方為簡化版的 doInstall 函式 
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
- [electron踩坑(二)](http://ihgsherrylee.github.io/posts/e21b57de/)
- [how-electron-builder-auto-update-work](https://stackoverflow.com/questions/59922073/how-to-get-my-electron-auto-updater-to-work)
- [electron-builder - Auto Update](https://github.com/electron-userland/electron-builder/tree/master/packages/electron-updater)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
