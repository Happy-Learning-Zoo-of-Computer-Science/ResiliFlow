import React, { useEffect, useState } from 'react'

interface SelectTemplatesProps {
  selectedLanguage: string
  setSelectedTemplates: React.Dispatch<React.SetStateAction<string[]>>
}

/**
 * Show a checklist of available templates of selected language.
 */
const SelectTemplates: React.FC<SelectTemplatesProps> = ({
  selectedLanguage,
  setSelectedTemplates,
}) => {
  const [templates, setTemplates] = useState<string[]>([])

  useEffect(() => {
    const loadTemplates = async () => {
      setTemplates(await fetchTemplates(selectedLanguage))
    }
    loadTemplates()
  }, [selectedLanguage])

  const handle = (template: string) => {
    setSelectedTemplates((previousSelected) => {
      if (previousSelected.includes(template)) {
        return previousSelected.filter((selected) => selected !== template)
      } else {
        return [...previousSelected, template]
      }
    })
  }

  return (
    <div>
      <h2>Select pipeline templates to be generated.</h2>
      {templates.map((template) => (
        <button key={template} onClick={() => handle(template)}>
          {template}
        </button>
      ))}
    </div>
  )
}

/**
 * Get available pipeline templates for the language.
 * @param selectedLanguage A supported programming language.
 * @returns A list of available pipeline templates.
 */
const fetchTemplates = async (selectedLanguage: string): Promise<string[]> => {
  // Mock implementation, replace with actual API call
  return ['Template A', 'Template B', 'Template C']
}

export default SelectTemplates
