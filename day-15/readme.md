# [ Day 15 ] - 動物聊天室(八) - Menu 選單

在 electron 中有 3 種類型的 Menu  
- applicationMenu 
- contextMenu on BrowserWindow  
- contextMenu on Tray 

下面我們來介紹一下 , 3 種 Menu 各是甚麼 , 以及其存在的環境 



-----



### applicationMenu 

- 系統工具列 - 本身就有預設一些功能 

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
而是會自己用 html + css 客製化一個標題列   
( 如果想要客製化一個標題列 , 可參考 [昨天的文章](https://ithelp.ithome.com.tw/articles/10236651) )

![舉個例子](https://i.imgur.com/wF8jKEj.png)

vscode：將標題列與工具列放在同一列顯示   

![](https://i.imgur.com/AMajxDt.png)

-----


### contextMenu on BrowserWindow ( popupMenu )

- 在應用程式上面的彈跳選單

![](https://i.imgur.com/xORHHiF.png)

> 我們將 "動物聊天室" 追加彈跳選單

將 <template/> 中的文字區塊加上 @contextmenu 使其對右鍵產生反應

```diff
- <div class="msg" :class="[chat.team]">
+ <div class="msg" :class="[chat.team]" @contextmenu="openMenu(chat)">
    <span class="break-words">
       {{chat.msg}}
    </span>
</div>
```

當然我們要設定 method - openMenu

```javascript
methods: {
    openMenu(chat) {
    
        window.ipcRenderer.send('open-contextmenu', chat);
    },
    ...
}
```

ipcRenderer 送出 open-contextmenu , 因此 `background.js` 需要註冊 ipcMain.on('open-contextmenu' 來接受訊息

```javascript
ipcMain.on('open-contextmenu', (event, chat) => {

    Menu.buildFromTemplate([
        {label: '複製', click: () => event.reply('chatroom:copy-msg', chat)},
        {label: '刪除', click: () => event.reply('chatroom:delete-msg', chat)},
        {label: '收回', click: () => event.reply('chatroom:take-back-msg', chat)},
    ])
        .popup(BrowserWindow.getFocusedWindow())
});
```

然而 , `複製 . 刪除 . 收回` 這些動作必定需要更新畫面 ,   
因此用 `event.reply` 請求畫面更新 ,   
並在 created 時註冊對應的 ipcRenderer.on  

```javascript
created() {

    // 複製訊息
    window.ipcRenderer.on('chatroom:copy-msg', (event, chat) => {

        this.text = chat.msg;
        this.$refs['text-input'].focus();
    });

    //  刪除訊息
    window.ipcRenderer.on('chatroom:delete-msg', (event, chat) => {

        firestoreUtils.sender
            .deleteMessage(this.roomId, chat.uuid)
            .catch(e => console.error(e));
    });

    //  收回訊息
    window.ipcRenderer.on('chatroom:take-back-msg', (event, chat) => {

        firestoreUtils.sender
            .updateMessage(this.roomId, {...chat, takeBack: true})
            .catch(e => console.error(e));
    });
},
```

之前我們沒有設計 `收回訊息` 的樣式 , 因此需要追加設計一下

- 目標：![](https://i.imgur.com/wABGV9D.png)

在 `Chatroom.vue` 的 <template/> 中追加 v-if 判別此訊息要顯示收回 or 詳細內容

```html
<div v-if="chat.takeBack"
     :key="chat.uuid"
     class="msg-wrap justify-center"
>
    <div class="take-back-msg">
        <span> {{chat.name}} 已收回訊息 </span>
    </div>
</div>
```

上方追加區塊多使用了 `justify-center` 和 `take-back-msg` ,  
因此需要在 <style scoped> 區塊中定義一下   

```css
.justify-center {
    justify-content: center;
}

.take-back-msg{
    padding: 3px 20px 3px 20px;
    border-radius: 30px;
    color: white;
    background-color: #8F8989;
}
```

### 成果

![](https://i.imgur.com/vN29pdk.gif)


-----


### contextMenu on Tray ( trayMenu )

- 在系統通知區內小圖示上面的右鍵選單

```javascript
  const switchCat = catNo => () => { 
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

不知道邦友有沒有覺得熟悉 ? 
其實在 [[ Day 5 ] - 桌面小圖示(四) - 系統通知區與縮小的貓咪](https://ithelp.ithome.com.tw/articles/10234294) 我們已經使用過了 ![/images/emoticon/emoticon34.gif](https://ithelp.ithome.com.tw/images/emoticon/emoticon34.gif)

## 參考資料

- [electron 官方文件 - Menu](https://www.electronjs.org/docs/api/menu)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```