// 螢幕分享 . 視頻錄製
window.addEventListener('DOMContentLoaded', () => {

    // server side
    const server = require('http').Server().listen(17575);
    const io = require('socket.io')(server);

    io.on('connect', (socket) => {

        socket.on('video', (arrayBuffer) => {

            const blob = new Blob([arrayBuffer], {"type": "video\/mp4"});
            const video = document.getElementById('entireVideo');
            video.src = window.URL.createObjectURL(blob);
            video.play();
        });
    });
});
