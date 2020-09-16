# [ Day 10 ] - 動物聊天室(三) - firestore 介紹

```
原本以為 firebase-admin 套件可以在 electron+vue 上面簡單運作
但是 , 經過多方嘗試 , 本魯無法解決 firebase-admin 中的一些 ERROR 狀況
因此 , 修改 day-10 的文章 , 不再使用 firebase-admin ,
而改用 firebase@7.20 , 如果此改動造成邦友的負擔 , 小弟在此道歉  <(_ _)>
```

動物聊天室預計使用 firebase 的 firestore 當作資料庫儲存歷史聊天紀錄

## 使用 web 前端做 firestore 

> Step 1 . 安裝 firebase@7.20

```html
<!-- add below cdn of firebase.js -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>

<!-- Add Firebase products that you want to use -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-firestore.js"></script>
```

or

```shell script
# 本機安裝 firebase@7.20
$ npm install firebase@7.20.0 --save
```

> Step 2 . 設定 firebase 的連線資訊

這個步驟我們需要先到 firebase 的控制面板找出我們的連線資訊 firebaseConfig

use the panel > 設定 > 一般設定 > 您的應用程式

![](https://i.imgur.com/YYAZoWa.png)

script 區塊中設定 firebaseConfig

```javascript
// Set the firebaseConfig 
const firebaseConfig = {
    apiKey: "### FIREBASE API KEY ###",
    authDomain: "ezoom-test.firebaseapp.com",
    databaseURL: "https://ezoom-test.firebaseio.com",
    projectId: "ezoom-test",
    storageBucket: "ezoom-test.appspot.com",
    messagingSenderId: "653212361558",
    appId: "1:653212361558:web:c3163679b79dd7f358acf7"
}

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

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

這時我們可能會在 devtool 中看到 `FirebaseError: Missing or insufficient permissions.` 的錯誤訊息 

![](https://i.imgur.com/cG2kxk2.png)

這是因為預設的 firestore 規則 , 不允許寫入資料 , 
因此我們需要修改 firestore 規則 , 准許寫入資料 `write: if true`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
         allow read, write: if true;
    }
  }
}
```

修改後的規則如下圖所示

![](https://i.imgur.com/b5odFk1.png)

回到 html 我們可以看到資料成功 added

![](https://i.imgur.com/34eNpE5.png)

如果我們想要取得 collection("users") 中的所有資料 ,   
且新增資料時收到通知 , 需要設定 observer

```javascript
// 監聽 collection users 新增 . 刪除 . 修改的實時訊息
const observer = db.collection('users').onSnapshot(docSnapshot => {

    docSnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            console.log('New user: ', change.doc.data());
        }
        if (change.type === 'modified') {
            console.log('Modified user: ', change.doc.data());
        }
        if (change.type === 'removed') {
            console.log('Removed user: ', change.doc.data());
        }
    });

}, err => {
    console.log(`Encountered error: ${err}`);
});

// Stop listening for changes
// observer();
```

追加 observer 後 , 有新的 user 加入時 , 都會收到通知

![](https://i.imgur.com/Okv6hgs.png)

## 參考資料

- [Firebase 官方文件 - firestore](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase 官方文件 - auth](https://firebase.google.com/docs/auth/web/anonymous-auth)