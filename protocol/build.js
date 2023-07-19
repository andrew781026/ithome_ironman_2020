const path = require('path');
const builder = require('electron-builder');

builder.build({
  projectDir: path.resolve(__dirname),
  win: ['nsis', 'portable'],  // nsis . portable
  config: {
    "appId": "com.andrewdeveloper.electron.cat",
    "productName": "cat-play",
    "directories": {
      "output": "build/win"
    },
    "win": {
      "icon": path.resolve(__dirname, 'cat.png'),
    }
  },
})
  .then(
    data => console.log(data),
    err => console.error(err)
  );
