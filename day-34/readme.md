# [ Day 34 ] - 桌面小圖示的優化

開機登入時，會讓桌面小圖示於正中間顯示，
我們可以讓顯示的桌面小圖示於左下角顯示，
也可以顯示於右下角，只要我們抓出螢幕的尺寸並設定顯示時的 x . y 位置

## 實作

如果要顯示在左下角，直接設定顯示時的 x . y 位置就可以了！

- 設定顯示時的 x . y 位置，顯示在左下角

```javascript
const mainWindow = new BrowserWindow({
        x: 30 , // 距離左方 x 單位
        y: 350 + 30,  // 距離下方 y 單位
        width: 350,
        height: 350,
        ...
    });
```

![](https://i.imgur.com/XTsMMPr.png)

如果要顯示在右下角就要取的螢幕的長寬做計算

- 抓出螢幕的尺寸 

```javascript
const { width, height } = screen.getPrimaryDisplay().workAreaSize;
```

- 設定顯示時的 x . y 位置 ，於右下角顯示

```javascript
const mainWindow = new BrowserWindow({
        x: width - 350 - 30 , // 距離左方 x 單位
        y: 350 + 30,  // 距離下方 y 單位
        width: 350,
        height: 350,
        ...
    });
```

![](https://i.imgur.com/VjLlvvx.png)

## 參考資料

- [electron 官方文件 - screen](https://www.electronjs.org/docs/api/screen)

```
完賽後，我將慢慢整理鐵人賽中，做了哪些事 ヾ(・ω・)メ(・ω・)ノ
```
