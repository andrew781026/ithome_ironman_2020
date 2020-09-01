const {app, BrowserWindow, MenuItem, Menu} = require('electron');
const {checkForUpdates} = require('./updater');

function createWindow() {

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 320,
        height: 350,
    });

    const menu = new Menu()
    menu.append(new MenuItem({label: 'MenuItem1', click: () => console.log('item 1 clicked')}))
    menu.append(new MenuItem({type: 'separator'}))
    menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

    const menuItem = new MenuItem({label: '自動更新'});
    checkForUpdates(menuItem, mainWindow);

    menu.append(menuItem);
    Menu.setApplicationMenu(menu);


    mainWindow.loadFile('index.html');
}

app.on('ready', () => {

    createWindow();

    // autoUpdater.checkForUpdatesAndNotify();
})

app.on('window-all-closed', () => {

    app.quit();
})