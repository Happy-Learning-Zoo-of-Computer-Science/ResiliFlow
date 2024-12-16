interface Window {
    electronAPI: {
        selectFolder: () => Promise<string>;
        readTextFile: (options: any) => Promise<string>;
        saveTextFile: (content: string, options: any, filePath: string = "") => Promise<string>;
        selectSavePath: (options: any) => Promise<string>;
    }
}