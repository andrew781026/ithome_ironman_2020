const {ipcRenderer} = require('electron');
const Mousetrap = require('mousetrap');
const customTitlebar = require('custom-electron-titlebar');

window.addEventListener('DOMContentLoaded', () => {

    const title = new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#444'),
    });

    const body = document.getElementsByTagName('body')[0];
    const titleBar = title.titlebar;


    console.log('titleBar=', titleBar);

    let draggable = false;

    const startDrag = () => {

        draggable = true;
        if (!body.classList.contains('draggable')) {
            body.classList.add('draggable');
            titleBar.style.display = 'block';
        }
        ipcRenderer.send('change-drag', {draggable});
    }

    const stopDrag = () => {

        draggable = false;
        if (body.classList.contains('draggable')) {
            body.classList.remove('draggable');
            titleBar.style.display = 'none';
        }
        ipcRenderer.send('change-drag', {draggable});
    }

    ipcRenderer.on('hide-bg', stopDrag);

    /*
    ipcRenderer.on('toggle-drag', (event, args) => {

        toggleDrag();
    });
     */


    body.addEventListener('mouseenter', e => {
        // ipcRenderer.send('show-context-menu');
        startDrag();
    });

    /*
        body.addEventListener('mouseleave', e => {
            stopDrag();
        });
    */
    // 將不同的組合鍵對應到同一個 callback
    Mousetrap.bind(['command+1', 'ctrl+1'], () => {

        console.log('command 1 or control 1');
        ipcRenderer.send('show-context-menu');

        // 回傳 false 防止預設行為被觸發，並避免事件向外傳遞
        return false
    })
});
