const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // hides File/Edit/View bar
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      webSecurity: false,
      partition: 'persist:aysOS12'
    }
  });

  // Fully remove menu (extra safety)
  win.setMenu(null);

  // Block reload + devtools shortcuts
  win.webContents.on('before-input-event', (event, input) => {
    const isReload =
      input.key === 'F5' ||
      (input.control && input.key.toLowerCase() === 'r');

    const isDevTools =
      input.key === 'F12' ||
      (input.control && input.shift && input.key.toLowerCase() === 'i');

    if (isReload || isDevTools) {
      event.preventDefault();
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});