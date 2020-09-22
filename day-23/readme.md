# [ Day 23 ] - 動物聊天室(十五) - 拖曳圖片 (上傳與下載)

#### contents.startDrag(item)
- item Object
  - file String[] | String - The path(s) to the file(s) being dragged.
  - icon NativeImage | String - The image must be non-empty on macOS.

Sets the item as dragging item for current drag-drop operation, file is the absolute path of the file to be dragged, and icon is the image showing under the cursor when dragging.

---

// electron drag-and-drop 
https://gist.github.com/timpulver/452670e4a0ec9619a06347ff61c3f60c

https://stackoverflow.com/questions/39506154/drag-html-element-outside-electron-window-to-copy-local-file

when you drop outside the BrowserWindow , you need to save the image to folder had set 


```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
