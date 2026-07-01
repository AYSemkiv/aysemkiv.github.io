const { app, BrowserWindow, session } = require('electron'); // Added session here
const path = require('path');

function createWindow() {
  // Create or retrieve the custom persistent session
  const customSession = session.fromPartition('persist:aysOS13');

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, 
    webPreferences: {
      session: customSession, // Assign the persistent session directly to the window
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

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

  // Loads your URL directly into the window using your isolated session data
  win.loadURL('https://raw.githubusercontent.com/AYSemkiv/aysemkiv.github.io/main/aysOS13.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});