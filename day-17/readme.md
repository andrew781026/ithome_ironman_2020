# [ Day 17 ] - 動物聊天室(十) - 上傳圖片與儲存圖片

昨日介紹了 Dialog 的基本使用 , 今天我們來將 Dialog 與 "動物聊天室" 做結合吧 !

> 第一個追加的功能是 "上傳圖片"

我們預計按下 ![](https://i.imgur.com/F7fN8hl.png) 後 , 讓使用者選擇一個圖片檔 , 然後將選擇的圖片存到 firestore 中

流程 :   
1.點擊 ![](https://i.imgur.com/F7fN8hl.png) 觸發 @click   
2.用 dialog.showOpenDialog 讓使用者選擇一個圖片檔   
3.將選擇的圖片轉成 base64 字串   
4.將 base64 字串存到 firestore 中    
5.將 base64 的圖片顯示在 Chatroom 中   

### 1. 點擊 ![](https://i.imgur.com/F7fN8hl.png) 觸發 @click  

在 `Chatroom.vue` 中的 flaticon-image 上追加 @click 與對應的 method
```diff
<div class="input-left">
    <i class="flaticon flaticon-happy cursor-pointer" title="emoji"></i>
-    <i class="flaticon flaticon-image cursor-pointer" title="圖片" ></i>
+    <i class="flaticon flaticon-image cursor-pointer" title="圖片" @click="uploadImage"></i>
    <i class="flaticon flaticon-attachment cursor-pointer" title="檔案"></i>
</div>
```

```javascript
uploadImage() {

    window.ipcRenderer
        .invoke('image:choose-image') // 呼叫 ipcMain.handle('image:choose-image'
},
```

### 2. 用 dialog.showOpenDialog 讓使用者選擇一個圖片檔 

使用 ipcMain.handle('image:choose-image' 監聽按鈕事件的觸發 

```javascript
// 選擇圖片
ipcMain.handle('image:choose-image', async event => {

    ...
});
```

`dialog.showOpenDialog` 開啟 dialog , 讓使用者選擇檔案

```javascript
// 選擇圖片
ipcMain.handle('image:choose-image', async event => {

    const result = await dialog.showOpenDialog({

        properties: ['openFile'],
        filters: [
            {name: '圖片', extensions: ['jpg', 'png', 'gif']},
        ],
    });

    if (result.canceled) return {canceled: true};
    else {

        const filePath = result.filePaths[0];
        const contentType = mime.lookup(filePath);
        const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
        return {path: filePath, base64: `data:${contentType};base64,${base64Image}`};
    }
});
```

如果 result.canceled === true 時 , 代表使用者取消選擇 , 因此不做任何事

```javascript
 if (result.canceled) return {canceled: true};
```

其他狀況 , 就取出 result.filePaths[0] 當作圖片的檔案路徑 ( filePath )

```javascript
const filePath = result.filePaths[0];
```

我們需要利用副檔名 , 建立 contentType , 因此追加第三方套件 `mime-types`

```shell script
$ npm i -s mime-types
```

### 3.將選擇的圖片轉成 base64 字串 , 並回傳給 ipcRenderer  

利用 `fs.readFileSync(filePath, {encoding: 'base64'})` 取得圖片的 base64 字串 , 然後補上 contentType 以符合網頁使用的 base64 格式

```javascript
else {

    const filePath = result.filePaths[0];
    const contentType = mime.lookup(filePath);
    const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
    return {path: filePath, base64: `data:${contentType};base64,${base64Image}`};
}
```

然後 ,我們獲得完整的 `image:choose-image` 處理 

```javascript
// 選擇圖片
ipcMain.handle('image:choose-image', async event => {

    const result = await dialog.showOpenDialog({

        properties: ['openFile'],
        filters: [
            {name: '圖片', extensions: ['jpg', 'png', 'gif']},
        ],
    });

    if (result.canceled) return {canceled: true};
    else {

        const filePath = result.filePaths[0];
        const contentType = mime.lookup(filePath);
        const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
        return {path: filePath, base64: `data:${contentType};base64,${base64Image}`};
    }
});
```

### 4.將 base64 字串存到 firestore 中   

新增 type='image' 的聊天訊息 , 並將 base64 放入聊天訊息之中

```javascript
uploadImage() {

    window.ipcRenderer
        .invoke('image:choose-image')
        .then(({base64}) => {

            const message = {
                name: '你',
                team: 'right',
                avatar: 'cat-3.png',
                type: 'image',
                base64,
                msg: '這是圖片',
            }

            this.addMessage(message);
        })
        .catch(e => console.error(e));
},
```

### 5.將 base64 的圖片顯示在 Chatroom 中   

修改 msg 區塊的顯示 , 當 chat.type === 'image' 時 , 顯示圖片 (img) 而非文字 (span)

```html
<div class="msg" :class="[chat.team]" @contextmenu="openMenu(chat)">
    <img v-if="chat.type === 'image'" width="100%" :src="chat.base64" :alt="chat.avatar">
    <span v-else class="break-words">{{chat.msg}}</span>
</div>
```   

然後 , 你完成了 "上傳圖片" 的功能 , 下圖為功能操作

![](https://i.imgur.com/rYdsqY8.gif)

> 第二個追加的功能是 "儲存圖片"

如果聊天內容是 type="圖片" 時 , 右鍵選單會多一個 "下載" 的功能 , 讓使用者可以儲存圖片到本機中

流程 :   
1.右鍵點擊圖片的聊天格   
2.選下載  
3.用 dialog.showSaveDialog 選擇儲存資料夾與設定儲存檔名  
4.將 base64 字串交給 fs.writeFile 存到本機成為一個圖片檔  



## 參考資料

- [electron 官方文件 - Menu](https://www.electronjs.org/docs/api/menu)
- [electron 官方文件 - Dialog](https://www.electronjs.org/docs/api/dialog#dialogshowerrorboxtitle-content)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
