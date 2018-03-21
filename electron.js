const { app, BrowserWindow, ipcMain } = require('electron')

let win;

function initialize() {
  require("./mainprocess/newwindow.js");
  function createWindow () {
    win = new BrowserWindow({
      width: 140,
      height: 83,
      icon: `file://${__dirname}/dist/assets/logo.png`,
      // transparent: true,
      frame: false,
      resizable: false,
    })

    win.loadURL(`file://${__dirname}/dist/index.html`)
    win.webContents.openDevTools()

    win.on('closed', function () {
      win = null
    })
  }

  app.on('ready', createWindow)

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
      createWindow()
    }
  });
}

initialize();