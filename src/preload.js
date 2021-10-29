const { contextBridge, ipcRenderer } = require('electron')

//在 window对象中添加了一个新的API叫做 file。 此 API 暴露IPC 通道到渲染器进程
contextBridge.exposeInMainWorld('file', {
    getSaveFilePath: () => ipcRenderer.invoke('file:get-save-file-path'),
})