# [ Day 25 ] - 分享螢幕(二) - 錄製螢幕訊息 

昨天我們解說了如何取得螢幕目前的狀態 , 那要如何錄製畫面呢 ?

先看成果  

![](https://i.imgur.com/kM0NGN9.gif)

我們需要用到 JS 中的 API - `mediaRecorder`

MediaRecorder 可將 stream 載入 , 利用此物件上的 ondataavailable 方法收集 byteArray 

```javascript
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
```

然後利用 createObjectURL 將 byteArray 轉換成檔案 test.webm 下載

```javascript
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
```

之後我們就可以錄製螢幕了 !

![](https://i.imgur.com/kM0NGN9.gif)

## 參考資料

- [初探 WebRTC — 手把手建立線上視訊 (3)](https://medium.com/@jedy05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
