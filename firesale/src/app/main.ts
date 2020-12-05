import { app, BrowserWindow, dialog } from "electron";
import { promises as fs} from "fs";
let mainWindow: BrowserWindow = null;

export const getFileFromUser = async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'Markdown Files', extensions: ['md', 'markdown'] }
        ]
    });
    if (result.canceled) {
        return;
    }
    const file = result.filePaths[0];
    openFile(file);
}

const openFile = async (file) => {
    const content:Buffer = await fs.readFile(file);
    mainWindow.webContents.send('file-opened', file, content.toString());
}

const appReady = () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        show: false
    });
    mainWindow.loadFile('dist/app/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        // mainWindow.webContents.openDevTools();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', appReady);