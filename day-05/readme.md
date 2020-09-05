# [ Day 5 ] - 桌面小圖示(四) - 系統通知區與縮小的貓咪

如果昨天沒有做出來 , 可以從 [第 4 天成品](https://github.com/andrew781026/ithome_ironman_2020/tree/master/day-04) 然後用 `npm start` 看到許多的貓咪 ![haha-man](https://ithelp.ithome.com.tw/images/emoticon/emoticon39.gif)

-----

小貓很可愛 , 但是我們要認真工作時 , 他太可愛了 , 可能會讓我們分心 , 

如果我們需要在開始認真工作時 , 將其收起來 , 想要看可愛小貓時 , 打開來看一下

這時就需要用到 [`Tray` ( 系統通知區 ) ](https://www.electronjs.org/docs/api/tray)

> 下方為官方文件的範例

```javascript
 tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: '縮小', click: () => win.hide()  },
    { label: '結束', click: () => app.quit() },
  ])
  tray.setToolTip('This is my application.') // 提示訊息
  tray.setContextMenu(contextMenu)   // 右鍵選單
```

如果對應到實際功能就是以下圖片

![](https://i.imgur.com/68ac9iR.png)
![](https://i.imgur.com/cA7JYer.png)

以下我們接續昨天的進度 , 追加 `Tray` ( 系統通知區 ) 

第一步 , 下載 tray_icon 

[![tray_cat](https://i.imgur.com/D5nNrTR.png)](https://i.imgur.com/D5nNrTR.png)

第二步 , 引入 Tray 與 Menu 

```diff
// main.js
const path = require('path');
+ const Tray = require('electron').Tray; // 系統通知區
+ const Menu = require('electron').Menu; // 應用程式選單
```

第三步 , 在 main.js 中追加 createTray 函式

```javascript
// main.js
function createTray(win) {

    const iconPath = path.join(__dirname, './imgs/tray_cat.png');
    const tray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '貓咪 4', click: () => {
                win.show();
                win.webContents.send('switch-cat', 4);
            }
        },
        {
            label: '貓咪 5', click: () => {
                win.show();
                win.webContents.send('switch-cat', 5);
            }
        },
        {
            label: '貓咪 6', click: () => {
                win.show();
                win.webContents.send('switch-cat', 6);
            }
        },
        {
            label: '縮小',
            click: () => win.hide() // 隱藏 桌面貓咪
        },
        {
            label: '結束',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ])
    tray.setToolTip('這是縮小的小貓')
    tray.setContextMenu(contextMenu);

    tray.on('click', () => win.show())

    return tray;
}
```

第四步 , 在 app.on('ready' 區塊中使用 createTray

```diff
// main.js
app.on('ready', () => {

    const win = createWindow();
+    createTray(win);

    [1, 2, 3].map(number => {

        globalShortcut.register(`CommandOrControl+${number}`, () => {
            win.webContents.send('switch-cat', number);
            win.show();  // Shows and gives focus to the window.
        })
    })
})
```

第五步 , 我們可以將 BrowserWindow 預設成 hide , 之後用 `Tray` ( 系統通知區 ) 把它顯示出來

```javascript
// main.js
const mainWindow = new BrowserWindow({
    width: 400,
    height: 420,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
    frame: false,      // 標題列不顯示
    transparent: true, // 背景透明
    autoHideMenuBar: true, //  工具列不顯示
+    show: false,      // 不顯示 BrowserWindow
});
```

之後 `npm start` 就可以縮小與顯示貓咪們 ! ![haha-man](https://ithelp.ithome.com.tw/images/emoticon/emoticon01.gif)

[結果圖片]

## 參考資料

- [Electron 文件 - tray](https://www.electronjs.org/docs/api/tray)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
