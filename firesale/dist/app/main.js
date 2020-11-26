"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var mainWindow = null;
var appReady = function () {
    mainWindow = new electron_1.BrowserWindow({ webPreferences: { nodeIntegration: true }, show: false });
    mainWindow.loadFile('dist/app/index.html');
    mainWindow.once('ready-to-show', function () {
        mainWindow.show();
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
};
electron_1.app.on('ready', appReady);
