const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const OSX = process.platform === 'darwin'
const WIN = process.platform === 'win32'

const mainWindow = new BrowserWindow({
  frame: true,
  width: 792,
  height: 600,
  titleBarStyle: 'hidden-inset',
  webPreferences: {
    blinkFeatures: 'OverlayScrollbars'
  }
})

mainWindow.loadURL('http://localhost:8080/')
//'file://'+path.join(__dirname,'../src/www/index.html')


mainWindow.webContents.on('new-window', e => {
  e.preventDefault()
})

mainWindow.on('close', (e)=> {
  e.preventDefault()
  mainWindow.removeAllListeners()
  mainWindow.close()
})


app.on('activate', e => {
  mainWindow.show()
  mainWindow.focus()
})

module.exports = mainWindow
