// 在主處理序裡。
/*
const {app, BrowserView, BrowserWindow } = require('electron')

app.on('ready', () => {

    const win = new BrowserWindow({ width: 800, height: 600 })

    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    view.webContents.loadURL('https://electronjs.org')
})
*/

const a = new Date('2019-12-15T00:00:00.000+08:00');
console.log(a.toISOString())
