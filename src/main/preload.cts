const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  readTextFile: () => ipcRenderer.invoke("read-text-file"),
  saveTextFile: (content: string) => ipcRenderer.invoke("save-text-file", content),
});