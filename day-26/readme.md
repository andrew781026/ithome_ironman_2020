# [ Day 19 ] - 動物聊天室(十一) - 桌面截圖

## desktopCapturer
> 取得桌面上可透過 [navigator.mediaDevices.getUserMedia] API 擷取影片或音訊的媒體來源資訊。

下列範例展示如何將桌面上標題為 `Electron` 的視窗擷取為影像檔:

```javascript
// 在畫面轉譯處理序裡。
const { desktopCapturer } = require('electron')

desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
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
        handleStream(stream)
      } catch (e) {
        handleError(e)
      }
      return
    }
  }
})

function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}
```

To capture video from a source provided by desktopCapturer the constraints passed to [navigator.mediaDevices.getUserMedia] must include chromeMediaSource: 'desktop', and audio: false.

To capture both audio and video from the entire desktop the constraints passed to [navigator.mediaDevices.getUserMedia] must include chromeMediaSource: 'desktop', for both audio and video, but should not include a chromeMediaSourceId constraint.

```javascript
const constraints = {
  audio: {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  },
  video: {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  }
}

```

## 參考資料

- [electron 官方文件 - desktopCapturer](https://www.electronjs.org/docs/api/desktop-capturer)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
