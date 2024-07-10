// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// src/main/preload.js

const { contextBridge, ipcRenderer } = require("electron");

// Expose IPC methods to the renderer process
contextBridge.exposeInMainWorld("electron", {
  // Method to get data from the store
  getStoreData: async (key) => {
    return await ipcRenderer.invoke("get-store-data", key);
  },

  // Method to set data in the store
  setStoreData: async (key, value) => {
    await ipcRenderer.invoke("set-store-data", key, value);
  },
});
