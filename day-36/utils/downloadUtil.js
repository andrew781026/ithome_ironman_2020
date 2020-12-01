const download = require('download');
const fs = require('fs');
const _ = require('lodash');

const fileDownload = (url, dest) => {

  // duplexStream is a Promise & EventEmitter
  const duplexStream = download(url);

  let downloadedLength = 0;
  const writeStream = fs.createWriteStream(dest);

  // 完成寫入檔案到指定位置
  writeStream.on("finish", () => duplexStream.emit('write-finish'));

  // 寫入檔案出錯時
  writeStream.on("error", err => duplexStream.emit('write-error', err));

  // 限制每 0.5 秒至多執行 1 次
  const throttleFunc = _.throttle(func => func(), 500);

  duplexStream.on('response', res => {
    const totalLength = res.headers['content-length'];

    res.on('data', data => {
      downloadedLength += data.length;

      // 因為 duplexStream 是 EventEmitter 所以 emit channel : "got-data"
      const params = {data, downloadedLength, totalLength};
      throttleFunc(() => duplexStream.emit('got-data', params));
    });
  });

  duplexStream.on("error", err => console.error(err));

  duplexStream.pipe(writeStream);

  // duplexStream.pause();  // 下載暫停
  // duplexStream.resume(); // 下載繼續
  return duplexStream;
}

module.exports = fileDownload;
