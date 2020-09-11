const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    const img = document.getElementById('img');
    const switchCat = number => img.src = `imgs/cat_0${number}.gif`;

    ipcRenderer.on('switch-cat', (event, args) => switchCat(args));

    ipcRenderer.invoke('async-handle', '帶小貓回家')
        // then 回傳前可以做其他事，例如打掃家裡
        .then(msg => console.log(msg)) // prints "小貓肚子餓，喵喵叫"

    console.log(ipcRenderer.sendSync('sync-handle', '帶小貓回家')) // prints "小貓肚子餓"

    ipcRenderer.on('need-clean-reply', (event, arg) => {
        console.log(arg) // 印出 "貓咪肚子餓"
    })

    ipcRenderer.send('other-channel-handle', '帶小貓回家')
});
