const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    const buttons = document.getElementsByTagName('button');

    [...buttons].forEach(button => {
        button.addEventListener('click', () => ipcRenderer.send(button.id));
    });
});
