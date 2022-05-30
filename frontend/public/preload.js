const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openBrowser: link => ipcRenderer.send('OPEN_BROWSER', link),
    handleOpenFile: callback => {
        ipcRenderer.removeAllListeners('OPEN_FILE')
        ipcRenderer.on('OPEN_FILE', callback)
    },
    handleNewFile: callback =>{
        ipcRenderer.removeAllListeners('NEW_FILE')
        ipcRenderer.on('NEW_FILE', callback)
    },
    handleCloseFile: callback =>{
        ipcRenderer.removeAllListeners('CLOSE_FILE')
        ipcRenderer.on('CLOSE_FILE', callback)
    },
    handleCloseAll: callback =>{
        ipcRenderer.removeAllListeners('CLOSE_ALL')
        ipcRenderer.on('CLOSE_ALL', callback)
    },
})