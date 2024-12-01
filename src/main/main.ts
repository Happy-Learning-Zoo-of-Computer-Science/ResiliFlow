import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { isDev } from "./utils/utils.js";
import { getPreloadPath, getRendererPath } from "./utils/pathResolver.js";
import { startBackendService, stopBackendService } from "./utils/backendRunner.js";
import { registerOpenDirectoryIpcHandler } from "./ipcs/OpenDirectoryIpc.js";

const backendService = startBackendService();

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

  registerOpenDirectoryIpcHandler(mainWindow);
});

app.on("window-all-closed", () => {
  stopBackendService(backendService);
  if (process.platform !== "darwin") {
    app.quit();
  }
});