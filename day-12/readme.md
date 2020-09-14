# [ Day 12 ] - 動物聊天室(五) - 動物聊天室畫面

今天我們來製作 `動物聊天室` 的畫面 , 預計畫面長下面的樣子

![](https://i.imgur.com/rO6tbaN.png)

今天我們只碰 vue 的相關部分 , 不會用到 electron API 所以可以用 `npm run serve`  
開啟 chrome 瀏覽器到 `localhost:8080` 將瀏覽器調整成 800 x 600 px 就可以完整開發今天的畫面  

```
開發頁面可以這樣調整
```

![](https://i.imgur.com/xXAYYrq.png)

如果期望使用 `npm run electron:serve` 進行開發的話 , 需要記得刷新畫面的快捷鍵不是 `F5` 而是 `ctrl+r`

> 第一步 , 下載 貓狗頭像圖片

首先準備貓貓 . 狗狗的頭像 , 可到 [day-12 圖片資料夾](https://github.com/andrew781026/ithome_ironman_2020/tree/master/day-12/src/assets/head) 下載圖片

![](https://i.imgur.com/7SlHXUD.png)

> 第二步 , 修改 App.vue

```vue
<template>
    <div id="app">
        <!-- cdn 參考資料 : https://google.github.io/material-design-icons/ -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet">
        <chatroom/>
    </div>
</template>

<script>
    import Chatroom from './components/Chatroom.vue'

    export default {
        name: 'App',
        components: {
            'chatroom': Chatroom
        }
    }
</script>

<style>

    :root {
        --bg-color: #746c6c;
        --msg-color: #524A4A;
        --input-color: #968686;
    }

    * {
        box-sizing: border-box;
    }

    html, body, #app {
        height: 100%;
    }

    body {
        margin: 0;
    }

    @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        src: url(https://example.com/MaterialIcons-Regular.eot); /* For IE6-8 */
        src: local('Material Icons'),
        local('MaterialIcons-Regular'),
        url(https://example.com/MaterialIcons-Regular.woff2) format('woff2'),
        url(https://example.com/MaterialIcons-Regular.woff) format('woff'),
        url(https://example.com/MaterialIcons-Regular.ttf) format('truetype');
    }

    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px; /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;

        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;

        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;

        /* Support for IE. */
        font-feature-settings: 'liga';
    }

</style>
```

> 第三步 , 新增 Component - Chatroom.vue

```vue
<template>
    <div class="chatroom">
        <div v-for="(chat) in chats"
             :key="chat.id"
             class="msg-wrap"
             :class="[chat.team === 'right' && 'row-reverse']"
        >
            <div class="avatar-wrap">
                <img class="head-img" :src="imgSrc(chat.avatar)" :alt="chat.avatar">
                <span class="name-text">{{chat.name}}</span>
            </div>
            <div>
                <div class="msg" :class="[chat.team]">
                    <span class="break-words">
                       {{chat.msg}}
                    </span>
                </div>
            </div>
        </div>
        <div class="input-wrap">
            <div class="input-left">
                <i class="material-icons cursor-pointer" title="emoji">sentiment_satisfied_alt</i>
                <i class="material-icons cursor-pointer" title="圖片">insert_photo</i>
                <i class="material-icons cursor-pointer" title="檔案">attach_file</i>
            </div>
            <input class="input" v-model="text" @keyup.enter="submit" placeholder="輸入文字"/>
            <div class="input-right" @click="submit">
                <i class="material-icons cursor-pointer" title="送出">send</i>
            </div>
        </div>
    </div>
</template>

<script>

    // _uuid() 的參考資料 : https://cythilya.github.io/2017/03/12/uuid/
    function _uuid() {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

    export default {
        name: "Chatroom",
        updated() {

            scrollToBottom();
        },
        methods: {
            imgSrc(avatar) {

                return require(`@/assets/head/${avatar}`);
            },
            submit() {

                if (this.text) {

                    this.chats.push({
                        id: _uuid(),
                        name: '你',
                        team: 'right',
                        avatar: 'cat-3.png',
                        msg: this.text
                    });

                    this.text = '';
                }
            }
        },
        data() {

            return {
                text: "",
                chats: [
                    {
                        id: 'DVWGr',
                        name: '訪客一號',
                        team: 'left',
                        avatar: 'cat-1.png',
                        msg: 'Redis 是記憶體式的鍵值對儲存資料庫，除了可作為應用程式的快取之外，因為 Redis 可提供額外運算處理，因此非常適合搭配關聯式資料庫使用，而 Azure Cache for Redis則是微軟的全託管記憶體資料儲存服務，使用Redis伺服器，原生支援字串、列表和雜湊等Redis資料結構，讓用戶不需要自己部署與管理資料庫，需要時即可快速啟動，並且按需求擴展規模。'
                    },
                    {
                        id: 'VerbEw',
                        name: '訪客二號',
                        team: 'right',
                        avatar: 'cat-2.png',
                        msg: '安安，萬華彭于晏～哪裡人？萬華彭于晏是真的嗎？'
                    },
                    {
                        id: 'Tfg',
                        name: '訪客一號',
                        team: 'left',
                        avatar: 'cat-1.png',
                        msg: '現在開發者就可以從 VS Code 市集中，下載 Azure Cache for Redis 擴充套件，用戶只要在擴充套件中登入 Azure 帳戶，便能夠從 Azure 訂閱中查看Azure Cache的資源，選擇執行個體就能檢視其中的資料庫以及資料，如果是叢集配置，用戶則會看到多個分片。'
                    },
                    {
                        id: 'fregesdfdsfetr',
                        name: '訪客一號',
                        team: 'left',
                        avatar: 'cat-1.png',
                        msg: '瑞士及美國大學研究發現藍牙標準存在一項漏洞，可使攻擊者突破藍牙內建的加密機制而駭入裝置，或發動中間人攻擊，目前這項漏洞並沒有修補程式。'
                    },
                    {
                        id: 'frsdfdsegeetr',
                        name: '訪客一號',
                        team: 'left',
                        avatar: 'cat-1.png',
                        msg: '這項漏洞編號列為 CVE-2020-15802，又被研究人員稱為 BLURtooth。相關的攻擊則被統稱為 BLUR 攻擊。它可用來發動多種攻擊，包括透過原本已配對的裝置，對另一臺裝置發動中間人攻擊（Man-in-the-Middle, MiTM），像是利用社交工程手法誘使用戶接受另一臺裝置藍牙配對。'
                    },
                    {
                        id: 'vsfv',
                        name: '訪客一號',
                        team: 'left',
                        avatar: 'cat-1.png',
                        msg: 'Fundo 總經理 John Gregg 表示，Fundo 的宗旨是建構一個虛擬活動與虛擬體驗的平臺，而且專為創作者所設計，該平臺上的所有活動都是即時且可互動，也能利用視訊聊天來營造碰面的情境，且只要透過手機或電腦就能進行；該平臺允許活動主持人設定入場券的票價或折扣條件，也可推出免費活動。'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

    .cursor-pointer {
        cursor: pointer;
    }

    .input-wrap {
        user-select: none;
        width: 70vw;
        padding: 10px;
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 20px;
        left: 50vw;
        transform: translateX(-50%);
        background-color: #b1a6a6;
    }

    .input-left {
        flex: 2;
        margin-right: 10px;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .input-right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .input {
        flex: 10;
        background-color: #b1a6a6;
        border-right-style: solid;
        border-left-style: solid;
        border-top-style: unset;
        border-bottom-style: unset;
        color: white;
        padding-left: 10px;
        font-size: 22px;
    }


    .chatroom {
        padding-bottom: 30px;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-color);
    }

    .avatar-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .msg-wrap {
        display: flex;
        margin-top: 10px;
    }

    .row-reverse {
        flex-direction: row-reverse;
    }

    .break-words {
        word-wrap: break-word;
    }

    .head-img {
        margin: 12px 16px 5px 16px;
        width: 50px;
        height: 50px;
    }

    .name-text {
        margin-left: 16px;
        margin-right: 16px;
        color: white;
    }

    .msg {
        color: white;
        max-width: 50vw;
        padding: 12px;
        margin: 8px 0 0 0;
        position: relative;
        border-radius: 5px;
        background-color: var(--msg-color);
    }

    /* css 三角形 : https://www.footmark.info/web-design/css/css-border-create-triangle/ */
    .msg.left::before {
        position: absolute;
        top: 15px;
        left: -27px;
        content: "";
        border-color: transparent var(--msg-color) transparent transparent;
        border-style: solid solid solid solid;
        border-width: 7px 15px 7px 15px;

        /* 設定 width、height 可更好理解原理 */
        height: 0;
        width: 0;
    }

    .msg.right::before {
        position: absolute;
        top: 15px;
        right: -27px;
        content: "";
        border-color: transparent transparent transparent var(--msg-color);
        border-style: solid solid solid solid;
        border-width: 7px 15px 7px 15px;

        /* 設定 width、height 可更好理解原理 */
        height: 0;
        width: 0;
    }

</style>
```

改動 `App.vue` 與 `Chatroom.vue` 後 , 執行 `npm run electron:serve` , 聊天室畫面完成了 ![haha-man](https://ithelp.ithome.com.tw/images/emoticon/emoticon01.gif)

![](https://i.imgur.com/rO6tbaN.png)

今天我們完成工程界的 `How to draw an owl` 教學 , 不過我們跟畫師比多一個步驟 , 真是太好了 ![haha-man](https://ithelp.ithome.com.tw/images/emoticon/emoticon39.gif)

![](https://i.imgur.com/DVzQn26.png)

如果想要了解 `vue.js` 如何完成一個聊天室可以參考邦友的 [vue.js 30天學習軌跡](https://ithelp.ithome.com.tw/users/20119787/ironman/2251) 然後加上個人的想像力 , 這樣就可以做出自己想要的聊天室了 ! 

## 題外話

在 chrome 上面有一個 [gitzip-for-github](https://chrome.google.com/webstore/detail/gitzip-for-github/ffabmkklhbepgcgfonabamgnfafbdlkn) 插件方便下載 github 上的指定資料夾

如果想了解 `gitzip-for-github` 如何使用可到 [gitzip 的官網](https://gitzip.org/) 看教學

## 參考資料

- [DongGuaLemon - f2e7week](https://github.com/DongGuaLemon/f2e7week)
- [使用 CSS border 製作梯形、三角形、對話框](https://www.footmark.info/web-design/css/css-border-create-triangle/)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```