const download = require('download');
const fs = require('fs');

function throttle(func, threshhold = 250) {
    var last, timer;
    return function () {
        var context = this
        var args = arguments
        var now = +new Date()
        if (last && now < last + threshhold) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                func.apply(context, args)
            }, threshhold)
        } else {
            last = now
            func.apply(context, args)
        }
    }
}

const fileDownload = (url, dest) => {

    let downloadedLength = 0;
    const writeStream = fs.createWriteStream(dest);
    writeStream.on("finish", () => console.log('you success download the video'));
    writeStream.on("error", err => console.error(err));

    // duplexStream is a Promise & EventEmitter
    const duplexStream = download(url);

    // 限制每 0.5 秒至多執行 1 次
    const throttleFunc = throttle(func => func(), 500);

    duplexStream.on('response', res => {
        const totalLength = res.headers['content-length'];

        res.on('data', data => {
            downloadedLength += data.length;

            // 因為 duplexStream 是 EventEmitter 所以 emit channel : "got-data"
            throttleFunc(() => duplexStream.emit('got-data', {data, downloadedLength, totalLength}));
        });
    });

    duplexStream.on("error", err => console.error(err));

    duplexStream.pipe(writeStream);

    // duplexStream.pause();  // 下載暫停
    // duplexStream.resume(); // 下載繼續
    return duplexStream;
}

module.exports = fileDownload;