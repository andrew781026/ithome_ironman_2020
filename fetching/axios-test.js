const axios = require('axios');
const oneMinus = 60 * 1000;
const tenMinus = 10 * 60 * 1000;
const oneHour = 60 * 60 * 1000;

const fetchDay03 = async function () {
    try {
        console.log(' start fetchDay03 🚀');
        const url = 'https://ithelp.ithome.com.tw/articles/10233853';

        const res = await axios.get(url);
        console.log(' result = ', res.data);
    } catch (err) {
        console.error(err);
    }
};

const fetchDay04 = async function () {
    try {
        console.log(' start fetchDay04 🚀');
        const url = 'https://ithelp.ithome.com.tw/articles/10234094';

        const res = await axios.get(url);
        console.log(' result = ', res.data);
    } catch (err) {
        console.error(err);
    }
};


setInterval(() => {

    fetchDay03().then().catch(err => console.error(err));
    fetchDay04().then().catch(err => console.error(err));

}, oneMinus);
