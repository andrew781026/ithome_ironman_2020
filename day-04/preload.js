const {ipcRenderer} = require('electron');
const Mousetrap = require('mousetrap');

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

    // body.addEventListener('mouseenter', startDrag);
    // body.addEventListener('mouseleave', stopDrag);

    ipcRenderer.on('show-bg', startDrag);
    ipcRenderer.on('hide-bg', stopDrag);



    // 將不同的組合鍵對應到同一個 callback
    Mousetrap.bind(['command+1', 'ctrl+1'], () => {

        console.log('command 1 or control 1');
        ipcRenderer.send('show-context-menu');

        // 回傳 false 防止預設行為被觸發，並避免事件向外傳遞
        return false
    })
});
