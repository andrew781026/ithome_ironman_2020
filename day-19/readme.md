# [ Day 19 ] - 動物聊天室(十二) - Electron API 與其生產地

[day-03] 時我們有提過 , Main Process 與 BrowserWindow ( 也就是 Renderer Process )

[![electron 基礎架構](https://i.imgur.com/N9r4qT9.png)](https://www.udemy.com/course/electron-from-scratch/)
[ 圖片來源 : Udemy 課程 - Electron From Scratch: Build Desktop Apps With JavaScript ]

經過了 10 多天後 , 我們也介紹了 7 個 Electron API

- [[day-04] - globalShortcut](https://ithelp.ithome.com.tw/articles/10234094) 
- [[day-05] - Tray](https://ithelp.ithome.com.tw/articles/10234294)
- [[day-09] - ipcMain](https://ithelp.ithome.com.tw/articles/10235110)
- [[day-09] - ipcRenderer](https://ithelp.ithome.com.tw/articles/10235110)
- [[day-15] - Menu](https://ithelp.ithome.com.tw/articles/10237146)
- [[day-17] - Dialog](https://ithelp.ithome.com.tw/articles/10238623)
- [[day-18] - Notification](https://ithelp.ithome.com.tw/articles/10239313)

那我們如何知道各 Electron API 可以只能在 Main Process 中使用 , 或是 Main Process 與 BrowserWindow 都可使用呢 ?

官方網站上的在 API 說明的最開頭就會了解這支 API 可以在哪裡執行 , 

> 下方舉例說明

#### ipcMain

我們可以看到 `Process: 主程序` , 因此可知 ipcMain 只能在 Main Process 中做使用

![](https://i.imgur.com/IsjnQf7.png)

#### ipcRenderer

我們可以看到 `處理序: 畫面轉譯器` , 因此可知 ipcRenderer 只能在 BrowserWindow ( 也就是 Renderer Process ) 中做使用

![](https://i.imgur.com/F6o2roE.png)

#### clipboard

我們可以看到 `處理序: 主處理序, 畫面轉譯器` , 因此可知 clipboard 在 Main Process 與 BrowserWindow 都可使用

![](https://i.imgur.com/djc84Ep.png)

下方附上網友整理好的圖片 , 方便快速了解正在使用的 Electron API 可在哪種 Process 中執行

![](https://i.imgur.com/do3z8w7.png)

## 參考資料

- [electron 官方文件](https://www.electronjs.org/docs/api)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
