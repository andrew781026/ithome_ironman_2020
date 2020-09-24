# [ Day 32 ] - auto-launch

可以使用 auto-launch 套件 , 讓 應用程式 做開機啟動

範例 : 
```javascript
const electron = require("electron")

electron.app.setLoginItemSettings({
    openAtLogin: arg.settings.startOnStartup,
    path: electron.app.getPath("exe")
});
```
---

> Load auto-launch module:

```javascript
const AutoLaunch = require('auto-launch');
```

> Then add this after app.on('ready', ()=>{:

```javascript
let autoLaunch = new AutoLaunch({
    name: 'Your app name goes here',
    path: app.getPath('exe'),
});

autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();    
});
```


## 參考資料

- [How to use auto-launch to start app on system startup?](https://stackoverflow.com/questions/46318177/how-to-use-auto-launch-to-start-app-on-system-startup)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```

