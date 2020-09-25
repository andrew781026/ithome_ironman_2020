# [ Day 25 ] - 動物聊天室(十六) - 分享螢幕訊息 

有時可能想要與工程師朋友分享一下桌面 , 討論一下 , 今天遇到的某個問題要如何解決 , 這時要如何處理呢 ? `desktopCapturer`

### desktopCapturer

> 取得桌面上可透過 [`navigator.mediaDevices.getUserMedia`] API 擷取影片或音訊的媒體來源資訊。

處理序: 主處理序, 畫面轉譯器

![](https://i.imgur.com/I0onV6L.gif)

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
````

這樣我們就有

## 參考資料

- [初探 WebRTC — 手把手建立線上視訊 (3)](https://medium.com/@jedy05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
