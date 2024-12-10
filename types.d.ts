interface Window {
    electronAPI: {
        selectFolder: () => Promise<string>;
        readTextFile: () => Promise<string>;
        saveTextFile: (content: string) => Promise<string>;
    }
}