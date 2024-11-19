import { useState, useEffect } from 'react'

interface SelectConfigurationsProps {
  selectedLanguage: string
  setSelectedConfigurations: React.Dispatch<React.SetStateAction<string[]>>
}

/**
 * Show a checklist of available configuration files of selected language.
 * @param selectedLanguage Selected programming language.
 * @param setSelectedConfigurations A state setter.
 * @returns
 */
const SelectConfigurations: React.FC<SelectConfigurationsProps> = ({
  selectedLanguage,
  setSelectedConfigurations,
}) => {
  const [configurations, setConfigurations] = useState<string[]>([])

  useEffect(() => {
    const loadConfigurations = async () => {
      setConfigurations(await fetchConfigurations(selectedLanguage))
    }
    loadConfigurations()
  }, [selectedLanguage])

  const handle = (configuration: string) => {
    setSelectedConfigurations((previousSelected) => {
      if (previousSelected.includes(configuration)) {
        return previousSelected.filter((selected) => selected !== configuration)
      } else {
        return [...previousSelected, configuration]
      }
    })
  }

  return (
    <div>
      <h2>Select configuration files to be generated.</h2>
      {configurations.map((configuration) => (
        <button key={configuration} onClick={() => handle(configuration)}>
          {configuration}
        </button>
      ))}
    </div>
  )
}

/**
 * Get available configuration files for the language.
 * @param selectedLanguage A supported programming language.
 * @returns A list of available configuration files.
 */
const fetchConfigurations = async (
  selectedLanguage: string,
): Promise<string[]> => {
  return ['.gitignore', '.env', 'requirements.txt']
}

export default SelectConfigurations
