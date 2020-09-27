const {desktopCapturer, ipcRenderer} = require('electron');
window.desktopCapturer = desktopCapturer;
window.ipcRenderer = ipcRenderer;

// 螢幕分享 . 視頻錄製
window.addEventListener('DOMContentLoaded', () => {

    window.desktopCapture = (sourceId) => {

        console.log('pick-sourceId=', window.sourceId);
        ipcRenderer.send('pick-sourceId', sourceId);
    };

    const listRenderer = sources => {

        document.getElementById("entireVideo").style.display = 'none';
        const screenWrapper = document.getElementById("showAllScreens");

        screenWrapper.innerHTML = ''; // clear all showAllScreens children

        sources.forEach(item => {

            const htmlStr = `<div class="block" onclick="window.desktopCapture('${item.id}')">
                                <div class="img">
                                    <img src="${item.thumbnail.toDataURL()}" alt="圖片">
                                </div>
                                <div class="text-container">
                                    <span class="font">${item.name}</span>
                                </div>
                            </div>`;

            screenWrapper.insertAdjacentHTML('beforeend', htmlStr);
        });
    };

    const listAllSources = document.getElementById('listAllSources');

    listAllSources && listAllSources.addEventListener('click', () => {

        desktopCapturer.getSources({types: ['window', 'screen']}).then(sources => listRenderer(sources));
    });

});