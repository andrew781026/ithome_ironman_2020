const {ipcRenderer} = require('electron')
/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {

  // ipcRenderer.on('switch-cat', (event, args) => {
  //
  //   document.body.innerText = `args = ${args}`
  // });

  document.querySelector('#min').addEventListener('click',()=>{
    ipcRenderer.send('minimize');
  })

  document.querySelector('#max').addEventListener('click',()=>{
    ipcRenderer.send('maximize');
  })

  document.querySelector('#close').addEventListener('click',()=>{
    ipcRenderer.send('close');
  })
})
