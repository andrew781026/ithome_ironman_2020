# [ Day 35 ] - Electron 應用程式 - 更新自動化 ( 說明篇 )

今天討論一下 , Electron 應用程式要如何做自動化更新 , 

## Windows 平台

### Portal 版本

如果你是 Portal 版的程式 , 只要下載新的 exe , 並覆蓋掉舊的應用程式 , 就算完成更新了 !

### NSIS 版本

當你用 electron-builder 生成一個 windows 安裝檔時 , 那個安裝檔就是 NSIS 版本

解說一下 electron-builder 產出的 NSIS 安裝檔 , 他具體的安裝步驟

1.執行安裝檔  
2.安裝檔比對 Windows 內有沒有 appId 相同的 Electron 程式
3.如果有 appId 相同的 Electron 程式 , 執行此程式的 old-uninstaller.exe , 將舊版解安裝 ( 版本號不重要 )
4.安裝目前版本的 Electron 程式 , 並將其開啟 

因此如果你要更新應用程式 , 你只要拿到新版的 NSIS 安裝檔並執行它 , 安裝完成後你就可以享用更新後的應用程式了 ! 

## Mac 部分

mac 上的自動化更新 , 就需要請邦友們幫忙研究了 !

## 備註

其實 NSIS 程式更新的流程 , 我個人是想破頭腦都想不到原來這麼簡單就可以處理

其實本魯是觀察 [electron-updater 的 NsisUpdater](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/NsisUpdater.ts#L89) 才知道原來更新 NSIS 應用程式這麼的輕鬆寫意

## 參考資料

- [electron-builder Docs - Auto Update](https://www.electron.build/auto-update)
- [electron踩坑(二)](http://ihgsherrylee.github.io/posts/e21b57de/)
- [how-electron-builder-auto-update-work](https://stackoverflow.com/questions/59922073/how-to-get-my-electron-auto-updater-to-work)
- [electron-builder - Auto Update](https://github.com/electron-userland/electron-builder/tree/master/packages/electron-updater)

```
完賽後，我將慢慢整理鐵人賽中，做了哪些事 ヾ(・ω・)メ(・ω・)ノ
```
