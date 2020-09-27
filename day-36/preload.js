const {remote,ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    const body = document.getElementsByTagName('body')[0];
    const dragBar = document.getElementById('drag-bar');

    let draggable = false;

    const startDrag = () => {

        draggable = true;
        if (!body.classList.contains('draggable')) {
            body.classList.add('draggable');
            dragBar.style.display = 'block';
            //  visibility: visible . hidden 會造成 dragBar 變成不可拖曳
        }
        ipcRenderer.send('change-drag', {draggable});
    }

    const stopDrag = () => {

        draggable = false;
        if (body.classList.contains('draggable')) {
            body.classList.remove('draggable');
            dragBar.style.display = 'none';
        }
        ipcRenderer.send('change-drag', {draggable});
    }

    // Returns BrowserWindow - The window to which this web page belongs.
    remote.getCurrentWindow(); // 在 顯示端 ( renderer 端 ) , 取得 BrowserWindow 並操作它

    ipcRenderer.on('show-bg', startDrag);
    ipcRenderer.on('hide-bg', stopDrag);
});
