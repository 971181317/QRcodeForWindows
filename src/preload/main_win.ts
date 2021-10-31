import { contextBridge, ipcRenderer } from 'electron'
import { log } from '../log';

//在 window对象中添加了一个新的API叫做 qrcode 此 API 暴露IPC 通道到渲染器进程
contextBridge.exposeInMainWorld('qrcode', {
    getQrcodeImg: async (text: string) => {
        let result = await ipcRenderer.invoke('qrcode:get-qrcode-img', text);
        const type = typeof result
        if ("string" != type) {
            log.error("getQrcodeImg result type err, type :", type);
            return "";
        }
        return result;
    },
})