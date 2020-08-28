# 第四天 - 右鍵選單 ( context-menu )

原本今天要討論 , 右鍵選單 ( context-menu ) , 
在官網上發現一個不幸的消息 , 
在 win 10 中 frame = false , zone = draggable 的區塊 , 
預設的 DOM 事件會被取代成系統 ( win 10 ) 預設的右鍵選單
 ( 說人話 : 右鍵選單 . 左鍵雙擊 ...等操作會被替換成下方選單 )

![系統右鍵選單](https://i.imgur.com/n4yGWqy.png)

所以 , 我們需要追加 "拖曳條" , 並且改成只有拖曳條才能被拖曳 , 這樣我們就可以在小貓圖案上自定義右鍵選單

使用 frame = false , 是自製一個 drag-bar 

新增一個 div block 當作 drag-bar 使用
```html
<body class="mt-30 draggable">
+ <div id="drag-bar" class="drop-bar">拖曳條</div>
<img id="img" src="playing-cat-loop.gif">
</body>
```

![](https://i.imgur.com/nOT36mm.png)


預設的 "拖曳條" 不太好看 , 新增 index.css , 裝飾一下 drag-bar 
```css
.drag-bar {
    -webkit-app-region: drag;
    background-color: #636363;
    color: #eeeeee;
    padding: 3px;
    width: 100vw;
    font-size: 30px;
    min-height: var(--title-bar-height);
}
```

![](https://i.imgur.com/Ud2WyTD.png)

拖曳條 左方有一塊留白 , 這是由於 body 預設的 margin : 8px 造成的 , 
我們把 body 的 margin 調整成 0 

```css
body {
    margin : 0
}
```

![body margin 0](https://i.imgur.com/BNiQIFv.png)

下方跑出一個 scrollbar , 造成這的原因是我們 drag-bar 設定 padding : 3px & width : 100vw ,
最終 ,  drag-bar 的總長度為 100vw + 3px * 2 = 100vw + 6px , 
我們可以設定 `box-sizing: border-box;` 讓 padding 不影響元素的總長度

```css
* {
    box-sizing: border-box;
}
```

![box-sizing: border-box](https://i.imgur.com/a8VtMJZ.png)


有時會忘記貓咪不能拖曳的 , 造成出現 `幽靈圖片(ghost image)` ( 如下圖所示 ) , 
如果想讓 ghost image 不要出現 , 
就需要在 index.html 中的 img 上追加 `draggable="false"` 屬性 ,
之後 , ghost image 就不會出現

![貓咪圖片可拖曳](https://i.imgur.com/1bC0dfM.png)



## 完整程式



## 參考資料

- [electron-builder 官方文件](https://www.electron.build/)
- [Electron 无边框窗口的拖动](https://sin.pub/blog/electron-frameless-drag/)
- [windowMouseOutFix.js](https://gist.github.com/louisameline/1213bb112c6cb12a98b2ab525dfb8b07)