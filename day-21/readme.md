# [ Day 21 ] - 動物聊天室(十四) - 登入畫面

昨天介紹登入功能 , 今天來串接畫面

### 新增 Login.vue 

```html
<template>
    <div class="root">
        <div class="login">
            <div class="left">
                <b-form-group>
                    <b-form-radio-group
                            id="btn-radios-1"
                            v-model="selected"
                            :options="options"
                            buttons
                            stacked
                            name="radios-btn-default"
                            @input="animal"
                    ></b-form-radio-group>
                </b-form-group>
            </div>
            <div class="main">
                <span class="welcome">WELCOME</span>
                <h6 style="color:white">阿貓阿狗聊天室</h6>
                <div>
                    <img class="imgs" :src="require(`../assets/body/${mainimg}.png`)"/>
                </div>
                <input class="nickname" v-model="Nickname" placeholder="輸入暱稱"/>
                <button class="intochat" @click="login">進入聊天</button>
            </div>
            <div class="right">
                <div class="face" v-for="(item,index) in list" @click="changeimg(index)" :key="index">
                    <img class="imgs" style="height: 70px" :src="require(`../assets/body/${item.src}-${index+1}.png`)" alt/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: "dog",
                options: [{text: "狗狗", value: "dog"}, {text: "貓貓", value: "cat"}],
                list: [
                    {label: "dog", src: 'dog'},
                    {label: "dog", src: 'dog'},
                    {label: "dog", src: 'dog'},
                    {label: "dog", src: 'dog'}
                ],
                mainimg: 'dog-1',
                Nickname: ""
            };
        },
        methods: {
            login() {
                if (this.Nickname != "") {
                    this.$router.push({name: "chat", params: {id: this.Nickname, img: this.mainimg}});
                } else {
                    alert('請輸入暱稱')
                }
            },
            changeimg(i) {
                this.mainimg = this.list[i].src + '-' + (i + 1)
            },
            animal() {
                for (let i in this.list) {
                    this.list[i].src = this.selected
                    this.mainimg = this.selected + '-1'
                }
            }
        },
    };
</script>
<style>
    .root{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #655C5C;
        height: calc(100vh - var(--title-bar-height));
    }

    .login {
        width: 60%;
        height: 70%;
        background-color: #524a4a;
        border-radius: 5px;
        display: flex;
        justify-content: space-around;
    }

    .main {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .welcome {
        font-size: 35px;
        letter-spacing: 0.92px;
        font-weight: bold;
        color: white;
    }

    .left {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn {
        margin-bottom: 20px !important;
    }

    .btn-secondary {
        background-color: unset !important;
        border-color: rgb(150, 137, 137) !important;
        border: 3px solid !important;
        border-radius: 5px !important;
    }

    .btn-secondary:hover {
        background-color: #5a6268 !important;
    }

    .btn-secondary:not(:disabled):not(.disabled).active,
    .show > .btn-secondary.dropdown-toggle {
        border-color: #fcaa72 !important;
    }

    .face {
        width: 75px;
        height: 20%;
        border-radius: 5px;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
    }

    .imgs {
        height: calc(100% - 10px);
    }

    .nickname {
        background-color: #645b5b;
        border: 0;
        color: white;
        padding-left: 10px;
        border-radius: 3px;
        width: 250px;
    }

    .intochat {
        background-color: #ffffff;
        border: 0px;
        border-radius: 15px;
        width: 100px;
        height: 25px;
    }
</style>
```

### 將 vue-router 載入使用

```shell script
$ npm i -s vue-router
```

### 設定 vue-router 

```javascript
// ./router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/chatroom',
        name: 'chatroom',
        component: () => import ('../components/Chatroom.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import ('../components/Login.vue')
    },
    {path: '*', redirect: {name: 'login'}},
];

const router = new VueRouter({
    routes
});

export default router
```

### 在 App.vue 中使用 vue-router

```diff
<template>
    <div id="app">
        <title-bar/>
-        <chatroom/>
+        <router-view/>
    </div>
</template>
```

### 成果

![](https://i.imgur.com/qrKphSJ.png)

## 參考資料

- [Firebase 身份驗證](https://firebase.google.com/docs/auth)
- [DongGuaLemon - f2e7week](https://github.com/DongGuaLemon/f2e7week)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
