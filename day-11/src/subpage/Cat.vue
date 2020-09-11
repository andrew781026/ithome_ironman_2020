<template>
    <img class="img" :src="showImg" alt="cat">
</template>

<script>
    export default {
        name: "Cat",
        mounted() {

            window.ipcRenderer.on('switch-cat', (event, cat) => {

                this.showImg = require(`@/assets/big/${cat}`);
            });
        },
        data() {

            return {
                showImg: require('@/assets/big/cat-01.gif'),
            }
        }
    }
</script>

<style>
    body {
        user-select: none;
        -webkit-app-region: drag;
    }
</style>