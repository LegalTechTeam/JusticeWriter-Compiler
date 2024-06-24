const { app, BrowserWindow } = require("electron");
const path = require("node:path");
// src/main/main.ts

import { ipcMain } from "electron";
import Store from "electron-store";

const store = new Store();
// IPC listener for getting data from store
// IPC listener for getting data from store
ipcMain.handle("get-store-data", (event, key) => {
  return store.get(key);
});

// IPC listener for setting data in store
// Handle IPC messages from renderer process to set data in store
ipcMain.handle("set-store-data", (event, key, value) => {
  store.set(key, value);
});
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}
const cspString = `
  default-src 'self' 'unsafe-inline' data:;
  connect-src *;
`;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    icon: __dirname + "./Assets/image.png",

    resizable: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      csp: cspString,
    },
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools().;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
