# 第七天 - 股票到價通知(一) - later.js 介紹 & 使用

open-to-start 系統起動時 , APP 一同啟動

https://stackoverflow.com/questions/46318177/how-to-use-auto-launch-to-start-app-on-system-startup

```javascript
const AutoLaunch = require('auto-launch');

// Then add this after app.on('ready', ()=>{:
  let autoLaunch = new AutoLaunch({
    name: 'Your app name goes here',
    path: app.getPath('exe'),
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });
```

```javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```


如果註冊成功 , 你可以在 "登入編輯程式" 中看到

如何叫出 "登入編輯程式" - win + R => 輸入 regedit

`auto-launch` add a registry entry under \HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run

![](https://i.imgur.com/dTNHNZ5.png)


使用開發模式註冊時 , 它會註冊 node_module 中的 electron.exe 檔案 , 重開機後 windwos 會自動開啟 electron 

所以重開機後會長這樣

![](https://i.imgur.com/1paLuhJ.png)