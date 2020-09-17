# [ Day 17 ] - 動物聊天室(十) - 上傳圖片與儲存圖片

昨日介紹了 Dialog 的基本使用 , 今天我們來將 Dialog 與 "動物聊天室" 做結合吧 !

> 第一個追加的功能是 "上傳圖片"

我們預計按下 ![](https://i.imgur.com/F7fN8hl.png) 後 , 讓使用者選擇一個圖片檔 , 然後將選擇的圖片存到 firestore 中

流程 :   
1.點擊 ![](https://i.imgur.com/F7fN8hl.png) 觸發 @click
2.用 dialog.showOpenDialog 讓使用者選擇一個圖片檔
3.將選擇的圖片轉成 base64 字串 
4.將 base64 字串存到 firestore 中  

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
