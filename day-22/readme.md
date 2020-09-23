# [ Day 22 ] - 動物聊天室(十五) - 將複製的圖片上傳到聊天室

目前上傳圖片的方式只能按下 ![](https://i.imgur.com/F7fN8hl.png) 然後選擇電腦中的圖片做上傳 

如果想要上傳網頁上的圖片 , 就變成 
1.下載圖片到電腦  
2.點擊 ![](https://i.imgur.com/F7fN8hl.png)   
3.找到下載的圖片存在電腦的路徑   
4.上傳  
這種非常繞的方式


那我們有沒有可能 ,   
1.網頁複製   
2.輸入框 ![](https://i.imgur.com/lYuNlus.png) 貼上  
3.直接上傳圖片到聊天室中
這樣直接 copy-paste 圖片到聊天室呢 ? 使用 `clipboard` 就可辦到

## clipboard

> 透過系統剪貼簿複製和貼上。

### 開始實作

> 在 `preload.js` 中註冊 `clipboard` 到 window 上面 , 讓 `Chatroom.vue` 可以使用 `window.clipboard`

```diff
// preload.js
- const {ipcRenderer} = require('electron');
+ const {clipboard,ipcRenderer} = require('electron');

window.ipcRenderer = ipcRenderer;
+ window.clipboard = clipboard;
```

> 建立 `clipboardUtils.js` 幫助我們取得圖片的 base64 資訊

```javascript
// @/utils/clipboardUtils.js
const read = clipboard => {

    const availableFormats = clipboard.availableFormats();

    const isImageFormat = availableFormats.find(format => format.includes('image'));
    const isHtmlFormat = availableFormats.find(format => format.includes('text/html'));
    const isTextFormat = availableFormats.find(format => format.includes('text/plain'));
    const isRtfFormat = availableFormats.find(format => format.includes('text/rtf'));

    if (isImageFormat) {

        const nativeImage = clipboard.readImage(); // 取得 clipboard 中的圖片
        return nativeImage.toDataURL(); // data:image/png;

    } else if (isTextFormat) return clipboard.readText(); // 取得 clipboard 中的文字
    else if (isHtmlFormat) return clipboard.readHTML(); // 取得 clipboard 中的 html
    else if (isRtfFormat) return clipboard.readRTF(); // 取得 clipboard 中的 rtf
    else return null;
}

module.exports = {
    read,
}
```

> 將 input 上的 ctrl+v 事件 capture 起來

```javascript
// at Chatroom.vue in script block 
{
    ...
    mounted() {
    
      ...
    
      this.captureCtrl_V_Event(this.$refs['text-input']);
    },
    methods: {
        // 參考資料 : https://stackoverflow.com/questions/22092762/how-to-detect-ctrlc-and-ctrlv-key-pressing-using-regular-expression/22092839
        captureCtrl_V_Event(element) {

            element.addEventListener("keydown", e => {

                const key = e.which || e.keyCode; // keyCode detection
                const ctrl = e.ctrlKey ? e.ctrlKey : (key === 17); // ctrl detection

                if (key === 86 && ctrl) {

                    console.log("Ctrl + V Pressed !");
                    e.preventDefault(); // 停止事件的默認動作
                    this.paste(); // 貼上圖片時 , 會直接上傳圖片 
                }
                /*
                else if (key === 67 && ctrl) {
                    console.log("Ctrl + C Pressed !");
                }
                */

            }, false);
        },
        paste() {

            // 別忘了 import clipboardUtils 
            const str = clipboardUtils.read(window.clipboard);

            if (str.startsWith('data:image')) {

                // 將剪貼簿中的圖片 , 直接上傳到聊天室
                const message = {
                    name: '你',
                    team: 'right',
                    avatar: 'cat-3.png',
                    type: 'image',
                    base64: str,
                    msg: '這是圖片',
                }

                this.addMessage(message);

            } else {

                // 將剪貼簿中的文字 , 複製到 input 中
                this.text = str;
            }
        },
    }
}
```

之後我們就獲得 , ctrl + v 可直接上傳圖片的 input 欄位

![](https://i.imgur.com/bqh8Ijo.gif)

## 參考資料

- [electron 官方文件 - clipboard](https://www.electronjs.org/docs/api/clipboard)
- [how-to-detect-ctrlc-and-ctrlv-key-pressing](https://stackoverflow.com/questions/22092762/how-to-detect-ctrlc-and-ctrlv-key-pressing-using-regular-expression/22092839)


```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
