<template>
    <div>
        <div class="emoji-list-wrap">
            <div v-for="(emoji) in emojis" :key="emoji"
                 class="emoji"
                 @click="chooseEmoji(emoji)" title="">{{emoji}}
            </div>
        </div>
        <div class="emoji-list-triangle"></div>
    </div>
</template>

<script>
    export default {
        name: "EmojiList",
        computed: {

            emojis() {

                return '😀 😃 😄 😁 😆 😅 😂 🤣 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 😖'.split(' ');
            },
        },
        methods: {
            chooseEmoji(emoji) {

                this.$emit('choose', emoji);
            },
        }
    }
</script>

<style scoped>

    .emoji-list-wrap {

        display: flex;
        flex-wrap: wrap;
        position: absolute;
        bottom: 40px;
        left: -30px;
        width: 120px;
        height: 120px;
        padding: 10px;
        overflow: auto;
        background-color: #574040;
    }

    .emoji-list-triangle {
        position: absolute;
        bottom: 10px;
        left: 23px;
        border-color: #574040 transparent transparent transparent;
        border-style: solid solid solid solid;
        border-width: 15px 7px 15px 7px;

        /* 設定 width、height 可更好理解原理 */
        height: 0;
        width: 0;
    }

    .emoji {

        transition: all 0.3s;
    }

    .emoji:hover {

        transform: scale(1.5);
    }
</style>