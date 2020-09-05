# 第六天 - 股票查價(五) - 更換貓咪圖片

### dialog
> 顯示系統原生對話框，以便開啟檔案、儲存檔案，發出警告等。

使用 dialog 
- showOpenDialog : 選擇圖片位置

```javascript
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

- showSaveDialog : 選擇檔案儲存位置


- showMessageBox : 訊息框

type String (optional) - Can be "none", "info", "error", "question" or "warning". On Windows, "question" displays the same icon as "info", unless you set an icon using the "icon" option. On macOS, both "warning" and "error" display the same warning icon.

- showErrorBox : 錯誤提示框
- showCertificateTrustDialog : 憑證確認框


showOpenDialog, showOpenDialogSync, showSaveDialog, and showSaveDialogSync will return a bookmarks array.

#### 額外說明

在 macOs 上 , 處理 dialog 可能需要多做一些事 

On macOS, dialogs are presented as sheets attached to a window 

## 參考資料

- [electron 官方文件 - dialog](https://www.electronjs.org/docs/api/dialog)
