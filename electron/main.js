
const {app, BrowserWindow, session} = require('electron')
const path = require('path')
const url = require('url')
const reloader = require('electron-reloader')
reloader(module)

// 设置你的CSP规则
//const csp = "default-src 'self'; script-src 'self'";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // win.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, './build/index.html'),
  //     protocol: 'file:',
  //     slashes: true
  //   })
  // )

  win.loadURL('http://localhost:3001')

  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  // 应用CSP到所有的web页面
  // session.defaultSession.webRequest.onHeadersReceived((details: any, callback: any) => {
  //   if (details.responseHeaders) {
  //     details.responseHeaders['content-security-policy'] = [csp];
  //   }
  //   callback({cancel: false, responseHeaders: details.responseHeaders});
  // });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})