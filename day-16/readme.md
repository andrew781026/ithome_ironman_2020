# [ Day 16 ] - 動物聊天室(九) - Dialog 介紹

## Dialog

> 顯示系統原生對話框，以便開啟檔案、儲存檔案，發出警告等。

Electron 內建有 5 種 dialog

| Dialog 類型              | 樣式      |
| ----------------------- | -------- | 
| openDialog              | ![openDialog](https://i.imgur.com/mfVPC05.png)     | 
| saveDialog              | ![saveDialog](https://i.imgur.com/odvfZ1g.png)     | 
| messageBox              | ![messageBox](https://i.imgur.com/gJAVspT.png)     | 
| errorBox                | ![errorBox](https://i.imgur.com/4XRC36Z.png)     | 
| certificateTrustDialog  | ( 本魯沒試出來 , 可能需要邦友自行試驗 )    | 

> 下方範例 , 說明各類型的 dialog 如何使用 

- dialog.showOpenDialog

```javascript
dialog.showOpenDialog({
        filters: [
            {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
            {name: 'Custom File Type', extensions: ['as']},
            {name: 'All Files', extensions: ['*']}
        ],
        properties: ['openFile', 'multiSelections'] // if you set both , on windows it will only show openDirectory dialog
    })
        .then(result => {
            console.log(result.canceled)
            console.log('filePaths=', result.filePaths)
        })
        .catch(err => {
            console.log(err)
        });
```

- dialog.showSaveDialog

```javascript
dialog.showSaveDialog({

        title: '儲存圖片',  // dialog 標題
        buttonLabel: '是', //  label for the confirmation button
        defaultPath: 'D:\\test\\ithome_ironman_2020', // dialog 的預設路徑

    })
        .then(result => {

            if (result.canceled) console.log('使用者關閉 SaveDialog')
            else {

                console.log(result.filePath)
                // create a file

            }

        })
        .catch(err => {
            console.log(err)
        });
```

- dialog.showMessageBox

```javascript
dialog.showMessageBox({
    title: '提示框',
    message: '這是提示框的內容訊息',
});
```


- dialog.showErrorBox

```javascript
dialog.showErrorBox('錯誤訊息', '您的貓咪主人禁止您進入');
```

## 檔案亂碼

如果選擇的檔案名稱出現亂碼

```shell script
filePaths = [
  'C:\\Users\\andrew\\Desktop\\Hahow隤脩?蝞∠???rp',
  'C:\\Users\\andrew\\Desktop\\?血???? 閮剛?.rp'
]
```

可在 `npm start` 跑的 scrpit 之前多加 `chcp 65001 && `

```diff
// in package.json
"scripts": {
-   "start": "electron ."
+   "start": "chcp 65001 && electron ."
},
```

之後檔名就可以正常顯示

```shell script
filePaths = [
  'C:\\Users\\andrew\\Desktop\\Hahow課程管理器.rp',
  'C:\\Users\\andrew\\Desktop\\瓦城候餐區設計.rp'
]
```


## 參考資料

- [electron 官方文件 - Dialog](https://www.electronjs.org/docs/api/dialog#dialogshowerrorboxtitle-content)
- [electron 控制台打印乱码问题](https://blog.csdn.net/qq_34803821/article/details/95101595)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```