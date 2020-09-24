const {ipcRenderer} = require('electron');
const {desktopCapturer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    function handleStream(stream, outputElementId) {
        const video = document.getElementById(outputElementId)
        video.srcObject = stream
        video.onloadedmetadata = (e) => video.play()
    }

    function handleError(e) {
        console.error(e)
    }

    document.getElementById('desktopCapturer').addEventListener('click', () => {

        desktopCapturer.getSources({types: ['window', 'screen']}).then(async sources => {
            for (const source of sources) {

                if (source.name === 'Entire Screen') {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            audio: false,
                            video: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    chromeMediaSourceId: source.id,
                                    minWidth: 1280,
                                    maxWidth: 1280,
                                    minHeight: 720,
                                    maxHeight: 720
                                }
                            }
                        })
                        handleStream(stream,'entireVideo')
                    } catch (e) {
                        handleError(e)
                    }
                    return;
                }
            }
        });

    });

    document.getElementById('electronCapturer').addEventListener('click', () => {

        desktopCapturer.getSources({types: ['window', 'screen']}).then(async sources => {
            for (const source of sources) {

                if (source.name === 'Electron') {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            audio: false,
                            video: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    chromeMediaSourceId: source.id,
                                    minWidth: 1280,
                                    maxWidth: 1280,
                                    minHeight: 720,
                                    maxHeight: 720
                                }
                            }
                        })
                        handleStream(stream,'electronVideo')
                    } catch (e) {
                        handleError(e)
                    }
                    return;
                }
            }
        });
    });

});
