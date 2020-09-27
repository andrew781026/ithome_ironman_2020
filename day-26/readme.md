# [ Day 26 ] - 分享螢幕(三) - 分享攝像頭畫面 HTML 版

我們使用 WebRTC 分享螢幕的工具 , 今天先製作存 HTML 可用的版本 , 天將其轉換成 Electron 的版本

需要使用 Socket.io 傳遞 WebRTC 的 Signaling , 下方建立 socket.io 的 server 

```javascript
// Node.js
const port = process.env.PORT || 3000;

const server = require('http').createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
}).listen(port);

// Socket.io
const io = require('socket.io')(server);

function findNowRoom(client) {
    return Object.keys(client.rooms).find(item => {
        return item !== client.id
    });
}

io.on('connection', client => {
    console.log(`socket 用戶連接 ${client.id}`);

    client.on('joinRoom', room => {
        console.log(room);

        const nowRoom = findNowRoom(client);
        if (nowRoom) {
            client.leave(nowRoom);
        }
        client.join(room, () => {
            io.sockets.in(room).emit('roomBroadcast', '已有新人加入聊天室！');
        });
    });

    client.on('peerconnectSignaling', message => {
        console.log('接收資料：', message);

        const nowRoom = findNowRoom(client);
        client.to(nowRoom).emit('peerconnectSignaling', message)
        // client.emit('peerconnectSignaling', message)
    });

    client.on('disconnect', () => {
        console.log(`socket 用戶離開 ${client.id}`);
    });
});
```

然後下方做一個 HTML 使用 WebRTC 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>WebRTC</title>
    <script src="https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</head>
<body>
<div id="app">
    <div class="row m-3 ml-5">
        <button class="btn btn-primary" @click="initPeerConnection">初始化</button>
        <button class="btn btn-primary btnCall ml-3" @click="createSignal(true)">send offer</button>
        <input type="text" class="form-control ml-3 col-2" v-model="room" placeholder="請輸入房號">
        <button class="btn btn-primary ml-3" @click="joinRoom">加入房間</button>
        <input type="text" class="form-control ml-3 col-2" v-model="text" placeholder="請輸入訊息"
               @keypress.enter="sendText">
        <button class="btn btn-primary ml-3" @click="sendText">送出訊息</button>
    </div>
    <div class="row ml-5 border border-info mr-5 position-relative">
        <video width="200" height="200" class="rtc" autoplay
               id="myVideo" ref="myVideo" muted playsinline></video>
        <video width="500" height="500" class="rtc ml-5" autoplay
               id="remoteVideo" ref="remoteVideo" playsinline></video>
        <div class="col-3 position-absolute" style="top: 250px">
            <button class="btn btn-info ml-1" @click="closeTrack('audio', !audioTracks[0].enabled)">
                {{ audioTracks && audioTracks[0].enabled ? '音訊On': '音訊Off' }}
            </button>
            <button class="btn btn-info ml-3" @click="closeTrack('video', !videoTracks[0].enabled)">
                {{ videoTracks && videoTracks[0].enabled ? '視訊On': '視訊Off' }}
            </button>
        </div>
    </div>
</div>

<script>
    const socket = io('http://localhost:3000');

    const app = new Vue({
        el: '#app',
        data: {
            localstream: null,
            pc: null,
            videoTracks: null,
            audioTracks: null,
            configuration: {
                iceServers: [{
                    urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
                }]
            },
            signalOption: {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            },
            offer: null,
            room: null,
            text: null,
        },
        created() {
            this.onSocket();
        },
        methods: {
            async initPeerConnection() {
                await this.createMedia();
                this.getAudioVideo();
                this.createPeerConnection();
                this.addLocalStream();
                this.onIceCandidates();
                this.onIceconnectionStateChange();
                this.onAddStream();
                // this.onSocket();
            },
            async createMedia() {
                // 儲存本地流到全域
                this.localstream = await window.navigator.mediaDevices.getUserMedia({ audio: true, video: true })

                this.$refs.myVideo.srcObject = this.localstream;
            },
            // 取得裝置名稱
            getAudioVideo() {
                this.videoTracks = this.localstream.getVideoTracks();
                this.audioTracks = this.localstream.getAudioTracks();

                if (this.videoTracks.length > 0) {
                    console.log(`影像配置: ${this.videoTracks[0].label}`)
                };
                if (this.audioTracks.length > 0) {
                    console.log(`聲音配置: ${this.audioTracks[0].label}`)
                };
            },
            createPeerConnection() {
                // 建立 P2P 連接
                this.pc = new RTCPeerConnection(this.configuration);
                console.log(`建立 peer connection`);
            },
            addLocalStream(){
                // 增加本地流
                this.pc.addStream(this.localstream)
            },
            onIceCandidates() {
                // 監聽 Ice Server
                // 找尋到 ICE 候選位置後，送去 server 與另一位配對
                this.pc.onicecandidate = ({ candidate }) => {
                    if (!candidate) { return; }
                    console.log('onIceCandidate => ', candidate);
                    socket.emit("peerconnectSignaling", {
                        candidate,
                        to: 'jedy-0',
                        from: 'hiro-1',
                        room: '0509'
                    });
                };
            },
            onIceconnectionStateChange() {
                // 監聽 Ice 連接狀態
                this.pc.oniceconnectionstatechange = (evt) => {
                    console.log('ICE 伺服器狀態變更 => ', evt.target.iceConnectionState);
                };
            },
            onAddStream() {
                // 監聽是否有流傳入，如果有的話就顯示影像
                this.pc.onaddstream = (event) => {
                    console.log('this => ', this)
                    if(!this.$refs.remoteVideo.srcObject && event.stream){
                        this.$refs.remoteVideo.srcObject = event.stream;
                        console.log('接收流並顯示於遠端視訊！', event);
                    }
                }
            },
            // --------------
            sendSignalingMessage(desc, offer) {
                const isOffer = offer ? "offer" : "answer";
                console.log(`寄出 ${isOffer}`);
                socket.emit("peerconnectSignaling", {
                    desc: desc,
                    to: 'jedy-0',
                    from: 'hiro-1',
                    room: '0509'
                });
            },
            async createSignal(isOffer) {
                try {
                    if (!this.pc) {
                        console.log('尚未開啟視訊')
                        return;
                    }
                    this.offer = await this.pc[`create${isOffer ? 'Offer' : 'Answer'}`](this.signalOption);

                    await this.pc.setLocalDescription(this.offer);
                    this.sendSignalingMessage(this.pc.localDescription, isOffer ? true : false)
                } catch(err) {
                    console.log(err);
                }
            },
            onSocket() {
                const vm = this;
                socket.on('peerconnectSignaling', async ({ desc, from, candidate }) => {
                    if (desc && !vm.pc.currentRemoteDescription) {
                        console.log('desc => ', desc);
                        await vm.pc.setRemoteDescription(new RTCSessionDescription(desc));
                        await vm.createSignal(desc.type === 'answer' ? true : false);
                    } else if (candidate) {
                        console.log('candidate =>', candidate);
                        vm.pc.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                });
                socket.on('message', message => {
                    console.log('房間接收 => ', message);
                });
                socket.on('roomBroadcast', message => {
                    console.log('房間廣播 => ', message);
                });
            },
            joinRoom() {
                if (!this.room) {
                    return;
                }
                socket.emit('joinRoom', this.room);
                this.room = null;
            },
            sendText() {
                if (!this.text) {
                    return;
                }
                socket.emit('message', this.text);
                this.text = null;
            },
            closeTrack(trackName, isOpen) {
                // console.log(this.videoTracks);
                this[`${trackName}Tracks`][0].enabled = isOpen
                this[`${trackName}Tracks`] = this.localstream[trackName === 'video'? 'getVideoTracks' : 'getAudioTracks']()
            }
        },
    });
</script>

<style>
    #myVideo{
        width: 200px;
        height: 200px;
        background: rgba(141, 167, 167, 0.178);
        transform: scaleX(-1);
    }

    #remoteVideo{
        width: 500px;
        height: 500px;
        background: rgba(141, 167, 143, 0.178);
    }
</style>
</body>
</html>
```

之後成功用 WebRTC 做視訊聊天

![](https://i.imgur.com/buG7JAV.gif)

## 參考資料

- [初探 WebRTC — 手把手建立線上視訊 (3)](https://medium.com/@jedy05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87)
- [且戰且走HTML5(28) 建立視訊會議](https://ithelp.ithome.com.tw/articles/10109585)
- [Getting Started with WebRTC](https://www.html5rocks.com/en/tutorials/webrtc/basics/)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
