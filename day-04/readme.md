# 第二天 - 股票查價(二) - 利用 twse API , 取得當日股票資訊

我們的股票資訊將從證交所那取得 , 以下說明取得方式

- 列表所有的上市股票資料

https://www.twse.com.tw/zh/api/codeQuery?query=[股票代碼或公司簡稱]

參數說明 : query - 股票代碼或公司簡稱 , "" 代表查出前 200 筆資料

回傳資訊 : 
```json
{
    "query": "台",
    "suggestions": [
        "0050\t元大台灣50",
        "0054\t元大台商50",
        "0057\t富邦摩台",
        "0060\t新台灣",
        "006203\t元大MSCI台灣",
        "006208\t富邦台50",
        ...
    ]
}
```

目前的證交所即時資訊API的URL格式(JSON格式)為 :
https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=參數&json=1&delay=0

`參數 = 上市別_證券代碼.tw[_日期]`

| Part     | Description                                                  |
| -------- | ------------------------------------------------------------ |
| 上市別   | 必需參數  <br/> 上市為tse <br/> 上櫃為otc                     |
| 證券代碼 | 必需參數  <br/> 例如 : <br/> 台積電 : 2330.tw <br/>環球晶 : 6488.tw <br/>上市加權指數 : t00.tw <br/>櫃買指數 : o00.tw |
| 日期     | 選用參數，格式YYYYMMDD                                       |

註:若要一次取得多個即時資料，參數請用「|」分隔
例如:取得台積電與環球晶，參數 = tse_2330.tw|otc_6488.tw

台積電即時資訊 : 
https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw&json=1&delay=0

環球晶即時資訊 : 
https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=otc_6488.tw&json=1&delay=0

2019年12月11日的台積電資訊 : 
https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw_20191212&json=1&delay=0

上市加權指數即時資訊 : 
https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_t00.tw&json=1&delay=0

櫃買指數即時資訊 : 
https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=otc_o00.tw&json=1&delay=0

取得台積電與環球晶即時資訊:
https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw|otc_6488.tw&json=1&delay=0

成功取得資訊時，應該會取得如下的JSON格式資料
```json=
{
  "msgArray":
  [
    {
      "ts":"0",
      "tk0":"2330.tw_tse_20200106_B_9999280689",
      "tk1":"2330.tw_tse_20200106_B_9999280433",
      "tlong":"1578282160000",
      "f":"1122_1149_759_705_625_",
      "ex":"tse",
      "g":"1400_1778_678_1226_873_",
      "d":"20200106",
      "it":"12",
      "b":"332.50_332.00_331.50_331.00_330.50_",
      "c":"2330",
      "mt":"868332",
      "a":"333.00_333.50_334.00_334.50_335.00_",
      "n":"台積電",
      "o":"333.00",
      "l":"332.50",
      "h":"334.50",
      "ip":"0",
      "i":"24",
      "w":"306.00",
      "v":"29121",
      "u":"373.00",
      "t":"11:42:40",
      "s":"4",
      "pz":"333.00",
      "tv":"4",
      "p":"0",
      "nf":"台灣積體電路製造股份有限公司",
      "ch":"2330.tw",
      "z":"333.00",
      "y":"339.50",
      "ps":"2304"
    }
  ],
  "userDelay":5000,
  "rtmessage":"OK",
  "referer":"",
  "queryTime":
  {
    "sysTime":"11:42:44",
    "sessionLatestTime":-1,
    "sysDate":"20200106",
    "sessionFromTime":-1,
    "stockInfoItem":2607,
    "showChart":false,
    "sessionStr":"UserSession",
    "stockInfo":388257
  },
  "rtcode":"0000"
 }
```

`response` 參數對照表 :

| Name  | Description                                   |
| ----- | --------------------------------------------- |
| tlong | epoch毫秒數                                   |
| f     | 揭示賣量(配合「a」，以_分隔資料)              |
| ex    | 上市別(上市:tse，上櫃:otc，空白:已下市或下櫃) |
| g     | 揭示買量(配合「b」，以_分隔資料)              |
| d     | 最近交易日期(YYYYMMDD)                        |
| b     | 揭示買價(從高到低，以_分隔資料)               |
| c     | 股票代號                                      |
| a     | 揭示賣價(從低到高，以_分隔資料)               |
| n     | 公司簡稱                                      |
| o     | 開盤                                          |
| l     | 最低                                          |
| h     | 最高                                          |
| w     | 跌停價                                        |
| v     | 累積成交量                                    |
| u     | 漲停價                                        |
| t     | 最近成交時刻(HH:MM:SS)                        |
| tv    | 當盤成交量                                    |
| nf    | 公司全名                                      |
| z     | 當盤成交價                                    |
| y     | 昨收                                          |


## 參考資料

- ( [ZY's notes](https://zys-notes.blogspot.com/) - 證交所即時資訊API)[https://zys-notes.blogspot.com/2020/01/api.html]