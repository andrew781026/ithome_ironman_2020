// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require('fs');
const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const downloadBtn = document.querySelector('#download');

    downloadBtn.addEventListener("click", () => {

        console.log('here you click download');

        fs.writeFile(path.resolve(__dirname, './aaa.txt'), 'saving files',()=>console.log('saving files correctly'));
    });
});
