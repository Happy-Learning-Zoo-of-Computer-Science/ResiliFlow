import React, { useState } from 'react'
import { Button } from 'antd'
import SelectFolder from '../../components/project/SelectFolder'
import SelectLanguage from '../../components/project/SelectLanguage'
import SelectConfigurations from '../../components/project/SelectConfigurations'
import SelectTemplates from '../../components/project/SelectTemplates'

const CreateProject: React.FC = () => {
  const [folderPath, setFolderPath] = useState<string>('')
  const [folderIsInitialized, setFolderIsInitialized] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [selectedFramework, setSelectedFramework] = useState<string>('')
  const [selectedConfigurations, setSelectedConfigurations] = useState<
    string[]
  >([])
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [createProjectButtonColor, setCreateProjectButtonColor] = useState< 'default' | 'danger' >('default');

  console.log(selectedLanguage)
  console.log(selectedConfigurations)
  console.log(selectedTemplates)

  /**
   * Create a POST request to the backend to create a new project.
  */
  const createProject = async () => { 

    // If folder not selected, change the button color to red and return.
    if (!folderPath) {
      console.log('Folder not selected');
      setCreateProjectButtonColor('danger');
      return;
    }
    
    // If the folder is initialized, change the button color to red and return.
    if (folderIsInitialized) {
      setCreateProjectButtonColor('danger');
      return;
    }

    let payload: { [key: string]: any } = {
      'path': folderPath,
      'language': selectedLanguage,
    }

    // If framework is selected, add it to the payload.
    if (selectedFramework) {
      payload['framework'] = selectedFramework;
    }

    // If configurations are selected, add them to the payload one by one.
    for (let configuration of selectedConfigurations) {
      payload[configuration] = null;
    }

    // Send a POST request to the backend.
    const url = 'http://127.0.0.1:5000/api/project/create';
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Redirect to /pipeline if the project is created successfully.
    if (response.ok) {
      window.location.href = '/pipeline';
    } else {
      throw new Error(`Failed to fetch frameworks: ${response.statusText}`);
    }

  }

  return (
    <div>
      <SelectFolder 
        folderPath={folderPath} 
        setFolderPath={setFolderPath}
        setFolderIsInitialized={setFolderIsInitialized}
      />
      <SelectLanguage
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedFramework={selectedFramework}
        setSelectedFramework={setSelectedFramework}
      />
      <SelectConfigurations
        selectedLanguage={selectedLanguage}
        selectedFramework={selectedFramework}
        setSelectedConfigurations={setSelectedConfigurations}
      />
      <SelectTemplates
        selectedLanguage={selectedLanguage}
        setSelectedTemplates={setSelectedTemplates}
      />
      <p></p>
      <Button color={createProjectButtonColor} variant='outlined' onClick={createProject}>Create Project</Button>
    </div>
  )
}

export default CreateProject
