<template>
    <header class="ui-titlebar">
        <div class="ui-titletext">Window title</div>
        <div class="ui-titlecontrols">
            <button class="ui-btn minimize">
                <i class="flaticon-minus"></i>
            </button>
            <button class="ui-btn maximize">
                <i class="flaticon-size"></i>
            </button>
            <button class="ui-btn close">
                <i class="flaticon-clear"></i>
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
        }
    }
</script>

<style scoped>

    .ui-titlebar {
        display: flex;
        width: 100%;
        height: 50px;
        background: #0072c6;
        user-select: none;
        cursor: pointer;
    }

    .ui-titletext {
        -webkit-app-region: drag;
        flex-grow: 2;
        max-height: 20px;
        width: auto;
        font: 12px/20px "Segoe UI", Arial, sans-serif;
        color: #fff;
        text-indent: 10px;
    }

    .ui-titlecontrols {
        font-size: 30px;
    }

    .ui-btn {
        text-align: center;
        height: 100%;
        margin: 0;
        border: 0;
        outline: 0;
        background: transparent;
    }

    .ui-btn:hover {
        background: rgba(255, 255, 255, .1);
    }

    .ui-btn.close:hover {
        background: #e81123;
    }

    .ui-btn svg path,
    .ui-btn svg rect,
    .ui-btn svg polygon {
        fill: #fff;
    }

    .ui-btn svg {
        width: 10px;
        height: 10px;
    }

</style>
