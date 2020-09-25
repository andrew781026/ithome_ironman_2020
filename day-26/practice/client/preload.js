const {desktopCapturer} = require('electron');

// 螢幕分享 . 視頻錄製
window.addEventListener('DOMContentLoaded', () => {

    function handleStream(stream, outputElementId) {
        document.getElementById("entireVideo").style.display = 'flex';
        const video = document.getElementById(outputElementId)
        video.srcObject = stream
        video.onloadedmetadata = (e) => video.play();
        startRecord(stream);
    }

    function stopRecord() {

        window.mediaRecorder.stop();
        document.getElementById("listAllSources").style.display = 'block';
        document.getElementById("stopRecord").style.display = 'none';
    }

    function download(recordedChunks) {
        const blob = new Blob(recordedChunks, {type: "video/webm"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "test.webm";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    function startRecord(stream) {

        document.getElementById("listAllSources").style.display = 'none';
        document.getElementById("stopRecord").style.display = 'block';

        let chunks = [];
        window.mediaRecorder = new MediaRecorder(stream);

        const mediaRecorder = window.mediaRecorder;
        mediaRecorder.onstart = () => chunks = [];
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.onstop = () => download(chunks);

        mediaRecorder.start();
    }

    window.desktopCapture = (sourceId) => {

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

    document.getElementById('listAllSources').addEventListener('click', () => {

        desktopCapturer.getSources({types: ['window', 'screen']}).then(sources => listRenderer(sources));
    });

    document.getElementById('stopRecord').addEventListener('click', () => stopRecord());

});
