import { app, BrowserWindow } from 'electron';
import * as path from "path";

app.on('ready', () => {
    console.log('Hello from Electron');
    const mainWindow = new BrowserWindow({ webPreferences: { contextIsolation: false } });
    mainWindow.webContents.loadFile(path.join(__dirname,'../../pages/index.html'));
});