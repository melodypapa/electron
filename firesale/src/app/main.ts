import { app, BrowserWindow } from "electron";

let mainWindow:BrowserWindow = null;

const appReady = () => {
    mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true }, show: false });
    mainWindow.loadFile('dist/app/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.webContents.openDevTools();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', appReady);