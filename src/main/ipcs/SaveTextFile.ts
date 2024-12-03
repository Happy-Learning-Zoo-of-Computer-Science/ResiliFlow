import { dialog, ipcMain } from "electron";
import * as fs from "node:fs/promises";

export function registerSaveTextFileIpcHandler(mainWindow: Electron.BrowserWindow) {
    // Load text.
    ipcMain.handle("save-text-file", async (event, content) => {
        console.log(content);
        const result = await dialog.showSaveDialog(mainWindow, {
            title: "Save Text",
            defaultPath: "untitled.txt",
            filters: [
                { name: 'Text Files', extensions: ['txt'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        });
        if (result.canceled || !result.filePath) {
            return null; // 用户取消或未选择文件
        }
        const filePath = result.filePath;
        try {
            await fs.writeFile(filePath, content, { encoding: 'utf8' });
            return filePath;
        } catch (error) {
            console.error('Error when saving:', error);
            return null;
        }
    });
}