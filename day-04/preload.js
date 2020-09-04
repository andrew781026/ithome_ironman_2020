const {ipcRenderer} = require('electron');
const Mousetrap = require('mousetrap');

window.addEventListener('DOMContentLoaded', () => {

    const img = document.getElementById('img');
    const switchCat = number => img.src = `imgs/cat_0${number}.gif`;

    ipcRenderer.on('switch-cat', (event, args) => switchCat(args));

    [4, 5, 6].map(number => {

        // 將不同的組合鍵對應到同一個 callback
        Mousetrap.bind([`command+${number}`, `ctrl+${number}`], () => {

            switchCat(number);

            // 回傳 false 防止預設行為被觸發，並避免事件向外傳遞
            return false
        })
    })

});
