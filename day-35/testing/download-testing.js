const downloadUtil = require('../../day-36/utils/downloadUtil');

const url = 'https://download.jetbrains.com/webstorm/WebStorm-2020.2.4.exe';
const url2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVQXnzYOCmMJwf5mCE6cqxk_rhbwgxzebgkA&usqp=CAU';

const dest = './downloads/WebStorm.exe';
const dest2 = './downloads/aaa.jpg';

downloadUtil(url, dest)
    .on('got-data', ({downloadedLength, totalLength}) => {

        const saved = new Intl.NumberFormat().format(downloadedLength);
        const total = new Intl.NumberFormat().format(totalLength);
        const percent = ((downloadedLength / totalLength) * 100).toFixed(4)
        console.log(`downloaded :  ${saved} / ${total}  ( ${percent} % ) `);
    })
    .catch(err => console.error(err))

