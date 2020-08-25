# 第三天 - 用 electron-builder 打包應用程式給其他人 

昨天我們製作了可愛的小貓應用程式 , 我們當然希望分享給其他人這可愛的小貓 , 
可是我們不可能強求其他人知道如何使用 npm 指令去執行這隻應用程式對吧 !

> cli . programmer-api 可以介紹兩種方式 

這時我們需要 electron-builder 來幫我們打包 electron 軟體變成 .exe 檔案 , 之後我們就可以將此安裝檔分享給其他人安裝了 !

我們可以更改打包後的 ICO 圖示 , 在 windows 上 icon 需要使用 256*256 以上的 png 檔案當作 Icon

![](https://i.imgur.com/wQiuRNd.png)

第一次打包時 , 會從 electron-builder 的官網上下載一些打包工具 , 需要等一段時間下載這些工具

![](https://i.imgur.com/r1GQjSs.png)

### 打包 Windows 應用程式 

[一個意外]
當初以為資料夾中的檔案 , 可以直接 zip 起來 , 然後當綠色軟體給其他人使用 
結果 , 在沒有安裝 Node.js 的電腦上打開後 , 產生無限開啟的現象

(坑) 不要把資料夾的檔案當成綠色軟件 zip 給別人 , 當其他人的電腦中沒有安裝 Node.js 時 , 你會的到無限開啟的應用程式

[無限開啟的圖片]

之後我才發現要打包 portable 軟體 , 
需要將 target 從 nsis 改成 portable 這時會多一個 .exe 檔案 , 
你可以將此 exe 檔案分享給別人 , 其他沒有安裝 Node.js 的機器才能正常使用此應用程式

### 打包 Mac 應用程式 

我們需要 [png-to-icns](https://cloudconvert.com/png-to-icns)


### 打包 Linux 應用程式 

## 參考資料

- [electron-builder 官方文件](https://www.electron.build/)
