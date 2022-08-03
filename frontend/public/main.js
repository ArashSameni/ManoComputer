const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron')
const path = require('path')
const fs = require('fs');

let fileID = 1;
let untitledNumber = 2;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 690,
    minWidth: 750,
    minHeight: 690,
    title: 'Mano Computer',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const saveFile = file => {
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
      mainWindow.webContents.send('FILE_SAVED', file.path)
    });
  }

  const saveAs = (file, closeAfter = false) => {
    const path = dialog.showSaveDialogSync(mainWindow,
      {
        defaultPath: file.path ?? file.fileName,
        filters: [
          { name: 'Assembly', extensions: ['asm', 's'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      })
    if (path) {
      fs.writeFile(path, file.content, 'utf-8', err => {
        if (err) {
          dialog.showMessageBoxSync(mainWindow, {
            title: "Couldn't save the file",
            buttons: ['Dismiss'],
            type: 'warning',
            message: err.message,
          })
          return;
        }
        if (!closeAfter)
          mainWindow.webContents.send('CHANGE_PATH', path)
        return 1;
      });
    }
    return 0;
  }

  ipcMain.on('OPEN_BROWSER', (_, link) => {
    shell.openExternal(link)
  })

  ipcMain.on('FILE_CLOSE', (_, file) => {
    if (file.saved) {
      mainWindow.webContents.send('CLOSE_FILE', file.id);
      return;
    }
    let shouldSave = dialog.showMessageBoxSync(mainWindow, {
      title: "Warning",
      buttons: ["Don't Save", 'Cancel', 'Save'],
      defaultId: 2,
      cancelId: 1,
      type: 'warning',
      message: `Do you want to save the changes you made to ${file.fileName}?`,
      detail: "Your changes will be lost if you don't save them.",
    })
    if (shouldSave === 2 && file.path) {
      saveFile(file);
      mainWindow.webContents.send('CLOSE_FILE', file.id);
    }
    else if (shouldSave === 2) {
      if (saveAs(file, true))
        mainWindow.webContents.send('CLOSE_FILE', file.id);
    }
    else if (shouldSave === 0)
      mainWindow.webContents.send('CLOSE_FILE', file.id);
  })

  ipcMain.on('ALL_CLOSE', (_, files) => {
    const newFiles = [];
    for (const file of files) {
      if (file.saved) {
        continue
      }
      let shouldSave = dialog.showMessageBoxSync(mainWindow, {
        title: "Warning",
        buttons: ["Don't Save", 'Cancel', 'Save'],
        defaultId: 2,
        cancelId: 1,
        type: 'warning',
        message: `Do you want to save the changes you made to ${file.fileName}?`,
        detail: "Your changes will be lost if you don't save them.",
      })
      if (shouldSave === 1) {
        newFiles.push(file);
        continue;
      }
      if (shouldSave === 2 && file.path) {
        saveFile(file);
        continue;
      }
      if (shouldSave === 2 && saveAs(file, true)) {
        newFiles.push({ ...file, saved: true })
      }
    }
    mainWindow.webContents.send('CHANGE_FILES', newFiles);
  })

  ipcMain.on('SAVE_FILE', (_event, file) => saveFile(file))

  ipcMain.on('SAVE_AS', (_event, file) => saveAs(file))

  //load the index.html from a url
  mainWindow.loadFile('build/index.html');

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
              saved: true,
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
            dialog.showOpenDialog(mainWindow,
              {
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
                      saved: true,
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
            mainWindow.webContents.send('CLOSE_FILE', -1)
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

  Menu.setApplicationMenu(menu)
  // if (process.platform === 'darwin') {
  //     Menu.unshift({label: ''});
  // }
  mainWindow.setMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  app.quit()
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