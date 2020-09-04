const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    const img = document.getElementById('img');
    const switchCat = number => img.src = `imgs/cat_0${number}.gif`;

    ipcRenderer.on('switch-cat', (event, args) => switchCat(args));
});
