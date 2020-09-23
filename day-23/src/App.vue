<template>
    <div id="app">
        <title-bar/>
        <chatroom/>
    </div>
</template>

<script>
    import Chatroom from './components/Chatroom.vue'
    import TitleBar from './components/TitleBar.vue'

    export default {
        name: 'App',
        components: {
            'chatroom': Chatroom,
            'title-bar': TitleBar,
        }
    }
</script>

<style>

    :root {
        --bg-color: #746c6c;
        --msg-color: #524A4A;
        --take-back-msg-color: #8F8989;
        --input-color: #968686;
        --title-bar-height: 50px;
    }

    .style-2::-webkit-scrollbar
    {
        display: none;
    }

    .style-2:hover::-webkit-scrollbar
    {
        display: block;
        width: 12px;
        background-color: #F5F5F5;
    }

    .style-2:hover::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #555;
        background: linear-gradient(90deg, #fff, #555 50%, #555 75%, #fff 100%);
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
</style>