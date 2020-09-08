# [ Day 6 ] - 桌面小圖示(五) - 用 electron-builder 打包應用程式給其他人 

如果昨天沒有做出來 , 可以從 [第 5 天成品](https://github.com/andrew781026/ithome_ironman_2020/tree/master/day-05) 然後用 `npm start` 看到許多的貓咪 ![haha-man](https://ithelp.ithome.com.tw/images/emoticon/emoticon39.gif)

-----

當我們製作完成可愛的小貓應用程式 , 我們當然希望分享給其他人這可愛的小貓 , 
可是我們不可能強求其他人知道如何使用 npm 指令去執行這隻應用程式對吧 !

因此我們需要將應用程式打包 , 之後將 .exe 分享給其他人

以下我們使用 `electron-builder` 作為我們的打包工具 

### 打包 Windows 應用程式 

我們拿 [第 2 天成品](https://github.com/andrew781026/ithome_ironman_2020/tree/master/day-02) 來打包 

> 下載 `electron-builder`

```shell script
# 下載 electron-builder 套件
$ npm i -D electron-builder
```

> 追加一個 build.js 用於打包應用程式 

```javascript
const path = require('path');
const builder = require('electron-builder');

builder.build({

    projectDir: path.resolve(__dirname),  // 專案路徑 

    win: ['nsis', 'portable'],  // nsis . portable
    config: {
        "appId": "com.andrewdeveloper.electron.cat",
        "productName": "小貓玩耍", // 應用程式名稱 ( 顯示在應用程式與功能 )
        "directories": {
            "output": "build/win"
        },
        "win": {
            "icon": path.resolve(__dirname, 'cat.png'),
        }
    },
})
    .then(
        data => console.log(data),
        err => console.error(err)
    );
```

> 執行 build.js 

```shell script
# 執行 build.js 
$ node build.js 
```

第一次打包時 , 會從 electron-builder 的官網上下載一些打包工具 , 需要等一段時間下載這些工具 ( 可能需要等待 1 個小時 )

![](https://i.imgur.com/r1GQjSs.png)

打包完成後 , 在專案跟目錄中 , 會多出一個 build 資料夾 , 當中會有打包出來的 .exe 檔


我們可以將 `小貓玩耍 Setup 0.0.2.exe` 檔案分享給別人 , 讓人安裝 `小貓玩耍` 這個應用程式

![](https://i.imgur.com/tUZ2TWN.png)

安裝完成後 , windows 中的 `應用程式與功能` 可以看到這個應用程式

![](https://i.imgur.com/1dbE0Iv.png)

如果對方電腦沒有安裝 .exe 的權限 , 我們可以將 `小貓玩耍 0.0.2.exe` 分享給別人 , 這是一個免安裝軟體

![](https://i.imgur.com/ZW0bniV.png)

### 備註

我們可以更改打包後的 ICO 圖示 , 

但是 windows 上的 icon 需要使用 256*256 以上的 png 檔案當作 Icon , 不然打包時會出現以下錯誤 

![](https://i.imgur.com/wQiuRNd.png)

### 一個意外

打包結束後 , 會多出一個 build 資料夾 

![](https://i.imgur.com/wAZ31ML.png)

其中有一個 win-unpacked 的資料夾 , 最初我以為直接 zip 起來 , 可以當免安裝軟體給其他人使用 

結果 , 在沒有安裝 Node.js 的電腦上打開後 , 產生無限開啟的現象

(坑) 不要把資料夾的檔案當成免安裝軟體 zip 給別人 , 當其他人的電腦中沒有安裝 Node.js 時 , 

你會的到無限開啟的應用程式 , 也就是滿坑滿谷的貓咪 , ( 貓奴OS : 好像挺幸福的 \^_^/ )

![](https://i.imgur.com/phjIT0O.png)

之後我才發現要打包成綠色軟體 , 
需要將 target 從 nsis 改成或多加 portable 這時會多一個 [檔名_版本].exe 檔案 , ![檔名_版本.exe](https://i.imgur.com/cdfuwIu.png)
你可以將此 exe 檔案分享給別人 , 其他沒有安裝 Node.js 的機器才能正常使用此應用程式 ,
上述的 .exe 檔才是真的綠色軟體 [冏]

## 參考資料

- [electron-builder 官方文件](https://www.electron.build/)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
