# [ Day 20 ] - 動物聊天室(十三) - firebase Auth 與使用者登入

在 day-10 的時候我們將 firestore 的規則設定為 `write: if true;` 
這樣會造成只要知道此 API url 的人都可以修改我們 firestore 中的資料
因此需要將規則改成 `write: if request.auth != null;` 以提高安全性

而 `request.auth != null` 代表的是我們使用 firebase Auth 登入後 , 取得到的 auth Token , 
我們需要使用 firebase Auth 功能

> 第一步 , 在 Firebase 面板上開啟要使用的登入類型

![](https://i.imgur.com/etIyhNR.png)

例如我們使用 `電子郵件/密碼` 做登入 , 就開啟功能 , 然後在 BrowserWindow 上做 WEB 端利用 JS 進行登入動作

```javascript
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
```

登出

```javascript
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
```

之後 , 我們可以在登入之後再進行 firestore 資料的操作 , 這樣資料的安全型較高

## 參考資料

- [Firebase 身份驗證](https://firebase.google.com/docs/auth)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
