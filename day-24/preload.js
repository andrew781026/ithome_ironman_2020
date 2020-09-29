const {desktopCapturer} = require('electron');

// 螢幕分享 . 視頻錄製
window.addEventListener('DOMContentLoaded', () => {

    function handleStream(stream, outputElementId) {
        document.getElementById("entireVideo").style.display = 'flex';
        const video = document.getElementById(outputElementId)
        video.srcObject = stream
        video.onloadedmetadata = (e) => video.play()
    }

    window.desktopCapture = (sourceId) =>{

        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: sourceId,
                        minWidth: 1280,
                        maxWidth: 1280,
                        minHeight: 720,
                        maxHeight: 720
                    }
                }
            })
            .then(stream => {
                document.getElementById("showAllScreens").innerHTML = '';
                handleStream(stream, 'entireVideo');
            })
            .catch(err => console.error(err));
    }

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

    document.getElementById('listAllSources').addEventListener('click', () => {

        desktopCapturer.getSources({types: ['window', 'screen']}).then(sources => listRenderer(sources));
    });

});
