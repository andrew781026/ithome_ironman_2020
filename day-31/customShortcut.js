const {globalShortcut} = require('electron');

// 註冊 ctrl + 1 . 2 . 3 快捷鍵用於切換貓咪圖示
function registerShortcut(win) {

    [1, 2, 3].map(number => {

        globalShortcut.register(`CommandOrControl+${number}`, () => {

            console.log(`顯示貓咪 0${number}`);
            win.webContents.send('switch-cat', number);
            win.show();  // Shows and gives focus to the window.
        })
    });

}

module.exports = {registerShortcut}