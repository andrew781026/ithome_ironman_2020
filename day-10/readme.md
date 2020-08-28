# 第十天 - firestore 使用說明

設定 firestore 
1.建立專案 -> 開啟 firestore 的使用

下載 serverAccountKey.json 

=> Setting - 服務帳戶 - Firebase Admin SDK - 產生新的私密金鑰

![](https://i.imgur.com/OwMlFjj.png)
![](https://i.imgur.com/wH85IbC.png)
![](https://i.imgur.com/ksSeJkj.png)


如果使用 git 別忘了在 .gitignore 中加上 serverAccountKey.json 
告訴 git 不要上傳 serverAccountKey.json 含有 privateKey 資訊的檔案

## 參考資料

[Firebase 教學 - Node.js 操作 Firestore](https://www.oxxostudio.tw/articles/201907/firebase-nodejs-firestore.html)