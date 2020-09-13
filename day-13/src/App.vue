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