<template>
    <header class="ui-titlebar">
        <div class="ui-titletext">
            {{title}}
        </div>
        <div class="ui-titlecontrols">
            <button class="ui-btn minimize" @click="min" title="縮小">
                <i class="flaticon flaticon-minus"></i>
            </button>
            <button class="ui-btn maximize" @click="max" title="全螢幕">
                <i class="flaticon flaticon-size"></i>
            </button>
            <button class="ui-btn close" @click="close" title="關閉">
                <i class="flaticon flaticon-clear"></i>
            </button>
        </div>
    </header>
</template>

<script>
    export default {
        name: "TitleBar",
        methods: {
            min() {

                window.ipcRenderer.send('minimize');
            },
            max() {

                window.ipcRenderer.send('maximize');
            },
            close() {

                window.ipcRenderer.send('close');
            },
        },
        computed: {
            title() {

                return document.title;
            }
        }
    }
</script>

<style scoped>

    .ui-titlebar {
        display: flex;
        width: 100%;
        height: var(--title-bar-height);
        background: #333;
        user-select: none;
        cursor: pointer;
    }

    .ui-titletext {
        -webkit-app-region: drag;
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 15px;
        font-size: 30px;
        color: #fff;
    }

    .ui-titlecontrols {
        font-size: 30px;
    }

    .ui-btn {
        height: 100%;
        border: 0;
        outline: 0;
        background: transparent;
        color: white;
    }

    .ui-btn:hover {
        background: rgba(255, 255, 255, .1);
    }

    .ui-btn.close:hover {
        background: #e81123;
    }

    .ui-btn.close:active {
        background: #b10d1b;
    }
</style>
