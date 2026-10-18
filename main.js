const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100, height: 800, minWidth: 700, minHeight: 520,
    title: 'Duck Detectives', backgroundColor: '#1d2b22', autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadFile(path.join(__dirname, 'game', 'game', 'popup.html'), { query: { full: '1' } });
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

Menu.setApplicationMenu(Menu.buildFromTemplate([
  { label: 'Game', submenu: [
    { label: 'Fullscreen', accelerator: 'F11', click: (_, w) => w && w.setFullScreen(!w.isFullScreen()) },
    { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: (_, w) => w && w.reload() },
    { role: 'quit' } ] },
  { label: 'Help', submenu: [ { label: 'Toggle Dev Tools', accelerator: 'F12', click: (_, w) => w && w.webContents.toggleDevTools() } ] }
]));

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
