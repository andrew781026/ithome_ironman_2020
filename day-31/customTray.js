const {app, Tray, Menu} = require('electron');

function createTray(win,iconPath) {

    const switchCat = (catNo) => () => {

        console.log(`顯示貓咪 0${catNo}`);
        win.show();
        win.webContents.send('switch-cat', catNo);
    }

    const tray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        {label: '貓咪 4', click: switchCat(4)},
        {label: '貓咪 5', click: switchCat(5)},
        {label: '貓咪 6', click: switchCat(6)},
        {label: '縮小', click: () => win.hide()},
        {label: '結束', click: () => app.quit()}
    ]);
    tray.setToolTip('這是縮小的小貓');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => win.show())

    return tray;
}

module.exports = {createTray}