const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  splash = new BrowserWindow({width: 400, height: 400, frame: false,  titleBarStyle: 'hidden',});
  //always on top??

  mainWindow = new BrowserWindow({width: 900, height: 680, show: false});
  mainWindow.setMinimumSize(400, 400);
  mainWindow.setMenu(null)
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splash.close();
      mainWindow.show();
    }, 0); //idk if we want a delay but wtv
    
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