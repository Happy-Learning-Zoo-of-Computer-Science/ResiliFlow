import { dialog, ipcMain } from "electron";

export function registerOpenDirectoryIpcHandler(mainWindow: Electron.BrowserWindow) {
    // Load folder.
    ipcMain.handle("select-folder", async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ["openDirectory"],
        });
        return result.filePaths[0];
    });
}