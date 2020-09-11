<template>
    <div id="app">
        <div class="button-wrap">
            <div class="button" role="button"
                 v-for="cat in cats" :key="cat"
                 @click="changeBigImg(cat)"
            >
                <img :src="imgSrc(cat)" :alt="cat" draggable="false">
            </div>
        </div>
        <img class="img" :src="showImg" alt="cat" draggable="false">
    </div>
</template>

<script>

    export default {
        name: 'App',
        methods: {
            imgSrc(cat) {

                return require(`@/assets/button/${cat}`);
            },
            changeBigImg(cat) {

                this.showImg = require(`@/assets/big/${cat}`);
                window.ipcRenderer.send('switch-cat', cat);
            }
        },
        data() {

            return {
                showImg: require('@/assets/big/cat-01.gif'),
                cats: [
                    'cat-01.gif',
                    'cat-02.gif',
                    'cat-03.gif',
                    'cat-04.gif',
                    'cat-05.gif',
                    'cat-06.gif',
                ]
            }
        }
    }
</script>

<style>

    * {
        box-sizing: border-box;
    }

    html, body, #app {
        height: 100%;
    }

    body {
        margin: 0;
    }

    .button-wrap {
        user-select: none;
        padding-top: 20px;
        display: flex;
        width: 100vw;
        justify-content: space-evenly;
    }

    .button {
        cursor: pointer;
        padding: 10px;
        background-color: #76d245;
        border-radius: 50%;
        /* offset-x | offset-y | blur-radius | spread-radius | color */
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }

    .button:hover {
        background-color: #62be31;
    }

    .button:active {
        background-color: #3a9609;
    }

    .img {
        height: calc(100% - 140px);
        width: 100vw;
    }

</style>
