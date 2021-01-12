# [ Day 40 ] - Log4JS 記錄下所有發生的錯誤

當我們將安裝檔交給客戶安裝後 , 有時可能發生開發時 , 我們預想外的事情 , 

讓

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


#### 如果我希望每次改變 config 檔時 , 重新加載 log4JS 的配置 , 我需要如何處理呢 ?

1. 利用 nodemon watcher 監控 , log4JS 配置檔
2. 使用 log4JS.shutdown 暫時關閉 log4JS 的運作
3. 利用 log4JS.config({ ... }) 再次開啟 log4JS 
4. 之後我們就可以 reload log4JS config after file change 了 (^.^) /

## 參考資料

- [Node.js 日誌系統 log4js 介紹](https://www.itread01.com/content/1543939339.html)
- [log4js-node FAQ](https://log4js-node.github.io/log4js-node/faq.html)


```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
