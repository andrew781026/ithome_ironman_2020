const {remote,ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {


    const customTitlebar = require('custom-electron-titlebar');
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#444')
    });



    let rightClickPosition = null;

    // Returns BrowserWindow - The window to which this web page belongs.
    remote.getCurrentWindow(); // 在 顯示端 ( renderer 端 ) , 取得 BrowserWindow 並操作它

    // contextmenu = 瀏覽器點擊右鍵時觸發
    /*
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        rightClickPosition = {x: e.x, y: e.y}
        console.log('rightClickPosition=', rightClickPosition);
        // menu.popup(remote.getCurrentWindow())
    }, false)
     */

    document.getElementById('cat-img').addEventListener('dblclick', e => {

        e.preventDefault();
        ipcRenderer.send('notify');
    });

    document.getElementById('button').addEventListener('click', () => {

        ipcRenderer.send('notify');
    });

});
