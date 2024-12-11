import {dialog, ipcMain} from "electron";
import * as fs from "node:fs/promises";

export function registerReadTextFileIpcHandler(mainWindow: Electron.BrowserWindow) {
    // Load text.
    ipcMain.handle("read-text-file", async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ["openFile"],
        });
        if (result.canceled || result.filePaths.length === 0) {
            return null; // User canceled or no files selected
        }
        const filePath = result.filePaths[0];
        return await fs.readFile(filePath, {encoding: 'utf8'});
    });
}