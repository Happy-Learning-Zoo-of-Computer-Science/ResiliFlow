import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from 'url';
import path from 'path';
import { isDev } from "./utils.js";
import { getRendererPath } from "./pathResolver.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
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
