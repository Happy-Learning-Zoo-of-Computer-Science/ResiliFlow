import { useState, useEffect } from 'react'
import { Button } from 'antd'

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

  // Variant of each button.
  const [variants, setVariants] = useState<{ [key: string]: 'outlined' | 'solid' }>({});

  // Get supported configuration files for the selected language.
  const [configurations, setConfigurations] = useState<{ [key: string]: any }>({});
  useEffect(() => {
    fetchConfigurations(selectedLanguage).then((configurations) => {
      setConfigurations(configurations);
      setVariants(Object.keys(configurations).reduce((acc, key) => {
        acc[key] = 'outlined';
        return acc;
      }, {} as { [key: string]: 'outlined' | 'solid' }));
    });
  }, [selectedLanguage]);

  // Handle function to update the selected configurations. 
  const handle = (configuration: string) => {
    setSelectedConfigurations((previousSelected) => {
      if (previousSelected.includes(configuration)) {
        setVariants({ ...variants, [configuration]: 'outlined' });
        return previousSelected.filter((selected) => selected !== configuration)
      } else {
        setVariants({ ...variants, [configuration]: 'solid' });
        return [...previousSelected, configuration]
      }
    })
  };

  // Return a list of checkboxes for each configuration file and text bars for required data.
  return (
    <div>
      <h2>Select configuration files to be generated.</h2>
      {Object.keys(configurations).map((configuration: string) => (
        <Button key={configuration} id={configuration} color='default' variant={variants[configuration]} onClick={() => handle(configuration)}>
          {configuration}
        </Button>
      ))}
    </div>
  );

}

/**
 * Get available configuration files for the language.
 * @param selectedLanguage A supported programming language.
 * @returns A dictionary of available configuration files and their required data.
 */
const fetchConfigurations = async (
  selectedLanguage: string,
): Promise<Object> => {
  if (selectedLanguage === 'None') {
    return {} as Object;
  }

  try {
    const url = `http://127.0.0.1:5000/api/project/configurations/supported?language=${encodeURIComponent(selectedLanguage)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch configurations: ${response.statusText}`);
    }

    const configurations: Object = await response.json();
    return configurations;

  } catch (error) {
    console.error('Error fetching configurations:', error);
    return {} as Object;
  }
};


export default SelectConfigurations
