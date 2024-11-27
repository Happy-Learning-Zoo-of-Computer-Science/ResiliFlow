import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from 'url';
import path from 'path';
import { isDev } from "./utils.js";
import { getRendererPath } from "./pathResolver.js";
import * as child from 'child_process';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let python: child.ChildProcess;
//dev mode start python server
if (isDev()) {
  python = child.spawn('python', ['./src/server/main.py']);
  python!.stdout!.on('data', function (data: string) {
    console.log("data: ", data.toString());
  });

  python!.stderr!.on('data', (data: string) => {
    console.log(`stderr: ${data}`); // when error
  });
  console.log("Python server started");

}
//prod mode start python server with exe, need to run npm run build:python first
else {
  python = child.spawn('dist-python/main/main');
  python!.stdout!.on('data', function (data: string) {
    console.log("data: ", data.toString());
  });

  python!.stderr!.on('data', (data: string) => {
    console.log(`stderr: ${data}`); // when error
  });
  console.log("Python server started");
}



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

app.on("window-all-closed", () => {
  killPython(python);
  if (process.platform !== "darwin") {
    app.quit();
  }
});


function killPython(python: child.ChildProcess) {
  const kill = require("tree-kill");
  kill(python.pid);
}