const { app, BrowserWindow } = require('electron')
let win;
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    setInterval(() => {
        win.reload();
    }, 10000);

    win.loadFile('renderer/pages/home.html')
}
app.whenReady().then(() => {
    createWindow()
})
//loads the electron page