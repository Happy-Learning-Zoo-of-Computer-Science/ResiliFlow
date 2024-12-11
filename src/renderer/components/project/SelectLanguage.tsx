import React, { useState, useEffect } from 'react'

interface SelectLanguageProps {
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
  selectedFramework: string
  setSelectedFramework: (framework: string) => void
}

/**
 * Select a programming language and a framework.
 * @param selectedLanguage Selected language.
 * @param setSelectedLanguage A state setter.
 * @returns A select list.
 */
const SelectLanguage: React.FC<SelectLanguageProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedFramework,
  setSelectedFramework,
}) => {

  // Fetch available languages.
  const [languages, setLanguages] = useState<string[]>([])

  useEffect(() => {
    const loadLanguages = async () => {
      const fetchedLanguages = await fetchLanguages()
      setLanguages(fetchedLanguages)
      setSelectedLanguage(fetchedLanguages[0])
      console.log("Reset framework");
    }
    loadLanguages();
  }, []);

  // Fetch available frameworks.
  const [frameworks, setFrameworks] = useState<string[]>([])

  // Update frameworks when language changes.
  useEffect(() => {
    const loadFrameworks = async () => {
      const fetchedFrameworks = await fetchFrameworks(selectedLanguage);
      setFrameworks(fetchedFrameworks);
      setSelectedFramework(fetchedFrameworks[0]);
    }
    loadFrameworks();
  }, [selectedLanguage])

  return (
    <div>
      <h2>Select a programming language and a framework.</h2>
      <select
        title="language"
        id="language-select"
        value={selectedLanguage}
        onChange={(event) => setSelectedLanguage(event.target.value)}
      >
        {languages.map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>
      <select
        title="framework"
        id="framework-select"
        value={selectedFramework}
        onChange={(event) => setSelectedFramework(event.target.value)}
      >
        {frameworks.map((framework, index) => (
          <option key={index} value={framework}>
            {framework}
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
  const result: Response = await fetch('http://127.0.0.1:5000/api/project/languages');
  if (!result.ok) {
    throw new Error(`Failed to fetch languages: ${result.statusText}`);
  }
  return await result.json();

}

/**
 * Get available frameworks.
 * @returns A list of available frameworks.
 */
const fetchFrameworks = async (language: string): Promise<string[]> => {
  
  // Call backend API to get available frameworks.
  const result: Response = await fetch(`http://127.0.0.1:5000/api/project/frameworks?language=${language}`);
  if (!result.ok) {
    throw new Error(`Failed to fetch frameworks: ${result.statusText}`);
  }
  let frameworks: string[] = await result.json();
  // Allow no framework.
  frameworks = ["", ...frameworks];
  return frameworks;

}

export default SelectLanguage
