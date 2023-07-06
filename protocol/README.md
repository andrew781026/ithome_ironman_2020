# electron-quick-start

**Clone and run for a quick way to see Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/latest/tutorial/quick-start) within the Electron documentation.

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.
- `preload.js` - A content script that runs before the renderer process loads.

You can learn more about each of these components in depth within the [Tutorial](https://electronjs.org/docs/latest/tutorial/tutorial-prerequisites).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

### add protocol part

```javascript
// add beginning of main.js
protocol.registerSchemesAsPrivileged([
    {
        scheme: 'tmcopwin.oidc',
        privileges: {
            standard: true,
            secure: true,
            supportFetchAPI: true ,
            corsEnabled: true,
        }
    }
])
```

```javascript
// add beginning of main.js
app.whenReady().then(() => {

    protocol.handle('tmcopwin.oidc', (req) => {
        console.log('protocol.handle ->',req.url) // will trigger when you call tmcopwin.oidc://xxx in BrowserWindow
        return new Response('<h1>hello, world</h1>', {
            headers: { 'content-type': 'text/html' }
        })
    })

    // ...
})
```


```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [Electron Fiddle](https://electronjs.org/fiddle) - Electron Fiddle, an app to test small Electron experiments
