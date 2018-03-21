const { ipcMain } = require("electron");

ipcMain.on("img-window-ready", (event, arg) => {
  event.sender.send("img-window-display", arg);
});