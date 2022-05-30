const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron')
const path = require('path')
const fs = require('fs');

let fileID = 1;
let untitledNumber = 2;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 640,
    minWidth: 720,
    minHeight: 640,
    title: 'Mano Computer',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('OPEN_BROWSER', (_, link) => {
    shell.openExternal(link)
  })

  ipcMain.on('SAVE_FILE', (_event, file) => {
    fs.writeFile(file.path, file.content, 'utf-8', err => {
      if (err) {
        dialog.showMessageBoxSync(mainWindow, {
          title: "Couldn't save the file",
          buttons: ['Dismiss'],
          type: 'warning',
          message: err.message,
        })
        return;
      }
    });
  })

  ipcMain.on('SAVE_AS', (_event, file) => {
    dialog.showSaveDialog({
      defaultPath: file.path ?? file.fileName,
      filters: [
        { name: 'Assembly', extensions: ['asm', 's'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    })
      .then(function (fileObj) {
        if (!fileObj.canceled) {
          fs.writeFile(fileObj.filePath, file.content, 'utf-8', err => {
            if (err) {
              dialog.showMessageBoxSync(mainWindow, {
                title: "Couldn't save the file",
                buttons: ['Dismiss'],
                type: 'warning',
                message: err.message,
              })
              return;
            }
            mainWindow.webContents.send('CHANGE_PATH', fileObj.filePath)
          });
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  })

  //load the index.html from a url
  mainWindow.loadURL('http://localhost:3000');

  let menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'New File...',
          accelerator: 'CmdOrCtrl+N',
          click() {
            let file = {
              id: fileID,
              fileName: `Untitled-${untitledNumber}.asm`,
              content: '',
              path: null
            }
            fileID += 1;
            untitledNumber += 1;
            mainWindow.webContents.send('NEW_FILE', file)
          }
        },
        {
          label: 'Open File...',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog({
              properties: ['openFile'],
              filters: [
                { name: 'Assembly', extensions: ['asm', 's'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            })
              .then(function (fileObj) {
                if (!fileObj.canceled) {
                  fs.readFile(fileObj.filePaths[0], 'utf8', function (err, data) {
                    if (err) {
                      dialog.showMessageBoxSync(mainWindow, {
                        title: "Couldn't open the file",
                        buttons: ['Dismiss'],
                        type: 'warning',
                        message: err.message,
                      })
                      return;
                    }
                    let file = {
                      id: fileID,
                      fileName: fileObj.filePaths[0].split('\\').pop().split('/').pop(),
                      content: data,
                      path: fileObj.filePaths[0]
                    }
                    mainWindow.webContents.send('OPEN_FILE', file)
                    fileID += 1;
                  });
                }
              })
              .catch(function (err) {
                console.error(err)
              })
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click() {
            mainWindow.webContents.send('SAVE_FILE')
          }
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click() {
            mainWindow.webContents.send('SAVE_AS')
          }
        },
        {
          label: 'Save All'
        },
        {
          type: 'separator'
        },
        {
          label: 'Close File',
          accelerator: 'CmdOrCtrl+W',
          click() {
            mainWindow.webContents.send('CLOSE_FILE')
          }
        },
        {
          label: 'Close All',
          click() {
            mainWindow.webContents.send('CLOSE_ALL')
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    }
  ])
  mainWindow.setMenu(menu)
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.