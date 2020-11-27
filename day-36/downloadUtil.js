const download = require('download');
const fs = require('fs');

const fileDownload = (url, dest) => {

    let downloadedLength = 0;
    const writeStream = fs.createWriteStream(dest);
    writeStream.on("finish", () => console.log('you success download the video'));
    writeStream.on("error", err => console.error(err));

    // duplexStream is a Promise & EventEmitter
    const duplexStream = download(url);

    duplexStream.on('response', res => {
        const totalLength = res.headers['content-length'];

        res.on('data', data => {
            downloadedLength += data.length;
            duplexStream.emit('got-data', {data, downloadedLength, totalLength});
        });
    });

    duplexStream.on("error", err => console.error(err));

    duplexStream.pipe(writeStream);

    // duplexStream.pause();  // 下載暫停
    // duplexStream.resume(); // 下載繼續
    return duplexStream;
}

module.exports = fileDownload;