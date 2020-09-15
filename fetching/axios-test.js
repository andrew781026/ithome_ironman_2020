const axios = require('axios');
const tenMinus = 10 * 60 * 1000;
const oneHour = 60 * 60 * 1000;

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

    fetchDay04().then().catch(err => console.error(err))

}, tenMinus);