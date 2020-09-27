const {desktopCapturer} = require('electron');
const io = require('socket.io-client');


window.vars = {
    localStream: undefined, // mediaStream Object
    videoTracks: undefined,
    audioTracks: undefined,
    pc: undefined, // RTCPeerConnection Object
    offer: undefined, // sessionDescription
};

const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
    }]
};

const signalOption = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
};

// 螢幕分享 . 視頻錄製
window.addEventListener('DOMContentLoaded', () => {

    const socket = io('http://localhost:3000');

    const createMedia = async () => {

        const sources = await desktopCapturer.getSources({types: ['window', 'screen']});

        const electronSource = sources.find(src => src.name === 'Electron');
        const sourceId = electronSource.id;
        const localStream = await desktopCapture(sourceId);
        window.vars.localstream = localStream;
        document.getElementById('myVideo').srcObject = localStream;
        return localStream;
    };

    const getAudioVideo = () => {

        window.vars.videoTracks = window.vars.localstream.getVideoTracks();
        window.vars.audioTracks = window.vars.localstream.getAudioTracks();

        if (window.vars.videoTracks.length > 0) console.log(`影像配置: ${window.vars.videoTracks[0].label}`);
        if (window.vars.audioTracks.length > 0) console.log(`聲音配置: ${window.vars.audioTracks[0].label}`);
    };

    const desktopCapture = async (sourceId) => {

        constraints = {
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
        };

        const localStream = await navigator.mediaDevices.getUserMedia(constraints)
        window.vars.localStream = localStream;
        return localStream;
    };

    const createPeerConnection = () => {
        // 建立 P2P 連接
        window.vars.pc = new RTCPeerConnection(configuration);
        console.log(`建立 peer connection`);
    };

    const addLocalStream = () => {
        // 增加本地流
        window.vars.pc.addStream(window.vars.localstream);
    };

    const onIceCandidates = () => {
        // 監聽 Ice Server
        // 找尋到 ICE 候選位置後，送去 server 與另一位配對
        window.vars.pc.onicecandidate = ({candidate}) => {
            if (!candidate) {
                return;
            }
            console.log('onIceCandidate => ', candidate);
            socket.emit("peerconnectSignaling", {
                candidate,
                to: 'jedy-0',
                from: 'hiro-1',
                room: '0509'
            });
        };
    };

    const onIceconnectionStateChange = () => {
        // 監聽 Ice 連接狀態
        window.vars.pc.oniceconnectionstatechange = (evt) => {
            console.log('ICE 伺服器狀態變更 => ', evt.target.iceConnectionState);
        };
    };

    const onAddStream = () => {
        // 監聽是否有流傳入，如果有的話就顯示影像
        window.vars.pc.onaddstream = (event) => {

            const remoteVideo = document.getElementById('remoteVideo');

            if (!remoteVideo.srcObject && event.stream) {
                remoteVideo.srcObject = event.stream;
                console.log('接收流並顯示於遠端視訊！', event);
            }
        }
    };

    window.initPeerConnection = async () => {
        await createMedia();
        getAudioVideo();
        createPeerConnection();
        addLocalStream();
        onIceCandidates();
        onIceconnectionStateChange();
        onAddStream();
    };

    const sendSignalingMessage = (desc, offer) => {
        console.log(`寄出 ${offer ? "offer" : "answer"}`);
        socket.emit("peerconnectSignaling", {
            desc: desc,
            to: 'jedy-0',
            from: 'hiro-1',
            room: '0509'
        });
    };

    window.createSignal = async (isOffer) => {
        try {
            if (!window.vars.pc) {
                console.log('尚未開啟視訊')
                return;
            }

            const pc = window.vars.pc;

            const sessionDescription = isOffer ? await pc.createOffer(signalOption) : await pc.createAnswer(signalOption);
            window.vars.offer = sessionDescription;

            await pc.setLocalDescription(sessionDescription);
            sendSignalingMessage(pc.localDescription, isOffer);
        } catch (err) {
            console.log(err);
        }
    };

    const onSocket = () => {

        socket.on('peerconnectSignaling', async ({desc, from, candidate}) => {
            if (desc && !window.vars.pc.currentRemoteDescription) {
                console.log('desc => ', desc);
                await window.vars.pc.setRemoteDescription(new RTCSessionDescription(desc));
                await window.createSignal(desc.type === 'answer');
            } else if (candidate) {
                console.log('candidate =>', candidate);
                window.vars.pc.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });
        socket.on('message', message => console.log('房間接收 => ', message));
        socket.on('roomBroadcast', message => console.log('房間廣播 => ', message));
    };

    // call onSocket as created
    onSocket();
});
