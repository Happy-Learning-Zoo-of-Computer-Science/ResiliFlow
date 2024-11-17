/**
 * Browse, select a folder, and store its path.
 * @param {*} setFolderPath A state setter.
 * @returns A file browser.
 */
const SelectFolder = ( {folderPath, setFolderPath} ) => {

    const handle = async () => {
        const folderPath = await window.electronAPI.selectFolder();
        setFolderPath(folderPath);
    }

    return (
        <div>
            <h2> Select a folder.</h2>
            <button key="Select a folder" onClick={handle}>{folderPath ? folderPath : "Select a folder"}</button>
        </div>
    );
};

export default SelectFolder;