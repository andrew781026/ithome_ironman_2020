import {ipcMain} from 'electron';
import os from 'os';
import fs from 'fs';
import sharp from 'sharp';
import mime from "mime-types";

// 參考資料 : https://cythilya.github.io/2017/03/12/uuid/
function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

ipcMain.on('chatroom:img-dragstart', (event, imageData) => {

    const contentType = imageData.base64.split(';base64,')[0].replace('data:', '');
    const base64Image = imageData.base64.split(';base64,')[1];
    const ext = mime.extension(contentType);

    const tmpdir = os.tmpdir();
    const uuid = _uuid();
    const fileName = `image-${uuid}.${ext}`
    const filePath = tmpdir + fileName;
    fs.writeFileSync(filePath, base64Image, {encoding: 'base64'});

    const thumbnailName = `thumbnail-${uuid}.${ext}`
    const thumbnailPath = tmpdir + thumbnailName;

    sharp(filePath)
        .resize({width: 70})
        .toFile(thumbnailPath)
        .then(info => {

            // output.jpg is a 300 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpg

            event.sender.startDrag({
                files: [filePath],
                icon: thumbnailPath,
            })
        })
        .catch(err => console.error(err));

})