import { app, BrowserWindow } from "electron";
import { isDev } from "./utils/utils.js";
import { getPreloadPath, getRendererPath } from "./utils/pathResolver.js";
import { startBackendService, stopBackendService } from "./utils/backendRunner.js";
import { registerOpenDirectoryIpcHandler } from "./ipcs/OpenDirectoryIpc.js";
import {registerReadTextFileIpcHandler} from "./ipcs/ReadTextFile.js";
import {registerSaveTextFileIpcHandler} from "./ipcs/SaveTextFile.js";
import {registerSelectSavePathIpcHandler} from "./ipcs/SelectSavePath.js";

const backendService = startBackendService();

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1280,
    minHeight: 800,
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
  registerReadTextFileIpcHandler(mainWindow);
  registerSaveTextFileIpcHandler(mainWindow);
  registerSelectSavePathIpcHandler(mainWindow);
});

app.on("window-all-closed", () => {
  stopBackendService(backendService);
  if (process.platform !== "darwin") {
    app.quit();
  }
});