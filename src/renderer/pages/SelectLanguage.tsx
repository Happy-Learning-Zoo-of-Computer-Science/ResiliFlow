import React, { useState, useEffect } from 'react'

interface SelectLanguageProps {
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
}

/**
 * Get an available language list from the server and build a select element.
 * @param selectedLanguage Selected language.
 * @param setSelectedLanguage A state setter.
 * @returns A select list.
 */
const SelectLanguage: React.FC<SelectLanguageProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const [languages, setLanguages] = useState<string[]>([])

  useEffect(() => {
    const loadLanguages = async () => {
      const fetchedLanguages = await fetchLanguages()
      setLanguages(fetchedLanguages)
      setSelectedLanguage(fetchedLanguages[0])
    }
    loadLanguages()
  }, [setSelectedLanguage])

  return (
    <div>
      <h2>Select a programming language.</h2>
      <select
        title="language"
        id="language-select"
        value={selectedLanguage}
        defaultValue={selectedLanguage[0]}
        onChange={(event) => setSelectedLanguage(event.target.value)}
      >
        {languages.map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  )
}

/**
 * Get available languages.
 * @returns A list of available languages.
 */
const fetchLanguages = async (): Promise<string[]> => {
  // Call backend API to get available languages.
  let result = await fetch('http://127.0.0.1:5000/api/project/languages')
  return await result.json()
}

export default SelectLanguage
