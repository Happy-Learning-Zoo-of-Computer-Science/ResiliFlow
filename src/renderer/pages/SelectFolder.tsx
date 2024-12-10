import React from 'react'
import { Button } from 'antd'

interface SelectFolderProps {
  folderPath: string
  setFolderPath: (path: string) => void
  setFolderIsInitialized: (initialized: boolean) => void
}

/**
 * Browse, select a folder, and store its path.
 * @param setFolderPath A state setter.
 * @returns A file browser.
 */
const SelectFolder: React.FC<SelectFolderProps> = ({
  folderPath,
  setFolderPath,
  setFolderIsInitialized
}) => {

  // Check if the selected folder is initialized.
  const [validationResult, setValidationResult] = React.useState<JSX.Element | null>(null);

  const handle = async () => {
    const selectedFolderPath: string = await window.electronAPI.selectFolder();
    setFolderPath(selectedFolderPath);
    const isInitialized: boolean = await validateFolder(selectedFolderPath);
    setFolderIsInitialized(isInitialized);
    if (isInitialized) {
      setValidationResult(<p>This folder is initialized.</p>);
    } else {
      setValidationResult(<p></p>);
    }
  }

  return (
    <div>
      <h2>Select a folder.</h2>
      {validationResult}
      <Button key="Select a folder" onClick={handle}>
        {folderPath ? folderPath : 'Select a folder'}
      </Button>
    </div>
  )
}

/**
 * Check is the selected folder initialized.
 * @param folderPath A selected folder path.
 * @param setFolderIsInitialized A state setter.
 */
const validateFolder = async (folderPath: string): Promise<boolean> => {

  const url: string = `http://127.0.0.1:5000/api/project/validate?path=${encodeURIComponent(folderPath)}`;
  const response: Response = await fetch(url);
  const data: { [key: string]: any } = await response.json();
  // Check if the response is OK.
  if (!response.ok) {
    console.log('Failed to validate the selected folder.');
    console.log('Get an error message: ' + data.error);
    return true;
  }
  return data.valid;

}

export default SelectFolder
