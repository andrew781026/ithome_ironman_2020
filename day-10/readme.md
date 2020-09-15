# [ Day 10 ] -  動物聊天室(三) - firestore 與貓狗聊天訊息 

```
原本以為 firebase-admin 套件可以在 electron+vue 上面簡單運作
但是 , 經過多方嘗試 , 本魯無法解決 firebase-admin 中的一些 ERROR 狀況
因此 , 修改 day-10 的文章 , 不再使用 firebase-admin ,
而改用 firebase@7.20 , 如果此改動造成邦友的負擔 , 小弟在此道歉  <(_ _)>
```

動物聊天室預計使用 firebase 的 firestore 當作資料庫儲存歷史聊天紀錄

## 使用 web 前端做 firestore 

```html
<!-- add below cdn of firebase.js -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-firestore.js"></script>
```

or

```shell script
# 安裝 firebase@7.20
$ npm install firebase@7.20.0 --save
```

```javascript
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

var db = firebase.firestore();

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
```

use the panel 設定 > 一般設定 > 您的應用程式

![](https://i.imgur.com/dcxYurP.png)

=> 直接使用 firestore -> 無法使用 -> 修改 firestore 的規則

將其改成登入使用者可以使用

=> 使用 signInAnonymously 做匿名登入

```javascript
firebase.auth().signInAnonymously()
.then(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
```

## 參考資料

- [Firebase 官方文件 - firestore](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase 官方文件 - auth](https://firebase.google.com/docs/auth/web/anonymous-auth)