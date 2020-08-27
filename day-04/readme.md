# 第四天 - context-menu 右鍵選單 - 內容功能表

原本今天要討論 , 右鍵選單 ( context-menu ) , 
在官網上發現一個不幸的消息 , 
在 win 10 中 frame = false , zone = draggable 的區塊 , 
預設的 DOM 事件會被取代成系統 ( win 10 ) 預設的右鍵選單
 ( 說人話 : 右鍵選單 . 左鍵雙擊 ...等操作會被替換成下方選單 )

![](https://i.imgur.com/n4yGWqy.png)

所以 , 我們可能需要讓應用程式 frame = true 將貓咪的背景改成非透明的 , 讓其可以執行右鍵

使用 frame = false , 是自製一個 title 
-[electron-seamless-titlebar-tutorial](https://github.com/binaryfunt/electron-seamless-titlebar-tutorial)

或者使用 custom-electron-titlebar 做處理
-[custom-electron-titlebar](https://www.npmjs.com/package/custom-electron-titlebar)

## 參考資料

- [electron-builder 官方文件](https://www.electron.build/)
