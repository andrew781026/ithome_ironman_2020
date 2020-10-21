# 2020 年度 IT 鐵人賽文章

在此存稿 IT 鐵人賽 30 天的文章 , 暫定主題用 Electron 做解說

## 預定完成的應用小程式

- 股票查價
- 股票到價通知
- 待辦清單
- 圖片下載器
- 文字編輯器
- 聊天室
- 小說下載 & 閱讀器 

## 大綱

- 第一天 - 介紹 Electron 是甚麼
- 第二天 - 股票查價(一) - 用 electron-quick-start 當初始版型
- 第三天 - 股票查價(二) - twse 證交所 API 介紹
- 第四天 - 股票查價(三) - ipcMain . ipcRender 介紹
- 第五天 - 股票查價(四) - 版型設定
- 第六天 - 股票查價(五) - 用 CLI 打包 Electron

預設價格 , 通知 
- 第七天 - 股票到價通知(一) - later.js 介紹 & 使用
- 第八天 - 股票到價通知(二) - Electron 通知
- 第九天 - 股票到價通知(三) - Mailgun 寄信
- 第十天 - 股票到價通知(四) - Electron Tray 縮小至工作列
- 第十一天 - 股票到價通知(五) - 用 API 打包 Electron

股價淨值比 , 計算小程式 => 順便做漲跌圖
本益比 ( EPS ) , 可從 https://www.twse.com.tw/zh/page/trading/exchange/BWIBBU_d.html
籌碼 => 每日交易量最大 5 人 or 10 人
每月營業額 => 圖形呈現 
EToro => 股票買賣模擬器 

> 聊天室 ? 與其他投資人一同聊天   
> 聊天室中 position : sticky 可以用來製作日期的部分
 
- 聊天室 - Socket.io 或者是用 Firebase 的 FireStore
- 聊天室 - Google 登入 或者是用 Firebase Auth => firebaseUID 

> 記事本 - 紀錄股票分析筆記 

- 第十二天 - 待辦清單(一) - 引入 fontawesome
- 第十三天 - 待辦清單(二) - 設定 ToDoList 版型
- 第十四天 - 待辦清單(三) - LowDB 介紹 & 使用
- 第十五天 - 待辦清單(四) - LowDB 深入解說
- 第十六天 - 待辦清單(五) - 完成 ToDoList 並打包
- 第十七天 - 圖片下載器(一) - Download.js 介紹 & 使用
- 第十八天 - 圖片下載器(二) - Download.js 深入解說
- 第十九天 - 圖片下載器(三) - cheerio.js 介紹 & 使用
- 第二十天 - 圖片下載器(四) - cheerio.js 深入解說
- 第二十一天 - 圖片下載器(五) - 引入 bootstrap
- 第二十一天 - 圖片下載器(五) - 圖片全螢幕顯示
- 第二十二天 - 圖片下載器(六) - 設定版型
- 第二十三天 - 圖片下載器(七) - 完成 "圖片下載器" 並打包
- 第二十四天 - 文字編輯器(一) - 查看 . 新增 . 修改文字檔
- 第二十五天 - 自動更新程式 - [autoUpdater](https://www.electronjs.org/docs/api/auto-updater#windows) . [electron-updater](https://www.electron.build/auto-update)
- 第二十六天 - 將當機報告送給遠端伺服器。 - crashReporter
- 第二十七天 - 在應用程式沒有取得鍵盤焦點的情況下偵測鍵盤事件。 - globalShortcut

## 聲音相關

- [ａｅｓｔｈＥｔｉｃ，ＣＹＢＥＲの ａｕｄｉｏ / ＶＩＳＵＡＬ，網頁中的聲音與影像研究 系列](https://ithelp.ithome.com.tw/users/20107828/ironman/1552)
- [JavaScript 音樂漫遊 - 30 天探索 Web Audio！](https://ithelp.ithome.com.tw/users/20111380/ironman/1783)
- [Tone.js](https://tonejs.github.io/)
- [【Web】Text to Speech (TTS) 文字轉語音](https://spicyboyd.blogspot.com/2018/07/webtext-to-speech-tts.html)

## 官方文檔
 - 螢幕截圖  - https://www.electronjs.org/docs/api/structures/desktop-capturer-source


## 其他參考

 - [Serverless crash reporting for Electron apps](https://engineroom.teamwork.com/serverless-crash-reporting-for-electron-apps-fe6e62e5982a)
 - [今天教你烤一份香喷喷的 Electron](https://juejin.im/post/6854573221467914248)