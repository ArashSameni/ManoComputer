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
    }
})