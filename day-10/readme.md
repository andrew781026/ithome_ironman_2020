# [ Day 10 ] -  動物聊天室(三) - firestore 與貓狗聊天訊息 

動物聊天室預計使用 firebase 的 firestore 當作資料庫儲存歷史聊天紀錄

## 申請 firestore 與取得 serverAccountKey

設定 firestore 
1.建立專案 -> 開啟 firestore 的使用

下載 serverAccountKey.json 

=> Setting - 服務帳戶 - Firebase Admin SDK - 產生新的私密金鑰

![](https://i.imgur.com/OjsROLX.png)

如果使用 git 別忘了在 .gitignore 中加上 上有    
告訴 git 不要上傳 serverAccountKey.json 含有 privateKey 資訊的檔案    
以免 google 偵測到 github 上有公開的 serverAccountKey.json   
而把這組 serverAccountKey.json 停權 ,  
之後就無法使用這組  serverAccountKey.json 訪問 firestore 了 !

## firestore API 設定與使用

> 安裝 firebase-admin 套件
```shell script
# 安裝 firebase-admin 套件
$ npm i -s firebase-admin
```

> 設定 firestore 的 API-KEY

```javascript
const admin = require('firebase-admin');

const serviceAccount = require("./serviceAccountKey.json"); // 載入 serviceAccountKey.json

admin.initializeApp({
    projectId:'ezoom-test',
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ezoom-test.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;
```

> 如果要接收聊天訊息 , 設定 receiver.js 

```javascript
// receiver.js 
const db = require('./firestore');

// 監聽 chat 的變化
const doc = db.collection('chatroom');

// 監聽各自不同的 chatroom 新增 . 刪除 . 修改的實時訊息
const observer = doc.onSnapshot(docSnapshot => {

    docSnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            console.log('New message: ', change.doc.data());
        }
        if (change.type === 'modified') {
            console.log('Modified message: ', change.doc.data());
        }
        if (change.type === 'removed') {
            console.log('Removed message: ', change.doc.data());
        }
    });

}, err => {
    console.log(`Encountered error: ${err}`);
});

// Stop listening for changes
// observer();
```


> 如果要發送聊天訊息 , 設定 sender.js 

```javascript
const db = require('./firestore');

const chatRef = db.collection('chatroom').doc('room-1');

const sendOneMessage = async () => {

    await chatRef.doc('John').set({
        name: 'Taipei',
        state: 'TP',
        country: 'TWD',
        capital: false,
        population: 42000
    });
};

sendOneMessage().catch(err => console.error(err));
```

之後會將畫面與 firestore 功能連接


## 參考資料

[Firebase 教學 - Node.js 操作 Firestore](https://www.oxxostudio.tw/articles/201907/firebase-nodejs-firestore.html)