# [ Day 14 ] - 動物聊天室(七) - 客製化標題列  

不知道邦友們覺得 electron 在 windows 上的標題列覺得如何 ?

![](https://i.imgur.com/bgzX1pi.png)  

本魯覺得預設的標題列有些死板 , 所以今天動手進行客製化`標題列`  


## 備註

下方為官網上的備註 

### Context menu
On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.

大意就是 , 在 windows 上如果是 draggable + frameless window 的區塊 ,  
此區塊將不會有 dom 的特性 , 而是由 windows 管理此區塊的功能

例如 : 

在瀏覽器中 , 右鍵可由 document.addeventlistener('contextmenu' 來控制右鍵選單的呈現與否

```javascript
noContext = document.getElementById('noContextMenu');

noContext.addEventListener('contextmenu', e =>  e.preventDefault());
```

## 題外話 

如果覺得自己設計標題列很麻煩 , 可以使用 [custom-electron-titlebar](https://github.com/AlexTorresSk/custom-electron-titlebar) 套件 ,  
快速產生自己喜歡的 `title-bar`

## 參考資料

- [electron 官方文件 - 無框視窗](https://www.electronjs.org/docs/api/frameless-window)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```