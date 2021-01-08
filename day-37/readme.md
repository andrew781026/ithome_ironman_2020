# [ Day 37 ] - 在 Github Release 上發布我們的安裝檔

之前本魯都將打包出來的安裝檔 , 放到 git 中上傳到 github 中

來產生一個公開連結讓邦友們能下載安裝檔

最近 , 本魯在瀏覽 `electron` 的 github 時候 , 發現了 [Github Release](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-releases-in-a-repository)

![](https://i.imgur.com/UyFK0sx.png)

我就想說 , 也許我要分享的 Electron 安裝檔 , 可以用 [Github Release](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-releases-in-a-repository) 做分享

這樣就不需要將安裝檔加到 git 中 ,

造成每次新電腦 clone 專案時都要下載很久 （πーπ）

---

今天我們就來看圖說故事 , 了解一下 [Github Release](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-releases-in-a-repository) 要如何使用吧 !

## 介面說明

在你的 github 專案中 ,

![](https://i.imgur.com/7mt5vXx.png)

右側有個 Release 的區塊可以進入 Github Release 管理頁面

![進入 Release](https://i.imgur.com/sxUGyiL.png)

![Github-Release 頁面](https://i.imgur.com/eqfdLW6.png)

在  Github Release 管理頁面中 , 我們可以看到之前發布的應用程式 , 每次發布的訊息分為幾個區塊

![](https://i.imgur.com/AZgXTmg.png)

- [1] 發布類型 : `Pre-release` . `Latest release` . none (一般發布)
- [2] 版本標籤 : `v0.2-alpha` or `v1.0` 
- [3] 標題 : 此版本的標題 `electron v11.1.1`
- [4] 備註 : 描述此版本的資訊細節 ( 支援 Markdown 語法 )
- [5] 檔案下載區 : 選擇對應平台的應用程式安裝 or 執行檔 , 將其下載

## 發布流程

在你的 github 專案中 ,

右側有個 Release 的區塊可以進入 Github Release 管理頁面

![進入 Release](https://i.imgur.com/sxUGyiL.png)

![Github-Release 頁面](https://i.imgur.com/eqfdLW6.png)

### 新增

![進入新增 Release](https://i.imgur.com/IJhymu0.png)

![新增 Release 介面](https://i.imgur.com/ZwnuUmv.png)

下方解說 5 個欄位代表的意義 :

#### 1.輸入版本

> 官方版本輸入建議

- 正式的版本 : 可以輸入 v 在前方 ( ex : `v1.0` 或 `v2.3.4` )

- 非正式版本 : 你可以勾選 "This is a pre-release" 的 checkbox ,
  且在版本後方附帶 -alpha 或 -beta.3 ...等 ( ex : `v0.2-alpha` 或 `v5.9-beta.3.` )

#### 2.標題

輸入的文字將顯示在標題區域

![標題](https://i.imgur.com/2NWslxv.png)

#### 3.備註

描述此版本的資訊細節 ( 支援 Markdown 語法 )

![備註](https://i.imgur.com/5rB4SUe.png)

#### 4.檔案上傳

4.1.拖曳 or 選擇安裝檔

![pick upload exe](https://i.imgur.com/bfBEB8s.png)

4.2.上傳中

![Uploading exe](https://i.imgur.com/XhnoQgA.png)

4.3.修改顯示名稱

![edit the name of exe](https://i.imgur.com/SoV902O.png)

> 當然 , 你可以在同一個 release 中上傳多個安裝檔

![multi uploader](https://i.imgur.com/wcK4KCj.png)

#### 5.暫存草稿 & 發布

最下方的 2 個按鈕 :

- Publish release - 發布 release , 將安裝檔公開給所有人下載
- Save draft - 暫存 , 暫存資訊只有本人看的到

5.1.0.暫存草稿

![發布或暫存草稿](https://i.imgur.com/hPxnY73.png)

5.1.1.草稿使用

![草稿頁面](https://i.imgur.com/aoHWaSY.png)

![編輯草稿頁面](https://i.imgur.com/swb07S0.png)

5.1.2.發布草稿

![發布草稿](https://i.imgur.com/W4Aasum.png)

5.1.3.發布完成

![發布完成](https://i.imgur.com/yhn4fmv.png)

## 成品展示

如果順利建立 release 的話 , 你可以看到自己的 [EXE 發布頁面](https://github.com/andrew781026/certbot-gui/releases/tag/v0.0.1-alpha)

![EXE 發布頁面圖示](https://i.imgur.com/yhn4fmv.png)

---

## 參考資料

- [如何自動化 GitHub Releases 流程](https://tech.hahow.in/%E5%A6%82%E4%BD%95%E8%87%AA%E5%8B%95%E5%8C%96-github-releases-%E6%B5%81%E7%A8%8B-6e7e33b61169)
- [Creating Releases 创建发布包](https://github.com/waylau/github-help/blob/master/Creating%20Releases%20%E5%88%9B%E5%BB%BA%E5%8F%91%E5%B8%83%E5%8C%85.md)
- [官方 GitHub Releases 教學](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-releases-in-a-repository)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
