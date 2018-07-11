const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const fs = require('fs')
const os = require('os')
const path = require('path')
const ipc = electron.ipcMain
const shell = electron.shell
const OSX = process.platform === 'darwin'
const WIN = process.platform === 'win32'
const {dialog} = require('electron')
const globalShortcut = electron.globalShortcut

//const {webContents} = require('electron')
global.windows = {
  main: null,

  }

app.on('window-all-closed', () => {
    global.windows.main=null
    app.quit()

})

app.on('ready', () => {
  global.windows.main = require('./electron_components/mainWindow')

  globalShortcut.register('CommandOrControl+Alt+K', function () {
     printer()
   })
  })




  app.on('will-quit', () => {
    // Unregister a shortcut.

    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
  })







let TCwin
let MSwin
let CCwin


ipc.on('tc',(e,args)=>{
//  console.log(args)
TCwin = new BrowserWindow()
  TCwin.show()
  TCwin.loadURL('file://'+path.join(__dirname,'./electron_components/tc/tc.html'))
  TCwin.webContents.on('did-finish-load',()=>{
    
    TCwin.webContents.send('tci',args)

  })

  TCwin.on('closed',()=>{TCwin=null})
})


ipc.on('cc',(e,args)=>{
//  console.log(args)
 CCwin = new BrowserWindow()
  CCwin.show()
  CCwin.loadURL('file://'+path.join(__dirname,'./electron_components/cc/cc.html'))
  CCwin.webContents.on('did-finish-load',()=>{
    CCwin.webContents.send('cci',args)
    //TCwin.webContents.print()
  })
CCwin.on('closed',()=>{CCwin=null})
})

ipc.on('ms',(e,args)=>{
//  console.log(args)
   MSwin = new BrowserWindow()
  MSwin.show()
  MSwin.loadURL('file://'+path.join(__dirname,'./electron_components/ms/ms.html'))
  MSwin.webContents.on('did-finish-load',()=>{
    MSwin.webContents.send('msi',args)
    //TCwin.webContents.print()
  })

  MSwin.on('closed',()=>{MSwin=null})

})
function printer(){
  if (TCwin) TCwin.webContents.print();
  else if (CCwin) CCwin.webContents.print();
  else MSwin.webContents.print();
}



function printtopdf(){
  if (TCwin) TCwin.webContents.printToPDF({}, function (error, data) {
    if (error) throw error
    var pdfPath=dialog.showSaveDialog({ filters: [
    { name: 'PDF', extensions: ['pdf'] }
    ]})

    if(typeof pdfPath === 'string')
    {fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
     shell.openExternal(pdfPath)

    })}
  });


  else if (CCwin) CCwin.webContents.printToPDF({}, function (error, data) {
    if (error) throw error
    var pdfPath=dialog.showSaveDialog({ filters: [
    { name: 'PDF', extensions: ['pdf'] }
    ]})

    if(typeof pdfPath === 'string')
    {fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
     shell.openExternal(pdfPath)

    })}
  });

  else MSwin.webContents.printToPDF({}, function (error, data) {
    if (error) throw error

    var pdfPath=dialog.showSaveDialog({ filters: [
    { name: 'PDF', extensions: ['pdf'] }
    ]})

    if(typeof pdfPath === 'string')
    {fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
     shell.openExternal(pdfPath)

    })}
  });
}






const {Menu} = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {label:'PrintPDF',
        click(){printtopdf()}},
        {label:'Print',
          click(){printer()}},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
