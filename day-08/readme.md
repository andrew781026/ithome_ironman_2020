# [ Day 8 ] - 動物聊天室(一) - vue 與 electron 

在第三天的時候 , 本魯提過官網上的介紹

> Electron 架構在 Chromium 及 Node.js 上，讓你可以用 HTML、CSS 和 JavaScript 打造自己的應用程式。

既然 Electron 是用  HTML、CSS 和 JavaScript 來打造應用程式 , 那我們就將前端框架 vue 與 electron 做整合 , 讓我們的 electron 與流行的 vue 框架搭上邊 

> 第一步 , 下載 @vue/cli

```shell script
# 全域安裝 @vue/cli
$ npm install -g @vue/cli
```

> 第二步 , 利用 @vue/cli 的 `vue ui` 新建一個全新的專案 , 

```shell script
# 啟動 Vue 專案管理器
$ vue ui
```

詳細的步驟與說明 , 請參考邦友的文章 [Vue cli 3 UI安裝介面及項目結構介紹](https://ithelp.ithome.com.tw/articles/10223226)

> 第三步 , 追加 electron 功能

```shell script
# 在 vue 專案中追加 electron 功能
$ vue add electron-builder
```
跑完 `vue add electron-builder` 你會發現 src 資料夾中多一個 background.js ,   
這 background.js 就是 electron 的 main process 等同於我們之前的 main.js 檔案

如果觀察 package.json 檔案 , 你可以發現多了一些 script 可用

![](https://i.imgur.com/EOZmzEj.png)

如果你要 `打包你的應用程式 , 產生安裝檔或免安裝檔` 請執行

```shell script
# 打包你的應用程式 , 產生安裝檔或免安裝檔
$ npm run electron:build
```

如果你要 `用開發模式執行 electron 應用程式` 請執行

```shell script
# 用開發模式執行 electron 應用程式
$ npm run electron:serve
```

執行 `npm run electron:serve` 當你看到下方畫面 , 恭喜你整合了 vue 與 electron ![thumb-man](https://ithelp.ithome.com.tw/images/emoticon/emoticon12.gif)

![](https://i.imgur.com/gAmedNK.png)

## 接下來的目標

本魯預計將 [F2E 前端精神時光屋](https://challenge.thef2e.com/works/engineer?stage=7&orderBy=created_at&sort=desc&page=3) 中的 [聊天室](http://zongweili.site/f2e7week/#/) 當作目標製作出一個 electron 應用程式

![](https://i.imgur.com/tAJHsSc.png)
[ 圖片來源 : http://zongweili.site/f2e7week/#/ ]

本魯目前不清楚會花幾天來製作 `動物聊天室` , 不過我會盡力完成 ![ithome-fight](https://ithelp.ithome.com.tw/images/emoticon/emoticon18.gif)


## 參考資料

- [第二屆 F2E 前端精神時光屋 - 第七週](https://challenge.thef2e.com/works/engineer?stage=7&orderBy=created_at&sort=desc&page=3)
- [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html)

```
感謝 `六角學院` 舉辦 [F2E 前端精神時光屋](https://challenge.thef2e.com/) 讓我這個美術不及格的工程師 , 可以使用設計師設計好的素材 , 來製作一個美美的應用程式

如果想要製作不同風格的聊天室 , 可自行前往 [F2E 前端精神時光屋 - 第七週_聊天室](https://challenge.thef2e.com/works/uiux?stage=7&orderBy=created_at&sort=desc) 選擇想要的版型 
```