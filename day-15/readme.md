# [ Day 15 ] - 動物聊天室(八) - Menu 選單

在 electron 中有 3 種類型的 Menu  
- applicationMenu 
- contextMenu on BrowserWindow  
- contextMenu on Tray 

下面我們來介紹一下 , 3 種 Menu 各是甚麼 , 以及其存在的環境 

### applicationMenu 

系統工具列 - 本身就有預設一些功能 , 

![](https://i.imgur.com/KvWx6an.png)

當然我們可以也可以將其設定成我們想要的

```javascript
// 加到 background.js 的 createWindow 函式中 
const applicationMenu = Menu.buildFromTemplate([

    {
        label: '編輯',
        submenu: [
            {role: 'undo', label: '返回'},
            {role: 'redo', label: '重做'},
            {type: 'separator'},
            {
                label: '常用功能',
                submenu: [
                    {role: 'cut'},
                    {role: 'copy'},
                    {role: 'paste'},
                    {role: 'delete'},
                ]
            },
            {type: 'separator'},
            {role: 'selectAll', label: '全選'}
        ]
    },
    {
        label: '關閉',
        click: () => app.quit(),
    },
]);
Menu.setApplicationMenu(applicationMenu);
```

![](https://i.imgur.com/1nXGMYP.png)

由於 electron 的 applicationMenu 無法調整高度 . 背景色 ...等樣式 ,   
所以大部分的 electron 程式不會使用 applicationMenu ,   
而是會自己用 html + css 自己刻一個 applicationMenu   

![舉個例子](https://i.imgur.com/wF8jKEj.png)

vscode：將標題列與工具列整合在一起  

![](https://i.imgur.com/AMajxDt.png)

### contextMenu on BrowserWindow

在應用程式上面的右鍵選單

> 修改 . 刪除 . 收回訊息 

### contextMenu on Tray 

在系統通知區內小圖示上面的右鍵選單

```javascript
  const switchCat = (catNo) => () => {
      win.show();
      win.webContents.send('switch-cat', catNo);
  }

  tray = new Tray('/path/to/my/icon');
  const contextMenu = Menu.buildFromTemplate([
      {label: '貓咪 4', click: switchCat(4)},
      {label: '貓咪 5', click: switchCat(5)},
      {label: '貓咪 6', click: switchCat(6)},
      {label: '縮小', click: () => win.hide()},
      {label: '結束', click: () => app.quit()}
  ]);
  tray.setToolTip('This is my application.'); // 提示訊息
  tray.setContextMenu(contextMenu);   // 右鍵選單
```

不知道邦友有沒有覺得熟悉 ? 其實在 [[ Day 5 ] - 桌面小圖示(四) - 系統通知區與縮小的貓咪](https://ithelp.ithome.com.tw/articles/10234294) 我們已經使用過了 ! 

## 參考資料

- [electron 官方文件 - Menu](https://www.electronjs.org/docs/api/menu)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```