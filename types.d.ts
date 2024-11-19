interface Window {
    electronAPI: {
        selectFolder: () => Promise<string>;
    }
}