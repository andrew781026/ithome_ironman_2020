# [ Day 23 ] - 動物聊天室(十五) - 拖曳圖片

上傳與下載圖片的常見方式
 1. 點擊上傳按鈕 ![](https://i.imgur.com/F7fN8hl.png)
 2. Ctrl+C 與 Ctrl+V
 3. 拖曳圖片

我們已經介紹過前 2 種方式在 Electron 中需要如何實作 ,  
今天來介紹一下第三種方式 "拖曳圖片" 要如何實作

## 系統檔案拖曳到 "動物聊天室" 上傳圖片

系統檔案拖曳到 Electron 中 , 可以使用 JS 的 Drag API 做處理 , 詳情可見 [HTML 拖放 API](https://developer.mozilla.org/zh-TW/docs/Web/API/HTML_Drag_and_Drop_API)

## 將 "動物聊天室" 中的圖片拖曳到系統桌面上 

下方預計呈現的效果
![](https://i.imgur.com/qTU7gME.gif)

這就需要用到 `webContents.startDrag(item)` 來處理 

### 官網說明

#### webContents.startDrag(item)
- item Object
  - file String[] | String - The path(s) to the file(s) being dragged.
  - icon NativeImage | String - The image must be non-empty on macOS.

利用 startDrag 可將網頁上的圖片拖曳到系統檔案中

### 實作

在 ipcmains 資料夾中追加 drag.js 

```javascript
import {ipcMain} from 'electron';
import os from 'os';
import fs from 'fs';
import sharp from 'sharp'; // 使用 sharp 產出圖片的 thumbnail
import mime from "mime-types";

// 參考資料 : https://cythilya.github.io/2017/03/12/uuid/
function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

ipcMain.on('chatroom:img-dragstart', (event, imageData) => {

    const contentType = imageData.base64.split(';base64,')[0].replace('data:', '');
    const base64Image = imageData.base64.split(';base64,')[1];
    const ext = mime.extension(contentType);

    const tmpdir = os.tmpdir();
    const uuid = _uuid();
    const fileName = `image-${uuid}.${ext}`
    const filePath = tmpdir + fileName;
    fs.writeFileSync(filePath, base64Image, {encoding: 'base64'});

    const thumbnailName = `thumbnail-${uuid}.${ext}`
    const thumbnailPath = tmpdir + thumbnailName;

    sharp(filePath)
        .resize({ width: 70 })
        .toFile(thumbnailPath)
        .then(info => {

            // output.jpg is a 300 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpg

            event.sender.startDrag({
                files: [filePath],
                icon: thumbnailPath,
            })
        })
        .catch(err => console.error(err));

})
```

於 `Chatroom.vue` 中的 img 追加圖片拖曳事件 `@dragstart="dragstart($event,chat)"`

```diff
<div class="msg" :class="[chat.team]" @contextmenu="openMenu(chat)">
    <img v-if="chat.type === 'image'"
         width="100%"
         :src="chat.base64" :alt="chat.avatar"
+         @dragstart="dragstart($event,chat)"
    >
    <span v-else class="break-words">{{chat.msg}}</span>
</div>
```

並且追加函式 dragstart , 其中使用 ipcRenderer.send('chatroom:img-dragstart', 呼叫特定 ipcMain 

```javascript
methods: {
    dragstart(event, chat) {
    
        event.preventDefault();
        window.ipcRenderer.send('chatroom:img-dragstart', chat);
    },
}
```

完成上方 3 步驟後 , 我們就可以將圖片拖曳到桌面了 !

![](https://i.imgur.com/qTU7gME.gif)

## 參考資料

- [electron 官方文件 - 原生檔案拖放](https://www.electronjs.org/docs/tutorial/native-file-drag-drop)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
