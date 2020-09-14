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
    import faker from 'faker';

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
        created() {

            this.username = this.getUsername();
            this.avatar = this.getAvatar();

            console.log('this.username =', this.username);
            console.log('this.avatar =', this.avatar);
        },
        updated() {

            scrollToBottom();
        },
        methods: {
            getUsername() {

                // 從 localStorage 取得之前設定的名稱
                const savedName = localStorage.getItem("username");

                if (savedName) return savedName;
                else {

                    // random user name
                    const randomName = faker.name.findName(); // Rowan Nikolaus
                    localStorage.setItem("username", randomName);
                    return randomName;
                }
            },
            getAvatar() {

                const generateAvatar = () => {

                    const avatars = [
                        'cat-1.png', 'cat-2.png', 'cat-3.png', 'cat-4.png',
                        'dog-1.png', 'dog-2.png', 'dog-3.png', 'dog-4.png',
                    ];

                    // random avatar
                    return Math.floor(Math.random() * (avatars.length + 1));
                };

                // 從 localStorage 取得之前設定的名稱
                const savedAvatar = localStorage.getItem("avatar");

                if (savedAvatar) return savedAvatar;
                else {

                    const newAvatar = generateAvatar();
                    localStorage.setItem("avatar", newAvatar);
                    return newAvatar;
                }
            },
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
                username: '',
                avatar: '',
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