import React, { useState } from 'react'
import SelectFolder from './SelectFolder'
import SelectLanguage from './SelectLanguage'
import SelectConfigurations from './SelectConfigurations'
import SelectTemplates from './SelectTemplates'

const CreateProject: React.FC = () => {
  const [folderPath, setFolderPath] = useState<string>('')
  const [folderIsInitialized, setFolderIsInitialized] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [selectedConfigurations, setSelectedConfigurations] = useState<
    string[]
  >([])
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])

  console.log(selectedLanguage)
  console.log(selectedConfigurations)
  console.log(selectedTemplates)

  return (
    <div>
      <SelectFolder 
        folderPath={folderPath} 
        setFolderPath={setFolderPath}
        folderIsInitialized={folderIsInitialized}
        setFolderIsInitialized={setFolderIsInitialized}
      />
      <SelectLanguage
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <SelectConfigurations
        selectedLanguage={selectedLanguage}
        setSelectedConfigurations={setSelectedConfigurations}
      />
      <SelectTemplates
        selectedLanguage={selectedLanguage}
        setSelectedTemplates={setSelectedTemplates}
      />
    </div>
  )
}

export default CreateProject
