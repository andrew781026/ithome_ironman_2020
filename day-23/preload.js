const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('drag').ondragstart = (event) => {
        event.preventDefault()
        ipcRenderer.send('ondragstart', '/path/to/item')
    };

    document.getElementById('drag').addEventListener("dragend", function(event) {

        console.log('dragend !!');

    }, false);

    document.getElementById('drag').addEventListener("drop", function(event) {

        // prevent default action (open as link for some elements)
        event.preventDefault();
        console.log('drop !!');

    }, false);
});
