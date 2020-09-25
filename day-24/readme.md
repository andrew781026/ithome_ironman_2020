# [ Day 24 ] - 分享螢幕(一) - 屏幕擷取

有時可能殺蟲失敗 , 要找大神朋友幫忙殺蟲 , 但是描述狀況的能力又差 , 這時分享桌面就好了 ! 可是在 Electron 中要如何處理呢 ? `desktopCapturer`

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

- [Saving desktopCapturer to video file in Electron](https://stackoverflow.com/questions/36753288/saving-desktopcapturer-to-video-file-in-electron)
- [electron 官方文件 - desktop-capturer](https://www.electronjs.org/docs/api/desktop-capturer)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
