import {dialog, ipcMain} from 'electron';
import fs from 'fs';
import mime from 'mime-types';

// 選擇圖片
ipcMain.handle('image:choose-image', async event => {

    const result = await dialog.showOpenDialog({

        properties: ['openFile'],
        filters: [
            {name: '圖片', extensions: ['jpg', 'png', 'gif']},
        ],
    });

    if (result.canceled) return {canceled: true};
    else {

        const filePath = result.filePaths[0];
        const contentType = mime.lookup(filePath);
        const base64Image = fs.readFileSync(filePath, {encoding: 'base64'});
        return {path: filePath, base64: `data:${contentType};base64,${base64Image}`};
    }
});

// 儲存圖片
ipcMain.handle('image:save-image', async (event, imageData) => {

    const contentType = imageData.base64.split(';base64,')[0].replace('data:', '');
    const base64Image = imageData.base64.split(';base64,')[1];
    const ext = mime.extension(contentType);

    const result = await dialog.showSaveDialog({

        title: '儲存圖片',
        buttonLabel: '儲存',
        filters: [
            {name: '圖片', extensions: [ext]},
            {name: '所有檔案', extensions: ['*']}
        ],
    });

    if (result.canceled) return {canceled: true};
    else {

        const filePath = result.filePath;
        fs.writeFileSync(filePath, base64Image, {encoding: 'base64'});
        return {path: filePath, success: true};
    }
});