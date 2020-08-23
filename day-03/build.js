const path = require('path');
const builder = require('electron-builder');

builder.build({

    projectDir: path.resolve(__dirname),
    // x64: true,
    win: ['nsis','portable'],  // nsis . portable
    config: {
        "appId": "com.ezoom.app.thaitown.tool",
        "productName": "取餐/出餐系統管理器",
        // "afterPack": "./myAfterPackHook.js",
        "directories": {
            "output": "build"
        },
        "win": {
            "target": "nsis", // nsis . portable
            "icon":  path.resolve(__dirname,'cat.png'),
        }
    },
})
    .then(
        data => console.log(data),
        err => console.error(err)
    );