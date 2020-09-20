# [ Day 20 ] - 動物聊天室(十三) - firebase Auth 介紹

在 day-10 的時候我們將 firestore 的規則設定為 `write: if true;` 
這樣會造成只要知道此 API url 的人都可以修改我們 firestore 中的資料
因此需要將規則改成 `write: if request.auth != null;` 以提高安全性

而 `request.auth != null` 代表的是我們使用 firebase Auth 登入後 , 取得到的 auth Token , 
我們需要使用 firebase Auth 功能 , 讓我們的應用程式更加安全 , 
今天先初步介紹 firebase Auth 的使用方法 

> 第一步 , 在 Firebase 面板上開啟要使用的登入類型

![](https://i.imgur.com/etIyhNR.png)

例如我們要使用 `電子郵件/密碼` 做登入 , 需要開啟  `電子郵件/密碼` 這個功能

![](https://i.imgur.com/7du703i.png)

> 第二步 , 與 firestore 相同需要做 cdn 引入

```html
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>

<!-- Add Firebase products that you want to use -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-auth.js"></script>
```

> 第三步 , 初始化 firebase 與利用 JS 做登入

```javascript
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "### FIREBASE API KEY ###",
    authDomain: "ezoom-test.firebaseapp.com",
    databaseURL: "https://ezoom-test.firebaseio.com",
    projectId: "ezoom-test",
    storageBucket: "ezoom-test.appspot.com",
    messagingSenderId: "653212361558",
    appId: "1:653212361558:web:c3163679b79dd7f358acf7"
});

  const loginWithEmailAndPassword = (email, password) => {

            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    if (user) {

                        console.log('user=', user);

                        // User is signed in.
                        var displayName = user.displayName;
                        var email = user.email;
                        var emailVerified = user.emailVerified;
                        var photoURL = user.photoURL;
                        var isAnonymous = user.isAnonymous;
                        var uid = user.uid;
                        var providerData = user.providerData;
                        // ...
                    } else {
                        // User is signed out.
                        // ...
                    }
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    console.error('error=', error);
                });
        };
```

#### 成果

![](https://i.imgur.com/vEomGE4.png)

之後 , 我們可以在登入之後再進行 firestore 資料的操作 , 這樣資料的安全型較高

#### 其他 

下方列表我們可以用 firebase Auth 與那些帳號做連動

- Facebook
- Google
- Twitter
- Github
- Yahoo
- Microsoft
- Apple

## 參考資料

- [Firebase 身份驗證](https://firebase.google.com/docs/auth)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
