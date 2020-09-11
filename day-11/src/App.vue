<template>
    <div id="app" class="chatroom">
        <!-- cdn 參考資料 : https://google.github.io/material-design-icons/ -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet">
        <div v-for="(chat) in chats"
             :key="chat.id"
             class="msg-wrap"
             :class="[chat.team === 'right' && 'row-reverse']"
        >
            <div style="display: flex;flex-direction: column;align-items: center">
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
    </div>
</template>

<script>

    export default {
        name: 'App',
        methods: {
            imgSrc(avatar) {

                return require(`@/assets/head/${avatar}`);
            },
        },
        data() {

            return {
                chats: [
                    {
                        id: 'DVWGr',
                        name:'訪客一號',
                        team: 'left',
                        avatar: 'cat-1.png',
                        msg: 'Redis是記憶體式的鍵值對儲存資料庫，除了可作為應用程式的快取之外，因為Redis可提供額外運算處理，因此非常適合搭配關聯式資料庫使用，而Azure Cache for Redis則是微軟的全託管記憶體資料儲存服務，使用Redis伺服器，原生支援字串、列表和雜湊等Redis資料結構，讓用戶不需要自己部署與管理資料庫，需要時即可快速啟動，並且按需求擴展規模。'
                    },
                    {
                        id: 'VerbEw',
                        name:'訪客二號',
                        team: 'right',
                        avatar: 'cat-2.png',
                        msg: '安安，萬華彭于晏～哪裡人？萬華彭于晏是真的嗎？'
                    },
                    {
                        id: 'Tfg',
                        name:'訪客一號',
                        team: 'left',
                        avatar: 'cat-1.png',
                        msg: '現在開發者就可以從VS Code市集中，下載Azure Cache for Redis擴充套件，用戶只要在擴充套件中登入Azure帳戶，便能夠從Azure訂閱中查看Azure Cache的資源，選擇執行個體就能檢視其中的資料庫以及資料，如果是叢集配置，用戶則會看到多個分片。'
                    },
                ]
            }
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

    html, body {
        height: 100%;
    }

    body {
        margin: 0;
    }

    .chatroom {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-color);
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
