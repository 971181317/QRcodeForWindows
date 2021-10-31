import { BrowserWindow, ipcMain } from "electron";
import path = require("path");
import { getQrcodeImg } from "./ipc_handler";
import { log } from "./log";

export function createMainWindow(): void {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        // 前置脚本
        webPreferences: {
            preload: path.join(__dirname, 'mainPreload.bundle.js')
        },
        // 不可调节窗口大小
        resizable: false,
        // 不可最大化
        minimizable: false,
        // 隐藏titleBar
        titleBarStyle: 'hidden',
        // 显示titleBar的按钮
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        },
        show: false,
        //解决窗口引入nodejs语法隔离问题
        // webPreferences:{ 
        //     nodeIntegration: true, 
        //     contextIsolation: false 
        // }
        // transparent: true
    })

    win.loadFile('html/index.html');

    // win.webContents.openDevTools({ mode: 'undocked' });
    win.once('ready-to-show', () => {
        win.show()
    })

    ipcMain.handle('qrcode:get-qrcode-img', getQrcodeImg);
    log.success('main window create end');
}

export function createAboutWindow(): void {
    const win = new BrowserWindow({
        width: 280,
        height: 130,
        resizable: false,
        // 不可最大化
        minimizable: false,
        // 隐藏titleBar
        titleBarStyle: 'hidden',
        show: false
        // transparent: true
    })

    win.loadFile('html/about.html');
    win.once('ready-to-show', () => {
        win.show()
    });
    win.on("blur", () => {
        win.close();
    });
    log.success('about window create end');
}