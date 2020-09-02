const path = require('path');
const builder = require('electron-builder');


const getRawOptions = platform => {

    const winConfig = {

        projectDir: path.resolve(__dirname),
        // x64: true,
        win: ['nsis', 'portable'],  // nsis . portable
        config: {
            "appId": "com.andrewdeveloper.electron.cat",
            "productName": "小貓玩耍",
            // "afterPack": "./myAfterPackHook.js",
            "directories": {
                "output": "build/win"
            },
            "win": {
                "target": "nsis", // nsis . portable
                "icon": path.resolve(__dirname, 'cat.png'),
            }
        },
    };

    const macConfig = {

        projectDir: path.resolve(__dirname),
        // x64: true,
        mac: ['dmg'],  // dmg . default
        config: {
            "appId": "com.andrewdeveloper.electron.cat",
            "productName": "cat-play",
            "directories": {
                "output": "build/mac"
            },
            "mac": {
                "icon": path.resolve(__dirname, 'cat.icns'),
            }
        },
    };

    switch (platform) {

        case 'win':
            return winConfig;
        case 'mac':
            return macConfig;
    }
};

const getPlatform = () => {

    const platformMap = {
        'win32': 'win',
        'darwin': 'mac',
        'linux': 'linux',
    }

    return platformMap[process.platform];
}

builder.build(getRawOptions(getPlatform()))
    .then(
        data => console.log(data),
        err => console.error(err)
    );