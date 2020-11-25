import { app, BrowserWindow } from "electron";

let mainWindow = null;

const appReady = () => {
    mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
    mainWindow.loadFile('dist/app/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', appReady);