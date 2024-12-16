import {dialog, ipcMain} from "electron";
import * as fs from "node:fs/promises";

export function registerSelectSavePathIpcHandler(mainWindow: Electron.BrowserWindow) {
    // Load text.
    ipcMain.handle("select-save-path", async (event, options) => {
        const result = await dialog.showSaveDialog(mainWindow, options);
        if (result.canceled || !result.filePath) {
            return null; // 用户取消或未选择文件
        }
        return result.filePath;
    });
}