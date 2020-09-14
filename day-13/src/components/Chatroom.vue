<template>
    <div class="chatroom">
        <div v-for="(chat) in chats"
             :key="chat.uuid"
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
    import firebase from 'firebase';
    import firestoreUtils from '../firestore/firestoreUtils';

    const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

    export default {
        name: "Chatroom",
        updated() {

            scrollToBottom();
        },
        mounted() {

            firebase.auth()
                .signInAnonymously()
                .then(user => {

                    // User is signed in.
                    // const isAnonymous = user.isAnonymous;
                    // const uid = user.uid;
                    window.localStorage.setItem('user', user);

                    firestoreUtils.observer
                        .observeRoom(this.roomId)
                        .on('new-message', msg => this.chats.push(msg))
                        .on('update-message', msg => {

                            const index = this.chats.findIndex(chat => chat.uuid === msg.uuid);
                            this.chats.splice(index, 1, msg);
                        })
                        .on('delete-message', msg => {

                            const index = this.chats.findIndex(chat => chat.uuid === msg.uuid);
                            this.chats.splice(index, 1);
                        });
                })
                .catch();

        },
        methods: {
            imgSrc(avatar) {

                return require(`@/assets/head/${avatar}`);
            },
            submit() {

                if (this.text) {

                    const message = {
                        name: '你',
                        team: 'right',
                        avatar: 'cat-3.png',
                        msg: this.text
                    }

                    firestoreUtils.sender
                        .addMessage(this.roomId, message)
                        .catch(e => console.error(e));

                    this.text = '';
                }
            }
        },
        data() {

            return {
                roomId: 'init-room',
                text: "",
                chats: []
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