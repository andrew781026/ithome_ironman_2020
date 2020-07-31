const Axios = require('axios');
const https = require('https');

/**
 * 結構化顯示資料
 * @param data {array} 回復資訊
 * @returns {void}
 */
function formatData(data) {

    /* response 參數對照表 :

        | Name  | Description                                   |
        | ----- | --------------------------------------------- |
        | tlong | epoch毫秒數                                    |
        | f     | 揭示賣量(配合「a」，以_分隔資料)                   |
        | ex    | 上市別(上市:tse，上櫃:otc，空白:已下市或下櫃)       |
        | g     | 揭示買量(配合「b」，以_分隔資料)                   |
        | d     | 最近交易日期(YYYYMMDD)                          |
        | b     | 揭示買價(從高到低，以_分隔資料)                    |
        | c     | 股票代號                                       |
        | a     | 揭示賣價(從低到高，以_分隔資料)                    |
        | n     | 公司簡稱                                       |
        | o     | 開盤                                          |
        | l     | 最低                                          |
        | h     | 最高                                          |
        | w     | 跌停價                                        |
        | v     | 累積成交量                                     |
        | u     | 漲停價                                        |
        | t     | 最近成交時刻(HH:MM:SS)                         |
        | tv    | 當盤成交量                                     |
        | nf    | 公司全名                                       |
        | z     | 當盤成交價                                     |
        | y     | 昨收                                          |
    */

    const formatSingle = single => `
        ${single.c} - ${single.n}
        現在價格  : ${single.z}
        開盤價    : ${single.o}
        最低     : ${single.l}
        最高     : ${single.h}
    `

    return data.map(formatSingle).join('\n');
}

/**
 * 股票物件組合查詢字串
 * @param stock {object} 股票物件
 * @returns {string}
 */
const getStockUrl = (stock) => {

    if (!stock) return '';
    else {

        const type = stock.type; // 上市別(上市:tse，上櫃:otc，空白:已下市或下櫃)
        const id = stock.id;     // 股票代號
        const date = stock.date; // 日期     | 選用參數，格式YYYYMMDD

        return `${type}_`
            + `${id}.tw`
            + (date ? `_${date}` : '');
    }
};

/**
 * 從證交所取得當日股票資料
 * @param stocks {array} 多個股票物件
 * @returns {object}
 */
async function getData(stocks = []) {

    const res = await Axios.get('https://mis.twse.com.tw/stock/api/getStockInfo.jsp',
        {
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
            params: {
                ex_ch: stocks.map(getStockUrl).join('|'),
            }
        });

    return res.data;
}

const searchStocks = [
    {
        id: '2330',
        date: null,
        type: 'tse',
    },
    {
        id: '2881',
        date: null,
        type: 'tse',
    }
];

getData(searchStocks)
    .then(data=>formatData(data.msgArray))
    .then(str => console.log('str=', str))
    .catch(err => console.error(err));
