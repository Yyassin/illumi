const electron = require('electron');
const app = electron.app;
const config = require('./electron/config')

const ipcMain = require('electron').ipcMain;

//tray
const path = require('path')
const tray = electron.Tray;
const Menu = electron.Menu;

let Tray = null;
let mainWindow;

app.on('browser-window-focus', () => {
  mainWindow.webContents.send('focused')
})

app.on('browser-window-blur', () => {
  mainWindow.webContents.send('blurred')
})

app.on('before-quit', function () {
  isQuiting = true;
});

app.on('ready', () => {
  mainWindow = config.createWindow();

  const iconPath = path.join(__dirname, 'icon.png');
  Tray = new tray(iconPath);
  Tray.setIgnoreDoubleClickEvents(true)

  let template = [{
      label: 'Audio', 
      submenu: [{
        label: 'Low',
        type: 'radio',
        checked: true
      },
      {
        label: 'High',
        type: 'radio',
      }]
    },{
      label: 'Exit'
    }
  ]

  const trayMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:() => {
        mainWindow.show();
    } },
    { label: 'Exit', click: () => {
        app.isQuiting = true;
        app.quit();
    } }
  ]);

  Tray.on('click', (e) => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  });

  Tray.setContextMenu(trayMenu);
  Tray.setToolTip("illumi")
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

//notis
ipcMain.handle('noti-event', () => {
  if (!mainWindow.isVisible() || mainWindow.isMinimized()) {
    mainWindow.show()
    }
  },
  false)

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

ipcMain.handle('close-event', (e) => {
  if (!app.isQuiting) {
    e.preventDefault();
    mainWindow.hide();
    e.returnValue = false;
  }
})