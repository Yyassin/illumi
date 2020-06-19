const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
//remove once local
const globalShortcut = electron.globalShortcut;

exports.createWindow = () => {
    splash = new BrowserWindow({
      width: 300, 
      height: 400, 
      icon: path.join(__dirname, '../illumi-logo.png'),
      frame: false,  
      transparent: true,
      title: 'illumi',
      titleBarStyle: 'hidden',
      show: false,
      alwaysOnTop: false});
    //always on top??

    splash.setMenu(null)
    splash.loadURL(false ? 'http://127.0.0.1:5500/client/public/electron/loader.html':`file://${path.join(__dirname, 'loader.html')}`);

    splash.webContents.on('did-finish-load', () => {
      splash.setTitle('illumi | Loading...');
    })
  
    splash.once('ready-to-show', () => splash.show())

    mainWindow = new BrowserWindow({
      width: 900, 
      height: 680, 
      icon: path.join(__dirname, '../illumi-logo.png'),
      show: false,
      frame: false,
      title: 'illumi',
      backgroundColor: '#000',
      webPreferences: { nodeIntegration: true }
    });
  
    mainWindow.setMinimumSize(500, 500);
    mainWindow.setMenu(null)
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.setTitle('illumi');
    })
    
    mainWindow.once('ready-to-show', () => {
      setTimeout(() => {
        splash.close();
        splash.destroy();
        mainWindow.show();
      }, 0); //idk if we want a delay but wtv
  
    //remove once local
    globalShortcut.register('Alt+1', () =>
        mainWindow.webContents.openDevTools({mode: 'detach'})
    );

    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('maximized')
    })

    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('unmaximized')
    })

    mainWindow.on('closed', () => mainWindow = null);
    
    });

  return mainWindow;

}

