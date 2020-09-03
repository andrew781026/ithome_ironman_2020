# Electron 簡介

![electron](https://i.imgur.com/eR73zV5.png)

Electron 是一套前端工程師開發桌面程式的一把利器

我們常用的 vscode . slack 桌機板 . messenger 桌機板 ... 等都是用 Electron 開發而成的

如果想了解更多 Electron 能做甚麼 ? 

我們可以在 [Electron 應用商城](https://www.electronjs.org/apps) 查看其他工程師都用 Electron 製作了那些應用程式 !

看了這麼多程式 . 了解這工具之強大 . 之後 30 天讓我們嘗試製作我們的 `桌面應用程式` 吧 !

----

如果想要自己先玩玩看的話 , 可以下載 fiddle 玩一下

[electron playground - fiddle](https://github.com/electron/fiddle)

----

如果想要了解 electron 提供什麼功能 , 可下載 api-demos 查看個別的功能範例

Electron API 範例程式 - [electron-api-demos](https://github.com/CalvertYang/electron-api-demos-zh-Hant)

----


## 我與 Electron 的起源

當初利用 Firebase + Vue.js 做出了一個 DEMO 頁面 , 讓 PM 去給客戶呈現

PM 問了我一句話 : 「你這個網頁可以在斷網的情況下使用嗎?客戶那可能網路不太穩定」  

雖然當下我心中 OS : 「要用網頁還要斷網 , 這是甚麼神奇的客戶 O_o 」  , 
不過想到 Google Sheet 斷網也能用 , 我還是老老實實的研究有什麼方式可以達到需求吧！ \(╯-╰)/
最後 , 我做出了內包 demo 頁面的管理器 , 被 JS 宇宙的可能性給震撼到  , 這開啟了我踏上研究 ElectronJS 的旅途

下方為我第一個完成的 electron 應用程式截圖 

![](https://i.imgur.com/7Wh6igg.png)

## 環境

雖然 ElectronJS 可以跨 Windows . MacOS . Linux 三個平台使用 , 
但是小弟的開發機為 Windows 10 且第一次參加鐵人賽 , 怕測試時間不夠用 
因此之後 30 天的文章只保證能在 Windows 10 正常執行 , 不會涉及 macOs only 與 linux only 的功能

例如 : mac 專用的自定義 Dock 選單 , 這可能就需要邦友自行研究如何製作了 <(_ _)>

![](https://i.imgur.com/GJ9lihv.png)

## 工具準備 
1. vscode
2. git
3. node.js

![electron 基礎架構](https://i.imgur.com/N9r4qT9.png)
[ 圖片來源 : Udemy 課程 - Electron From Scratch: Build Desktop Apps With JavaScript ]

## 參考資料

[會前端就會寫桌面軟體-Electron 新手教學](https://junyou.tw/electron/)

#### 鐵人賽規則

- 沒有待補 . 灌水等事情
- 不能抄襲 . 複製大篇他人文章
- 每篇文章至少 300 字

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```