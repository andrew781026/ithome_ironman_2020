# [ Day 30 ] - 鐵人賽完賽的感想，與之後...

今天是鐵人賽的最後一天，![/images/emoticon/emoticon02.gif](https://ithelp.ithome.com.tw/images/emoticon/emoticon02.gif)
由於本魯沒有屯文，每天都需要想主題與測試功能，![/images/emoticon/emoticon13.gif](https://ithelp.ithome.com.tw/images/emoticon/emoticon13.gif)
其實30天每天都想放棄，![/images/emoticon/emoticon20.gif](https://ithelp.ithome.com.tw/images/emoticon/emoticon20.gif)
不過想到邦友們的訂閱就堅持了下來 ![/images/emoticon/emoticon18.gif](https://ithelp.ithome.com.tw/images/emoticon/emoticon18.gif)

---

下面列表一下，本魯寫的文章與提點一些 KEY WORD ，
讓邦友與未來的自己可以快速翻到需要的那篇文章

## 傳送門

- [[ Day 1 ] - Electron 簡介](https://ithelp.ithome.com.tw/articles/10233269)
  - 今天開賽講廢話
- [[ Day 2 ] - 桌面小圖示(一) - 第一支 electron 應用程式](https://ithelp.ithome.com.tw/articles/10233301)
  - 利用 `electron-quick-start` 建立 electron
- [[ Day 3 ] - 桌面小圖示(二) - Electron 架構說明](https://ithelp.ithome.com.tw/articles/10233853)
  - 說明 Electron 的 Main Process 與 BrowserWindow 
- [[ Day 4 ] - 桌面小圖示(三) - 鍵盤快速鍵與更多的貓咪](https://ithelp.ithome.com.tw/articles/10234094)
  - 介紹 globalShortcut 全域快捷鍵
- [[ Day 5 ] - 桌面小圖示(四) - 系統通知區與縮小的貓咪](https://ithelp.ithome.com.tw/articles/10234294)
  - 介紹 Tray 系統通知區
- [[ Day 6 ] - 桌面小圖示(五) - 用 electron-builder 打包應用程式給其他人](https://ithelp.ithome.com.tw/articles/10234399)
  - 介紹如何將 Electron 打包成應用程式
- [[ Day 7 ] - electron 學習資源列表](https://ithelp.ithome.com.tw/articles/10234636)
  - 還在花時間研究如何用 vue 跟 electron ，因此介紹了一些個人學習在使用的資源
- [[ Day 8 ] - 動物聊天室(一) - vue 與 electron](https://ithelp.ithome.com.tw/articles/10234952)
  - 利用 `vue-cli-plugin-electron-builder` 建立含有 vue 的 electron
- [[ Day 9 ] - 動物聊天室(二) - IPC 與訊息交換](https://ithelp.ithome.com.tw/articles/10235110)
  - 介紹 IpcRenderer 與 IpcMain 
- [[ Day 10 ] - 動物聊天室(三) - firestore 介紹](https://ithelp.ithome.com.tw/articles/10235473)
  - 介紹聊天室的資料庫 firestore 
- [[ Day 11 ] - 動物聊天室(四) - preload 在 vue 中的特殊設定](https://ithelp.ithome.com.tw/articles/10235692)
  - 分享建立含有 vue 的 electron後，踩到的坑與解法
- [[ Day 12 ] - 動物聊天室(五) - 動物聊天室畫面](https://ithelp.ithome.com.tw/articles/10235919)
  - 把聊天室的畫面生出來
- [[ Day 13 ] - 動物聊天室(六) - 聊天室資料與 firestore](https://ithelp.ithome.com.tw/articles/10236332)
  - 將 firestore 功能加到 Electron 中
- [[ Day 14 ] - 動物聊天室(七) - 客製化標題列](https://ithelp.ithome.com.tw/articles/10236651)
  - 介紹如何製作有個性的 TitleBar
- [[ Day 15 ] - 動物聊天室(八) - Menu 選單](https://ithelp.ithome.com.tw/articles/10237146)
  - 介紹右鍵選單 ContextMenu 與不常用的系統工具列 ApplicationMenu
- [[ Day 16 ] - 動物聊天室(九) - Dialog 介紹](https://ithelp.ithome.com.tw/articles/10237906)
  - 介紹 Electron 中可用的各種 Dialog (系統原生對話框)
- [[ Day 17 ] - 動物聊天室(十) - 上傳圖片](https://ithelp.ithome.com.tw/articles/10238623)
  - 將圖片轉成 Base64 上傳到 firestore 中
- [[ Day 18 ] - 動物聊天室(十一) - 今晚我想來點 "聊天訊息通知"](https://ithelp.ithome.com.tw/articles/10239313)
  - 介紹 Electron 的 Notification (系統通知)
- [[ Day 19 ] - 動物聊天室(十二) - Electron API 與其生產地](https://ithelp.ithome.com.tw/articles/10240111)
  - 在使用 Electron 上的功能時，有時會不能使用，才發現個功能會有只能用在 Main Process 或 Renderer Process 的情況
- [[ Day 20 ] - 動物聊天室(十三) - firebase Auth 介紹](https://ithelp.ithome.com.tw/articles/10240835)
  - 聊天室肯定有登入功能，因此介紹 firebase Auth 並用其管理多種類型( Email . Google . Facebook ... )的登入
- [[ Day 21 ] - 動物聊天室(十四) - 登入畫面](https://ithelp.ithome.com.tw/articles/10241458)
  - 將登入功能加到 Electron 中
- [[ Day 22 ] - 動物聊天室(十五) - 將複製的圖片上傳到聊天室](https://ithelp.ithome.com.tw/articles/10241862)
  - 介紹 Electron 的 clipboard (系統剪貼簿)
- [[ Day 24 ] - 分享螢幕(一) - 屏幕擷取](https://ithelp.ithome.com.tw/articles/10243356)
  - 介紹 Electron 的 desktopCapturer (桌面擷取)
- [[ Day 25 ] - 分享螢幕(二) - 錄製螢幕訊息](https://ithelp.ithome.com.tw/articles/10243990)
  - 利用 MediaRecorder 錄製擷取的影像 
- [[ Day 26 ] - 分享螢幕(三) - 分享攝像頭畫面 HTML 版](https://ithelp.ithome.com.tw/articles/10244748)
  - 介紹網頁上的 WebRTC
- [[ Day 27 ] - 分享螢幕(四) - 分享螢幕 Electron 版 Electron 版](https://ithelp.ithome.com.tw/articles/10245297)
  - 將 WebRTC 放入 Electron 中分享個人桌面影像
- [[ Day 28 ] - 動物聊天室(十七) - 選擇 emoji 分享目前的心情](https://ithelp.ithome.com.tw/articles/10245734)
  - 將 Emoji 功能加到 Electron 中，此篇其實都是網頁技術
- [[ Day 29 ] - 桌面小圖示(六) - 開機啟動應用程式](https://ithelp.ithome.com.tw/articles/10246281)
  - 介紹 auto-launch 讓應用程式開機啟動 
  
相信 30 的天分享後，邦友會發現 Electron 是 8 成前端畫面與 1 成 Electron 內建功能與最後 1 成的 Node.js API 所組成的，所以各位前端工程師可以很快的建立一個 Electron 應用程式

```
其實會訂 Electron 為主題是因為本魯在 IT邦中發現 Electron 不好用的相關評論
本魯認為是台灣這沒有介紹 Electron 的系列文章所造成的誤解
畢竟 Electron 已被用來做出 vscode 這個殺手級應用程式怎麼可能不好用
因此本魯才會想用這 30 天挑戰一下 Electron 這個主題
希望能讓更多人了解 JS 宇宙中桌面應用開發的這一環，並期許能減少別人對它的誤解
```

--- 

如果明後天還能發文的話，
本魯可能會花 3 篇文章整理與優化下方三個應用程式，
- "桌面小圖示" 
- "動物聊天室" 
- "分享螢幕" 

也會嘗試潤色一下之前的文章讓其更容易閱讀