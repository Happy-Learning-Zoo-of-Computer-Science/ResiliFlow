const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  readTextFile: (options: any) => ipcRenderer.invoke("read-text-file", options),
  saveTextFile: (content: string, options: any, filePath: string = "") => ipcRenderer.invoke("save-text-file", content, options, filePath),
  selectSavePath: (options: any) => ipcRenderer.invoke("select-save-path", options),
});