# [ Day 38 ] - winston 記錄下發生的錯誤

## 常見的故事 ...

客戶 : 系統出錯了 , 可以幫忙修一下嗎 【・ヘ・?】

工程師 : 我這邊看起來很正常啊 ! 系統沒有問題吧 (￣▽￣)ノ

客戶 : 每天晚上要用的時候 , 系統都無法登入使用 (╯°Д°)╯ ┻━┻

工程師 : 現在還沒晚上 , 今天晚上再我幫你看看 ಠ◡ಠ

...經過了無數個夜晚 , 工程師終於找出了 BUG 並將其修改 , 但是客戶已經生氣離開了 (╥_╥)

---

## 為何我們需要日誌系統 ?

身為工程師 , 我們當然不希望每天晚上 , 燒肝處理這些 "系統出錯"

晚年需要吃 "人蔘" 來將 '小心肝' 給補回來 ,

既然這樣 , 我們就需要在出錯的時候 , 將錯誤訊息記錄下來 (๑•̀ㅂ•́)و✧

這時我們可以使用 "日誌系統" - [winston](https://www.npmjs.com/package/winston) 來進行處理 (^-^*)/

下面 , 讓我們好好了解一下這位護肝使者 - [winston](https://www.npmjs.com/package/winston) 吧 o(∩_∩)o

---

## winston 介紹

`winston` 是由 Transport 與 level 所組成的一個 JS 日誌套件

- Transport : 輸出器
- level : 日誌的輸出等級

### 初始範例

下方來一個簡易的範例 -

```javascript
// winston.js
const winston = require('winston');
 
// 建立 logger 
const logger = winston.createLogger({
  // 當 transport 不指定 level 時 , 使用 info 等級
  level: 'info',
  // 設定輸出格式
  format: winston.format.json(),
  // 設定此 logger 的日誌輸出器
  transports: [
    // 只有 error 等級的錯誤 , 才會將訊息寫到 error.log 檔案中
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // info or 以上的等級的訊息 , 將訊息寫入 combined.log 檔案中
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
 
// 在開發模式時 , 將 log 訊息多輸出到 console 中
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    // simple 格式 : `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    format: winston.format.simple(),
  }));
}

// 下方為呼叫 log 的各種方式 
logger.log('info', 'Hello winston (・∀・)ノ');
logger.error('Here we got an error (ノ﹏ヽ)');
logger.log({
  level: 'verbose',
  message: 'here you will get some verbose'
});
```

執行 `node winston.js` 後 , 會在同層目錄中產生 `error.log` 與 `combined.log` 兩個檔案

```
─ src
   ├─  error.log
   ├─  combined.log
   └─  winston.js
```

而且 `error.log` 與 `combined.log` 的檔案內容如下

- conbined.log

```
{"level":"info","message":"Hello winston (・∀・)ノ"}
{"message":"Here we got an error (ノ﹏ヽ)","level":"error","service":"user-service"}
```

- error.log

```
{"message":"Here we got an error (ノ﹏ヽ)","level":"error","service":"user-service"}
```

### 範例解說

我們來深入研究範例將其拆解一下

```javascript
const logger = winston.createLogger({ ... });
```

我們可以很明顯地觀察到雖然 logger.log 呼叫了 3 次 ,

conbined.log 檔中只有 2 筆資料 ,

這是因為 level 等級的不同 , 造成輸出的資料筆數不同 ,

我們常常會利用不同的 level 來將不同等級的資訊 , 紀錄在不同檔案中


## winston 參數說明

### level - 等級

winston 的日誌等級 , 參考了 npm 的分級制度 , 共分為 7 個等級

```
{ 
  error: 0, 
  warn: 1, 
  info: 2, 
  http: 3,
  verbose: 4, 
  debug: 5, 
  silly: 6 
}
```

那何時會輸出資訊給 Transport , 何時不會呢 ?

`數值小的會輸出給數值大的` , 下方為示意圖

![](https://i.imgur.com/udKYIhI.png)

也就是說 , 呼叫等級較小的 `log` 時 , 等級較大的 `Transport` 會輸出 logMsg 

```javascript
// second-log.js

// 刪除 .log 檔存放的資料夾 second
const fs = require('fs');
fs.rmdirSync('second', { recursive: true });

// 引用 winston
const winston = require('winston');

// 建立 logger 
const logger = winston.createLogger({
  // 設定此 logger 的日誌輸出器
  transports: [
    new winston.transports.File({ filename: 'second/silly.log', level: 'silly' }),
    new winston.transports.File({ filename: 'second/debug.log', level: 'debug' }),
    new winston.transports.File({ filename: 'second/verbose.log', level: 'verbose' }),
    new winston.transports.File({ filename: 'second/http.log', level: 'http' }),
    new winston.transports.File({ filename: 'second/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'second/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'second/error.log', level: 'error' }),
  ],
});

logger.add(new winston.transports.Console({
  // simple 格式 : `${info.level}: ${info.message} JSON.stringify({ ...rest })`
  format: winston.format.simple(),
}));

// 下方為呼叫 log 的各種方式 
logger.log('silly', "--SILLY--");
logger.log('debug', "++DEBUG++");
logger.log('verbose', "**VERBOSE**");
logger.log('http', "__HTTP__");
logger.log('info', "==INFO==");
logger.log('warn', "^^WARN^^");
logger.log('error', `~~ERROR~~`);
```

### Transport - 輸出器

下方為官方預設提供的 Transport 我們可以按照需求 , 使用不同的 Transport

- [Built-in to winston](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#built-in-to-winston)
  - [Console](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#console-transport)
  - [File](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#file-transport)
  - [Http](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#http-transport)
  - [Stream](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#stream-transport)

- [Maintained by winston contributors](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#maintained-by-winston-contributors)
  - [DailyRotateFile](https://github.com/winstonjs/winston-daily-rotate-file)
  - [MongoDB](https://github.com/winstonjs/winston-mongodb)
  - [Syslog](https://github.com/winstonjs/winston-syslog)



#### Console 

將訊息輸出到 Console 

```javascript
logger.add(new winston.transports.Console(options));
```

- level: Level of messages that this transport should log (default: level set on parent logger).
- silent: Boolean flag indicating whether to suppress output (default false).
- eol: string indicating the end-of-line characters to use (default os.EOL)
- stderrLevels Array of strings containing the levels to log to stderr instead of stdout, for example ['error', 'debug', 'info']. (default [])
- consoleWarnLevels : Array of strings containing the levels to log using console.warn or to stderr (in Node.js) instead of stdout, for example ['warn', 'debug']. (default [])

### 未完待續...

## 參考資料

- [winston 官方文件](https://www.npmjs.com/package/winston)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
