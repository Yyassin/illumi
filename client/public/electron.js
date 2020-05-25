const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
//remove once local
const globalShortcut = electron.globalShortcut;
const ipcMain = require('electron').ipcMain;

let mainWindow;

function createWindow() {
  splash = new BrowserWindow({width: 400, height: 400, frame: false,  titleBarStyle: 'hidden',});
  //always on top??

  mainWindow = new BrowserWindow({
    width: 900, 
    height: 680, 
    show: false,
    frame: false,
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.setMinimumSize(400, 400);
  mainWindow.setMenu(null)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splash.close();
      mainWindow.show();
    }, 0); //idk if we want a delay but wtv

  //remove once local
  globalShortcut.register('Alt+1', () =>
      mainWindow.webContents.openDevTools({mode: 'detach'})
  );


  //titlebar
  mainWindow.on('closed', () => mainWindow = null);

    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('maximized')
    })

    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('unmaximized')
    })
    
  });

  mainWindow.on('closed', () => mainWindow = null);

}

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