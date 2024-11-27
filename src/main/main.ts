import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { isDev } from "./utils.js";
import * as child from 'child_process';
import { getPreloadPath, getRendererPath } from "./pathResolver.js";
import kill from "tree-kill";
import path from 'path';

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
}
//prod mode start python server with exe, need to run npm run build:python first
else {
  python = child.spawn(path.join(app.getAppPath(), "..", "build/server/main/main"));
  python!.stdout!.on('data', function (data: string) {
    console.log("data: ", data.toString());
  });

  python!.stderr!.on('data', (data: string) => {
    console.log(`stderr: ${data}`); // when error
  });
}
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