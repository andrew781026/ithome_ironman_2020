// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {ipcRenderer} = require('electron');

window.ipcRenderer = ipcRenderer;

window.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById('stockId');
    const dropDown = document.getElementById('drop-down-wrapper');
    const card = document.getElementById('stock-card');
    const searchBtn = document.getElementById('searchBtn');
    let queryStocks = [];

    const renderDropDown = () => {

        const q = input.value;

        dropDown.innerHTML = '';

        const getMsgSpan = (stock, q) => {

            const msg = `${stock.id}(${stock.name})`;
            const result = msg.split('')
                .map(char => (q && q.indexOf(char) > -1) ? `<span class="text-red">${char}</span>` : `<span>${char}</span>`)
                .reduce((pre, curr) => pre + curr, '');

            return result;
        }

        const getItemHtml = (stock, q) => `<div class="item" onclick="window.getStockInfo('${stock.id}')">
                                            ${getMsgSpan(stock, q)}
                                         </div>`;

        queryStocks.forEach(stock => dropDown.insertAdjacentHTML('beforeend', getItemHtml(stock, q)));
    };

    const renderStockCard = (stockInfo) => {

        if (!stockInfo) {

            card.innerHTML = `<div class="card-header">
            </div>
            <div class="card-body text-red">
                無符合資料
            </div>
            <div class="card-footer">
            </div>`;

        } else {

            const diffPrice = stockInfo.currentPrice - stockInfo.openPrice;

            const getSign = diffPrice => {

                if (diffPrice > 0) return '↗';
                else if (diffPrice < 0) return '↘';
                else return '-';
            };

            card.innerHTML = `<div class="card-header">
                                <span>${stockInfo.stockId}</span>
                                <span>${stockInfo.stockName}</span>
                            </div>
                            <div class="card-body">
                                ${Math.round(parseInt(stockInfo.currentPrice) * 10) / 10}  
                            </div>
                            <div class="card-footer">
                                <span>${Math.abs(diffPrice)} ${getSign(diffPrice)}</span>
                                <span>${Math.floor(diffPrice / stockInfo.openPrice)} %</span>
                            </div>`;
        }

    };

    window.getStockInfo = stockId => {

        input.value = stockId;
        dropDown.classList.add("hide");

        ipcRenderer.invoke('get-stock-info', stockId)
            .then(stockInfo => {

                console.log('stockInfo=', stockInfo);
                renderStockCard(stockInfo[0]);
            })
            .catch()
    }

    input.addEventListener("focus", (e) => {

        dropDown.classList.remove("hide");
    });

    input.addEventListener("input", (e) => {

        const q = e.target.value;

        ipcRenderer.invoke('search-stocks', q)
            .then(stocks => {

                queryStocks = stocks;
                renderDropDown();
            })
            .catch()

        renderDropDown();
    });

    input.addEventListener("keyup", function (event) {

        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            window.getStockInfo(input.value);
        }
    });

    searchBtn.addEventListener("click", () => window.getStockInfo(input.value));

    const initStocks = () => {

        ipcRenderer.invoke('search-stocks')
            .then(stocks => {

                queryStocks = stocks;
                renderDropDown();
            })
            .catch()
    }

    initStocks();
});
