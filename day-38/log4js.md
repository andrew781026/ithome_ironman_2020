# [ Day 40 ] - Log4JS 記錄下所有發生的錯誤

當我們將安裝檔交給客戶安裝後 , 有時可能發生一些 BUG ,

那我們要如何將 BUG 的當下狀態記錄下來 , 以避免客戶詢問時 ,

我們完全不知道發生了什麼事情 , 完全不知從何開始 debug ,

導致客戶信心全無 , 不再使用我們的產品呢 ╥﹏╥

我們需要引進 "日誌系統"([log4JS](https://www.npmjs.com/package/log4js)) 來將出錯的訊息 , 寫入到檔案中 ,

如果客戶問我們為何出錯時 , 我們就可以用 .log 檔進行分析 , 找出錯誤 (＾ω＾)

---

## 為何我們需要日誌系統 ?

一般工程師開發的時候 , 都會有一個 console 顯示目前的執行狀況與錯誤訊息

但是 , 當我們將程式打包出去給其他人使用時 , 我們不可能讓使用者看到那個黑黑的 console 視窗

所以 , 我們會需要將程式碼中的 console.log 與 console.error 全部清除

可是 , 使用者反應程式碼出錯時 , 我們需要使用 "錯誤訊息" 來輔助我們 DEBUG 啊!

這時 , 我們就可以使用日誌系統 , 將 "執行訊息" 與 "錯誤訊息" 寫入到 .log 檔案中 , 以利我們之後 DEBUG 使用 （＾ｖ＾）

下面 , 使用一個 JS 中好用的 "日誌系統" - [winston](https://www.npmjs.com/package/winston) 吧 (^-^*)/

---

## Log4JS 基礎概念

Log4JS 由 3 個東西所組成 appender . category . level

- appender : 輸出目標
- category : 綁定 level 跟輸出目標
- level : log 的輸出等級 , 在呼叫時指定 , 於 category 決定輸出目標

![](https://i.imgur.com/BrVsXlo.png)

舉例說明 - 

```javascript
const log4js = require("log4js");
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});
 
const logger = log4js.getLogger("cheese");
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
```

### 各功能詳細解說

#### Level - 等級

logger 會根據不同的等級 , 對應輸出

![](https://i.imgur.com/vLk1WLl.png)

#### appender - 輸出器

```javascript
const appenders = {
  appender_name: { 
      type: "file", 
      filename: "app.log" 
  } 
};
```

appender 由下方幾個部分組成

| 參數名 | 說明 | 參數值 |
| -------- | -------- | -------- |
| type     | 類型     | Text     |

- categoryFilter - 
- console - 輸出到 console
- dateFile - 輸出到每日分割的檔案
- file - 輸出到檔案
- fileSync - 與檔案同步
- [logLevelFilter](https://log4js-node.github.io/log4js-node/logLevelFilter.html) - 等級篩選器 ( 用於 1 level 需要做多種 appender 輸出使用 )
- [multiFile](https://log4js-node.github.io/log4js-node/multiFile.html) - 輸出到多個檔案
- [multiprocess](https://log4js-node.github.io/log4js-node/multiprocess.html) - 
- [recording](https://log4js-node.github.io/log4js-node/recording.html) - 輸出到記憶體中 ( 利用 recording.replay() 可查看內容 )
- [stderr](https://log4js-node.github.io/log4js-node/stderr.html) - This appender writes all log events to the standard error stream.
- [stdout](https://log4js-node.github.io/log4js-node/stdout.html) - This appender writes all log events to the standard output stream. It is the default appender for log4js.
- [tcp](https://log4js-node.github.io/log4js-node/tcp.html) - 輸出到 TCP server ?
- [tcp-server](https://log4js-node.github.io/log4js-node/tcp-server.html) - 輸出到 TCP server ?



 cheese: { type: "file", filename: "cheese.log" } 

#### 如果我希望每次改變 config 檔時 , 重新加載 log4JS 的配置 , 我需要如何處理呢 ?

1. 利用 nodemon watcher 監控 , log4JS 配置檔
2. 使用 log4JS.shutdown 暫時關閉 log4JS 的運作
3. 利用 log4JS.config({ ... }) 再次開啟 log4JS 
4. 之後我們就可以 reload log4JS config after file change 了 (^.^) /

## 參考資料

- [Node.js 日誌系統 log4js 介紹](https://www.itread01.com/content/1543939339.html)
- [log4js-node FAQ](https://log4js-node.github.io/log4js-node/faq.html)
- [winston 官方文件](https://www.npmjs.com/package/winston)
- [log4js 官方文件](https://www.npmjs.com/package/log4js)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
