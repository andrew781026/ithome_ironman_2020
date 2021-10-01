# [day-39] 模擬 vscode 建立 Terminal 工具

關鍵套件：
- [node-pty](https://github.com/microsoft/node-pty) - 將輸入的指令往系統 cmd 執行，並回傳執行結果
- [Xtrem.js](https://xtermjs.org/) - 將執行的結果顯示出來

## 安裝

```shell
npm i -s node-pty 
```

有可能出現 `Cannot find module 'D:\test\ithome_ironman_2020\--day-43\node_modules\node-pty\node C:\Users\andrew\AppData\Roaming\npm\node_modules\node-gyp\bin\node-gyp.js'`

如何處理呢 ? 

```shell
# run as admin 
npm install --global --production windows-build-tools
```

![](https://i.imgur.com/FcYxzhl.png)

```shell
npm config set node_gyp "node C:\Users\me\AppData\Roaming\npm\node_modules\node-gyp\bin\node-gyp.js"
```

### 在 Electron 中 , 如何使用 Xtrem.js ?

你需要搭配 `node-pty` 來使用

## 參考資料 

- [How do I connect xterm.js(in electron) to a real working command prompt?](https://stackoverflow.com/questions/63390143/how-do-i-connect-xterm-jsin-electron-to-a-real-working-command-prompt)
- [Making a terminal in Electron.js with node-pty and xterm.js](https://www.youtube.com/watch?v=vhDBbbMJWoY)
- [electron-local-terminal-prototype](https://github.com/77Z/electron-local-terminal-prototype)
- [xterm.js](https://github.com/xtermjs/xterm.js/)
