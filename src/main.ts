import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron';
import { createAboutWindow, createMainWindow } from './window_create';
import { log } from "./log"

let tray

app.whenReady().then(() => {
    log.info('app ready');
    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })

    const icon = nativeImage.createFromPath('path/to/asset.png')

    // 设置windows状态栏的图标信息
    tray = new Tray(icon)

    // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
    const contextMenu = Menu.buildFromTemplate([{
        label: '关于',
        type: 'normal',
        click: (_menuItem: any, _browserWindow: any, _event: any) => {
            createAboutWindow()
        }
    },
    { label: '退出', type: 'normal', role: "quit" },
    ])

    tray.setContextMenu(contextMenu)

    tray.setToolTip('QRcodeForWindows')
    tray.setTitle('QRcodeForWindows')
})

app.on('window-all-closed', () => {
    log.info('app window-all-closed');
    if (process.platform !== 'darwin') {
        app.quit()
    }
})