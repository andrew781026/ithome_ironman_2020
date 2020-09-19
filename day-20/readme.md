# [ Day 20 ] - 動物聊天室(十一) - 聊天訊息通知

原生檔案拖放
Certain kinds of applications that manipulate files might want to support the operating system's native file drag & drop feature. Dragging files into web content is common and supported by many websites. Electron additionally supports dragging files and content out from web content into the operating system's world.

To implement this feature in your app, you need to call webContents.startDrag(item) API in response to the ondragstart event.

In your renderer process, handle the ondragstart event and forward the information to your main process.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

## 參考資料

- [electron 官方文件 - 原生檔案拖放](https://www.electronjs.org/docs/tutorial/native-file-drag-drop)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
