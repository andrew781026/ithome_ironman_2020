const {clipboard,ipcRenderer} = require('electron');

window.clipboard = clipboard;
window.ipcRenderer = ipcRenderer;

ipcRenderer.on('update-badge', (event, number) => ipcRenderer.sendSync('update-badge', number));
