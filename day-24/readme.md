# [ Day 24 ] - 分享螢幕(一) - 屏幕擷取

```
有時遇到 BUG 時 , 需要其他人幫忙解決 , 最近疫情又不適合約咖啡廳見面 , 
因此需要分享螢幕 , 請其他人幫忙解決問題 , 之後我將花一些篇幅討問分享螢幕那回事
```

### desktopCapturer

> 取得桌面上可透過 [`navigator.mediaDevices.getUserMedia`] API 擷取影片或音訊的媒體來源資訊。

處理序: 主處理序, 畫面轉譯器

下面介紹如何列表所有可選擇之影像來源 & 擷取影像放入 video 標籤中顯示影像

> 建立擷取螢幕的按鈕

```html
 <button id="listAllSources">列表所有可擷取屏幕</button>
```

追加按鈕後長這樣：

![](https://i.imgur.com/TVLm1EZ.png)

> 取得所有可擷取螢幕，並列表出來

```javascript
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
```

列表可擷取的螢幕長這樣：

![](https://i.imgur.com/zJ31hjP.png)

> 使用特定螢幕的 sourceId , 利用 getUserMedia 取得 MediaStream , 將其灌入 video.srcObject 中

```javascript
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
            document.getElementById("entireVideo").style.display = 'flex';
            const video = document.getElementById('entireVideo');
            video.srcObject = stream;
            video.onloadedmetadata = () => video.play();
        })
        .catch(err => console.error(err));
}
```

將 MediaStream 灌入 video.srcObject 後長這樣：

![](https://i.imgur.com/ylLowFF.png)

最終的成果長這樣：

![](https://i.imgur.com/vzXRq8c.gif)

## 參考資料

- [Saving desktopCapturer to video file in Electron](https://stackoverflow.com/questions/36753288/saving-desktopcapturer-to-video-file-in-electron)
- [electron 官方文件 - desktop-capturer](https://www.electronjs.org/docs/api/desktop-capturer)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
