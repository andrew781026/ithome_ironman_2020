import {ipcMain, BrowserWindow, Notification,} from 'electron';
import Badge from 'electron-windows-badge';

const _map = {};

export const fromWinId = winId => _map[winId];

// badge manager
export class BadgeManager {

    constructor(win) {

        const badgeOptions = {};
        new Badge(win, badgeOptions);
        this.badgeCount = null;
        this.winId = win.id;
        _map[win.id] = this;
    }

    fromWinId(winId) {

        return _map[winId];
    }

    updateNumber() {

        BrowserWindow.fromId(this.winId).webContents.send('update-badge', this.badgeCount);
    }

    removeNumber() {

        this.badgeCount = null;
        this.updateNumber();
    }

    setNumber(number) {

        this.badgeCount = number;
        this.updateNumber();
    }

    increaseNumber() {

        if (this.badgeCount) this.badgeCount++;
        else this.badgeCount = 1;
        this.updateNumber();
    }

    getBadgeCount() {

        return this.badgeCount;
    }
}

// 新訊息進入
ipcMain.on('notify:new-msg', (event, chat) => {

    const mainWindow = BrowserWindow.fromWebContents(event.sender); // 利用 event.sender 取得 currentWindow
    const isFocused = mainWindow.isFocused(); // 確認 mainWindow 是否在最上面

    const myNotification = new Notification({
        title: `${chat.name}有新的對話`,
        subtitle: chat.msg
    });

    // myNotification.on('click', () => mainWindow.show()); // 將 mainWindow 帶到最上面
    // myNotification.on('close', () => mainWindow.show()); // 將 mainWindow 帶到最上面
    myNotification.show();

    if (!isFocused) {

        // 數字 +1
        const badgeManager = fromWinId(mainWindow.id);
        badgeManager.increaseNumber();

        // 工作列按鈕閃爍
        mainWindow.flashFrame(true);
    }
});