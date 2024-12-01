import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { isDev } from "./utils.js";
import * as child from 'child_process';
import { getPreloadPath, getRendererPath } from "./pathResolver.js";
import kill from "tree-kill";
import path from 'path';
import 'dotenv/config'

let python: child.ChildProcess;

// Get backend executable path from environment.
// Path should be injected to .env in workflows on Github Actions.
let backendExecutablePath = process.env.BACKEND_EXECUTABLE_PATH;
if (!backendExecutablePath) {
  console.error("Error: Environment variable 'BACKEND_EXECUTABLE_PATH' is not set in .env file.");
  process.exit(1);
}

// Start a backend process.
console.log("Starting backend application from: ${backendExecutablePath}");
python = child.spawn(backendExecutablePath)
python!.stdout!.on('data', function (data: string) {
  console.log("data: ", data.toString());
});
python!.stderr!.on('data', (data: string) => {
  console.log(`stderr: ${data}`); // when error
});
console.log("Python server started");




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

app.on("window-all-closed", () => {
  console.log(python.pid);
  killPython(python);
  if (process.platform !== "darwin") {
    app.quit();
  }
});


function killPython(python: child.ChildProcess) {
  if (python && python.pid) {
    kill(python.pid);
  }
}