const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, dialog } = require('electron')

function createMainWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        // 前置脚本
        // webPreferences: {
        //     preload: path.join(__dirname, 'src/preload.js')
        // },
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
        show: false
            // transparent: true
    })

    win.loadFile('index.html');

    win.webContents.openDevTools({ mode: 'undocked' });
    win.once('ready-to-show', () => {
        win.show()
    })
}

function createAboutWindow() {
    const win = new BrowserWindow({
        width: 260,
        height: 130,
        resizable: false,
        // 不可最大化
        minimizable: false,
        // 隐藏titleBar
        titleBarStyle: 'hidden',
        show: false
            // transparent: true
    })

    win.loadFile('about.html');
    win.once('ready-to-show', () => {
        win.show()
    });
    win.on("blur", () => {
        win.close();
    });
}

let tray

app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })

    const icon = nativeImage.createFromPath('path/to/asset.png')
    tray = new Tray(icon)

    // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
    const contextMenu = Menu.buildFromTemplate([{
            label: '关于',
            type: 'normal',
            click: (menuItem, browserWindow, event) => {
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
    if (process.platform !== 'darwin') {
        app.quit()
    }
})