# [ Day 14 ] - 動物聊天室(七) - 客製化標題列  

不知道邦友們覺得 electron 在 windows 上的標題列覺得如何 ?

![](https://i.imgur.com/bgzX1pi.png)  

本魯覺得預設的標題列有些死板 , 所以今天動手進行客製化`標題列`  

![](https://i.imgur.com/5HXcbK4.png)

## 實作 Start

> 第一步 , 當然是將系統預設的標題列藏起來

在 new BrowserWindow 時 , 追加參數 `frame: false` 

```diff
// in background.js
win = new BrowserWindow({
        icon: './cat.png',
        width: 800,
        height: 600,
        autoHideMenuBar: true,  //  工具列不顯示
+        frame: false,         //   標題列不顯示
        ...
    })
```

![](https://i.imgur.com/w1zo0di.png)

新增元件 `TitleBar.vue` 

```html
<template>
    <header class="ui-titlebar">
        <div class="ui-titletext">
            {{title}}
        </div>
        <div class="ui-titlecontrols">
            <button class="ui-btn minimize" @click="min" title="縮小">
                <i class="flaticon flaticon-minus"></i>
            </button>
            <button class="ui-btn maximize" @click="max" title="全螢幕">
                <i class="flaticon flaticon-size"></i>
            </button>
            <button class="ui-btn close" @click="close" title="關閉">
                <i class="flaticon flaticon-clear"></i>
            </button>
        </div>
    </header>
</template>

<script>
    export default {
        name: "TitleBar",
        methods: {
            min() {

                window.ipcRenderer.send('minimize');
            },
            max() {

                window.ipcRenderer.send('maximize');
            },
            close() {

                window.ipcRenderer.send('close');
            },
        },
        computed: {
            title() {

                return document.title;
            }
        }
    }
</script>

<style scoped>

    .ui-titlebar {
        display: flex;
        width: 100%;
        height: var(--title-bar-height);
        background: #333;
        user-select: none;
        cursor: pointer;
    }

    .ui-titletext {
        -webkit-app-region: drag;
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 15px;
        font-size: 30px;
        color: #fff;
    }

    .ui-titlecontrols {
        font-size: 30px;
    }

    .ui-btn {
        height: 100%;
        border: 0;
        outline: 0;
        background: transparent;
        color: white;
    }

    .ui-btn:hover {
        background: rgba(255, 255, 255, .1);
    }

    .ui-btn.close:hover {
        background: #e81123;
    }
</style>
```

接下來在 `App.vue` 中引用 `TitleBar.vue` 

```diff
// in App.vue
import Chatroom from './components/Chatroom.vue'
+ import TitleBar from './components/TitleBar.vue'

export default {
    name: 'App',
    components: {
        'chatroom': Chatroom,
+        'title-bar': TitleBar,
    }
}
```

另外 ,  
新建的元件 `TitleBar.vue` 中有 `縮小` . `全螢幕` . `關閉` 這三個功能 ,   
需要取得 BrowserWindow 來做處理 ,   
因此在 `background.js` 中加上 3 個 ipcMain.on 區塊

```javascript
// 在 background.js 末尾加上下方 code
ipcMain.on('minimize', () => {
    const win = BrowserWindow.getFocusedWindow(); 
    win.minimize();
});

ipcMain.on('maximize', () => {
    const win = BrowserWindow.getFocusedWindow();
    win.setFullScreen(!win.isFullScreen());
});

ipcMain.on('close', () => {
    const win = BrowserWindow.getFocusedWindow();
    win.close();
});
```

然後我們就可以看到成品

![](https://i.imgur.com/dUKwBZw.png)


眼尖的邦友 , 肯定已發現了 TitleBar.vue 並不是整條都是 `-webkit-app-region: drag;`  
那是因為：

```
### Context menu
On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.
```
(上方官網上的某段提醒)

大意就是 , 在 windows 上如果是 draggable + frameless window 的區塊 ,  
此區塊將不會有 dom 的特性 , 而是由 windows 管理此區塊的功能

舉個例子： 

input tag 的原本功能可以點選後可輸入文字 , 在區塊內 , 會變成點不到 input 元素 

![](https://i.imgur.com/bilLKhY.gif)

因此 TitleBar.vue 不能整條都是 `-webkit-app-region: drag;`

## 題外話 

如果覺得自己設計標題列很麻煩 , 可以使用 [custom-electron-titlebar](https://github.com/AlexTorresSk/custom-electron-titlebar) 套件 ,  
快速產生自己喜歡的 `title-bar`

## 參考資料

- [electron 官方文件 - 無框視窗](https://www.electronjs.org/docs/api/frameless-window)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```