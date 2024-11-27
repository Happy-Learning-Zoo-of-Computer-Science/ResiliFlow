import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { isDev } from "./utils.js";
import { getPreloadPath, getRendererPath } from "./pathResolver.js";


app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5173");
  }
  else {
    mainWindow.loadFile(getRendererPath());
  }

  // Load folder.
  ipcMain.handle("select-folder", async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });
    return result.filePaths[0];
  });
});
