import {dialog, ipcMain} from "electron";
import * as fs from "node:fs/promises";

export function registerSaveTextFileIpcHandler(mainWindow: Electron.BrowserWindow) {
    // Load text.
    ipcMain.handle("save-text-file", async (event, content: string, options, filePath: string = "") => {
        console.log(content);
        if (filePath === "") {
            const result = await dialog.showSaveDialog(mainWindow, options);
            if (result.canceled || !result.filePath) {
                return null; // 用户取消或未选择文件
            }
            filePath = result.filePath;
        }
        try {
            await fs.writeFile(filePath, content, {encoding: 'utf8'});
            return filePath;
        } catch (error) {
            console.error('Error when saving:', error);
            return null;
        }
    });
}