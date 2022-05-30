const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openBrowser: link => ipcRenderer.send('OPEN_BROWSER', link),
    handleNewFile: callback =>{
        ipcRenderer.removeAllListeners('NEW_FILE')
        ipcRenderer.on('NEW_FILE', callback)
    },
    handleOpenFile: callback => {
        ipcRenderer.removeAllListeners('OPEN_FILE')
        ipcRenderer.on('OPEN_FILE', callback)
    },
    handleSaveFile: callback => {
        ipcRenderer.removeAllListeners('SAVE_FILE')
        ipcRenderer.on('SAVE_FILE', callback)
    },
    handleSaveAs: callback => {
        ipcRenderer.removeAllListeners('SAVE_AS')
        ipcRenderer.on('SAVE_AS', callback)
    },
    handleCloseFile: callback =>{
        ipcRenderer.removeAllListeners('CLOSE_FILE')
        ipcRenderer.on('CLOSE_FILE', callback)
    },
    handleCloseAll: callback =>{
        ipcRenderer.removeAllListeners('CLOSE_ALL')
        ipcRenderer.on('CLOSE_ALL', callback)
    },
    handleFilePathChanged: callback =>{
        ipcRenderer.removeAllListeners('CHANGE_PATH')
        ipcRenderer.on('CHANGE_PATH', callback)
    }, 
})