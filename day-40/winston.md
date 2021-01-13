# [ Day 40 ] - winston 記錄下發生的錯誤

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

下面 , 讓我們好好了解一下這位護肝使者 - [winston](https://www.npmjs.com/package/winston) 吧 (^-^*)/

---

## winston 介紹

`winston` 是由 Transport 與 level 所組成的一個 JS 日誌套件

- Transport : 輸出器
- level : 日誌的輸出等級

下方來一個簡易的範例 -

```javascript
// src/winston.js
const winston = require('winston');
 
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

上方程式執行後 , 會在同層目錄中產生 `error.log` 與 `combined.log` 兩個檔案

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

我們可以很明顯地觀察到雖然 logger.log 呼叫了 3 次 ,

conbined.log 檔中只有 2 筆資料 ,

這是因為 level 等級的不同 , 造成輸出的資料筆數不同 ,

我們常常會利用不同的 level 來將不同等級的資訊 , 紀錄在不同檔案中

## winston 詳細說明

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

下方為呼叫 logger.log 的一些範例程式碼

```javascript
//
// Any logger instance
//
logger.log('silly', "127.0.0.1 - there's no place like home");
logger.log('debug', "127.0.0.1 - there's no place like home");
logger.log('verbose', "127.0.0.1 - there's no place like home");
logger.log('info', "127.0.0.1 - there's no place like home");
logger.log('warn', "127.0.0.1 - there's no place like home");
logger.log('error', "127.0.0.1 - there's no place like home");
logger.info("127.0.0.1 - there's no place like home");
logger.warn("127.0.0.1 - there's no place like home");
logger.error("127.0.0.1 - there's no place like home");

//
// Default logger
//
winston.log('info', "127.0.0.1 - there's no place like home");
winston.info("127.0.0.1 - there's no place like home");
```

### Transport - 輸出器

下方為官方預設提供的 Transport 可能需要按照 `邦友` 需要做選用

- [Built-in to winston](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#built-in-to-winston)
  - [Console](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#console-transport)
  - [File](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#file-transport)
  - [Http](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#http-transport)
  - [Stream](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#stream-transport)

- [Maintained by winston contributors](https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#maintained-by-winston-contributors)
  - [DailyRotateFile](https://github.com/winstonjs/winston-daily-rotate-file)
  - [MongoDB](https://github.com/winstonjs/winston-mongodb)
  - [Syslog](https://github.com/winstonjs/winston-syslog)

### 未完待續...

## 參考資料

- [winston 官方文件](https://www.npmjs.com/package/winston)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
