const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    handleFileOpen: (callback) => ipcRenderer.on('FILE_OPEN', callback)
})