const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const globalShortcut = electron.globalShortcut;

let mainWindow;

function createWindow() {
  splash = new BrowserWindow({width: 400, height: 400, frame: false,  titleBarStyle: 'hidden',});
  //always on top??

  mainWindow = new BrowserWindow({width: 900, height: 680, show: false});
  mainWindow.setMinimumSize(400, 400);
  mainWindow.setMenu(null)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splash.close();
      mainWindow.show();
    }, 0); //idk if we want a delay but wtv

  globalShortcut.register('Alt+1', () =>
      mainWindow.webContents.openDevTools({mode: 'detach'})
  );
    
  });

  mainWindow.on('closed', () => mainWindow = null);

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});