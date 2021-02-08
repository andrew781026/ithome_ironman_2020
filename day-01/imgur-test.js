// 文件位置 : https://apidocs.imgur.com/#3c981acf-47aa-488f-b068-269f65aee3ce
// https://imgur.com/?state=OPEN#access_token=8e149ade420da1e7c8d202b2dfcb31f43c44caa0&expires_in=315360000&token_type=bearer&refresh_token=4b94e0aae0d5c147e9d9f6e54745ee6b55931f13&account_username=andrew781026&account_id=145068387

const user_data = {
    state: 'OPEN',
    access_token: '8e149ade420da1e7c8d202b2dfcb31f43c44caa0',
    expires_in: '315360000',
    token_type: 'bearer',
    refresh_token: '4b94e0aae0d5c147e9d9f6e54745ee6b55931f13',
    account_id: '145068387'
}
/*
Authorization: Client-ID YOUR_CLIENT_ID

For accessing a user's account, please visit the OAuth2 section of the docs.

Client ID:
    e44eb24af9a837a
Client secret:
    0abe6a2752010761cd4469490c372557fd8f0f90
*/


/*
文件位置 : https://apidocs.imgur.com/#3c981acf-47aa-488f-b068-269f65aee3ce
Imgur 取得圖片 : https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/{{page}}?q=cats

Parameters
Key	Required	Value
sort	optional	time | viral | top - defaults to time
window	optional	Change the date range of the request if the sort is 'top', day | week | month | year | all, defaults to all.
page	optional	integer - the data paging number
Simple Search Query Parameters
Key	Value
q	Query string (note: if advanced search parameters are set, this query string is ignored). This parameter also supports boolean operators (AND, OR, NOT) and indices (tag: user: title: ext: subreddit: album: meme:). An example compound query would be 'title: cats AND dogs ext: gif'

* */

/*

  使用 Imgur 去製作 CURD

  - 新增
  - 刪除
  - 修改
  - 查詢
* */

// imgur API 參考資料 : https://letswrite.tw/imgur-api-upload-load/
// node-imgur : https://github.com/kaimallea/node-imgur
