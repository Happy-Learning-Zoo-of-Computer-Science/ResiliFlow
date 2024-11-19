import React from 'react';

interface SelectFolderProps {
    folderPath: string;
    setFolderPath: (path: string) => void;
}

/**
 * Browse, select a folder, and store its path.
 * @param setFolderPath A state setter.
 * @returns A file browser.
 */
const SelectFolder: React.FC<SelectFolderProps> = ({ folderPath, setFolderPath }) => {

    const handle = async () => {
        const selectedFolderPath = await window.electronAPI.selectFolder();
        setFolderPath(selectedFolderPath);
    }

    return (
        <div>
            <h2>Select a folder.</h2>
            <button key="Select a folder" onClick={handle}>
                {folderPath ? folderPath : "Select a folder"}
            </button>
        </div>
    );
};

export default SelectFolder;