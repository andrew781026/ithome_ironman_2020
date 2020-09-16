const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    const buttonIds = ["open", "save", "message-box", "error-box", "certificate-trust"];
    buttonIds.forEach(buttonId => ipcRenderer.send(buttonId));
});
