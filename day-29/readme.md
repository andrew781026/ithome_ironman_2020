# [ Day 29 ] - 桌面小圖示(六) - 開機啟動應用程式 

Slack . Teams 可以在開機時 , 開啟應用程式到 Tray 那是如何做到的 ?

如果我們想要開機時，讓應用程式自動開啟，人工的方式可以將應用程式放到啟動資料夾，  
那程序的方式該如何做到呢 ? 

### auto-launch

Auto-launch your app on login.

### `auto-launch` 如何運作 ?

它會將你的應用程式註冊到 `機碼` 中的 `\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run` 
讓 Windows 登入時 , 自動開啟你的應用程式 ,

本魯的筆電中有安裝 Teams & Slack 在實作之前 , 讓我們來看一下機碼吧

Windows + R -> regedit -> 啟動 `登入編輯程式`

![](https://i.imgur.com/rmrATx6.png)

我們可以看到 Slack 與 Teams 都有註冊登入的機碼 , 所以開機時他們會自動啟動 APP   

下面 , 我們用 [day-06](https://ithelp.ithome.com.tw/articles/10234399) 接著做出開機啟動的 APP

## 實作 GO 

> 第一步 , 當然是安裝 & 引用 auto-launch

用 npm 安裝 auto-launch

```shell script
$ npm i -s auto-launch
```

然後 , 引用它

```diff
// on the top of main.js
const {app, BrowserWindow} = require('electron');
const path = require('path');
+ const AutoLaunch = require('auto-launch');
```

> 第二步 , 在 APP 開啟第一次時 ( app.on('ready' ) , 使用 AutoLaunch

```javascript
app.on('ready', () => {

    createWindow();

    // add below to app ready     
    let autoLaunch = new AutoLaunch({
        name: '小貓玩耍',
        path: app.getPath('exe'),
    });
    
    autoLaunch.isEnabled().then((isEnabled) => {
        if (!isEnabled) autoLaunch.enable();
    });
})
```

> 第三步 , 打包應用程式與查看機碼確認 ＼(★^∀^★)／

```shell script
$ npm run build
```

使用 `小貓玩耍 Setup 0.0.29.exe` 做安裝 

![](https://i.imgur.com/JyLx4sZ.png)

![](https://i.imgur.com/nH6Vo3C.png)

太好了 `⁽⁽ ◟(∗ ˊωˋ ∗)◞ ⁾⁾` 我們有開機自動顯示的 "小貓" (★^O^★)

## 參考資料

- [auto-launch](https://www.npmjs.com/package/auto-launch)
- [how-to-use-auto-launch-to-start-app-on-system-startup](https://stackoverflow.com/questions/46318177/how-to-use-auto-launch-to-start-app-on-system-startup)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
