// Importing this adds a right-click menu with 'Inspect Element' option
// const remote = require('remote');
// const Menu = remote.require('menu');
// const MenuItem = remote.require('menu-item');
const path = require('path');
const {Notification,ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    let rightClickPosition = null

    /*
    const menu = new Menu()
    const menuItem = new MenuItem({
        label: 'Inspect Element',
        click: () => {
            remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
        }
    })
    menu.append(menuItem)

    // back
    const backMenuItem = new MenuItem({
        label: 'Back',
        click: () => {
            window.history.back();
        }
    })
    menu.append(backMenuItem)

    // forward
    const forwardMenuItem = new MenuItem({
        label: 'Forward',
        click: () => {
            window.history.forward();
        }
    })
    menu.append(forwardMenuItem)

     */

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        rightClickPosition = {x: e.x, y: e.y}
        console.log('rightClickPosition=', rightClickPosition);
        // menu.popup(remote.getCurrentWindow())
    }, false)

    document.getElementById('cat-img').addEventListener('dblclick', e => {

        e.preventDefault();

        ipcRenderer.send('notify');
    });

    document.getElementById('button').addEventListener('click', () => {

        ipcRenderer.send('notify');
    });

});
