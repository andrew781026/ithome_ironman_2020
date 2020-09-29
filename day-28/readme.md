# [ Day 28 ] - 動物聊天室(十七) - 選擇 emoji 分享目前的心情

經過四天的抗戰 , 我們終於可以將我們的螢幕分享給其他人看 , 請別人幫忙除 BUG

現在聊天室只能發存文字與貼上圖片 , 好像有點 Low 不太像現代的聊天室

今天我們來加一點 emoji 讓我們的聊天室更現代一點

![](https://i.imgur.com/XXlhHW4.png)

### 實作開始

> 使用之前的 Chatroom.vue 在笑臉圖示的上方建立一個 popUp 元件

追加一個 position : absolute 的 emoji-list-wrap 在其上面

```html
<i class="flaticon flaticon-happy cursor-pointer relative" title="emoji"
   @click="emojiChooserShow = !emojiChooserShow">
    <template v-if="emojiChooserShow">
        <div class="emoji-list-wrap">
            <span v-for="(emoji) in emojis" :key="emoji" @click="chooseEmoji(emoji)">{{emoji}}</span>
        </div>
        <div class="emoji-list-triangle"></div>
    </template>
</i>
```

> 追加 emoji-list-wrap 的 css

```css
.emoji-list-wrap {

    position: absolute;
    bottom: 40px;
    left: -30px;
    width: 120px;
    height: 120px;
    padding: 10px;
    overflow: auto;
    background-color: #a72c85;
}

.emoji-list-triangle {
    position: absolute;
    bottom: 10px;
    left: 23px;
    border-color: #a72c85 transparent transparent transparent;
    border-style: solid solid solid solid;
    border-width: 15px 7px 15px 7px;

    /* 設定 width、height 可更好理解原理 */
    height: 0;
    width: 0;
}
```

> 建立 emoji 列表

你可以從 [getemoji](https://getemoji.com/) 上面複製你想要使用的 emoji 

然後在 computed 區塊中追加一個 emojis 陣列資料

```javascript
computed: {
    emojis() {
    
        return '😀 😃 😄 😁 😆 😅 😂 🤣 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 😖'.split(' ');
    },
    ...
},
```

當然要建立 chooseEmoji 方法 , 這樣點擊 emoji 時才會將此 emoji 加到輸入框中

```javascript
methods: {
    chooseEmoji(emoji) {
    
        console.log(emoji);
        this.text += ' ' + emoji;
    },
}
```

噹噹噹噹 , 然後我們就有 emoji 了 ! 

![](https://i.imgur.com/XXlhHW4.png)

```
鐵人賽這裡不能 PO , emoji 不知道是甚麼樣的原因 ╥﹏╥ , 我只能用顏文字 (￣▽￣)ノ
```

## 參考資料

- [getemoji](https://getemoji.com/)
- [emoji 列表](https://tw.piliapp.com/emoji/list/)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
