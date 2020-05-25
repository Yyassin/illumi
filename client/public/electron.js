const electron = require('electron');
const app = electron.app;
const config = require('./electron/config')

const ipcMain = require('electron').ipcMain;

let mainWindow;

app.on('ready', () => {
  mainWindow = config.createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (config.mainWindow === null) {
    createWindow();
  }
});

//titlebar
ipcMain.handle('minimize-event', () => {
  mainWindow.minimize()
})

ipcMain.handle('maximize-event', () => {
  mainWindow.maximize()
})

ipcMain.handle('unmaximize-event', () => {
  mainWindow.unmaximize()
})

ipcMain.handle('close-event', () => {
  app.quit()
})