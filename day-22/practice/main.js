const {app, BrowserWindow, clipboard, globalShortcut} = require('electron');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 320,
        height: 350,
        autoHideMenuBar: true //  工具列不顯示
    });

    mainWindow.loadFile('index.html');

    clipboard.writeText('範例字串');
    console.log(clipboard.readText());

    // 將聊天對話複製到 clipboard 中

    // 將複製的圖片 ctrl + v 時 , 上傳到 firestore 中
    globalShortcut.register('CommandOrControl+E', () => {
        console.log('CommandOrControl+E is pressed');
        const availableFormats = clipboard.availableFormats();
        console.log(availableFormats); // need contain image

        const isImageFormat = availableFormats.find(format => format.includes('image'));
        const isHtmlFormat = availableFormats.find(format => format.includes('text/html'));
        const isTextFormat = availableFormats.find(format => format.includes('text/plain'));
        const isRtfFormat = availableFormats.find(format => format.includes('text/rtf'));

        if (isImageFormat) {

            const nativeImage = clipboard.readImage(); // 取得 clipboard 中的圖片
            const base64Image = nativeImage.toDataURL(); // data:image/png;
            console.log('base64Image=', base64Image);

        } else if (isTextFormat) {

            const textStr = clipboard.readText(); // 取得 clipboard 中的文字
            console.log('textStr=', textStr);

        } else if (isHtmlFormat) {

            const htmlStr = clipboard.readHTML(); // 取得 clipboard 中的 html
            console.log('htmlStr=', htmlStr);

        } else if (isRtfFormat) {

            const rtfStr = clipboard.readRTF(); // 取得 clipboard 中的 rtf
            console.log('rtfStr=', rtfStr);

        }

    })
}


app.on('ready', () => {

    createWindow();
})

app.on('window-all-closed', () => app.quit())