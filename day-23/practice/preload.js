const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('drag').ondragstart = (event) => {
        event.preventDefault()
        ipcRenderer.send('ondragstart', '/path/to/item')
    };

});
