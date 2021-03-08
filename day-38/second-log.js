// second-log.js

// 刪除 .log 檔存放的資料夾 second
const fs = require('fs');
fs.rmdirSync('second', {recursive: true});

// 引用 winston
const winston = require('winston');

// 建立 logger
const logger = winston.createLogger({
  // 設定此 logger 的日誌輸出器
  transports: [
    new winston.transports.File({filename: 'second/silly.log', level: 'silly'}),
    new winston.transports.File({filename: 'second/debug.log', level: 'debug'}),
    new winston.transports.File({filename: 'second/verbose.log', level: 'verbose'}),
    new winston.transports.File({filename: 'second/http.log', level: 'http'}),
    new winston.transports.File({filename: 'second/info.log', level: 'info'}),
    new winston.transports.File({filename: 'second/warn.log', level: 'warn'}),
    new winston.transports.File({filename: 'second/error.log', level: 'error'}),
  ],
});

logger.add(new winston.transports.Console({
  level: 'silly',
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
logger.log('error', '~~ERROR~~');
