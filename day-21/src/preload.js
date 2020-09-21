const {ipcRenderer} = require('electron');

window.ipcRenderer = ipcRenderer;

ipcRenderer.on('update-badge', (event, number) => ipcRenderer.sendSync('update-badge', number));
