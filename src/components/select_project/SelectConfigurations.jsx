import { useState, useEffect } from "react"

/**
 * Show a checklist of avaliable configuration files of selected language.
 * @param {*} selectedLanguage Selected programming language.
 * @param {*} setSelectedConfigurations A state setter.
 * @returns 
 */
const SelectConfigurations = ( {selectedLanguage,  setSelectedConfigurations} ) => {
    
    const [configurations, setConfigurations] = useState([]);
    useEffect(() => {
        const loadConfigurations = async () => {
            setConfigurations(await fetchConfigurations(selectedLanguage));
        };
        loadConfigurations();
    }, []);

    const handle = (configuration) => {
        setSelectedConfigurations((previousSelected) => {
            if (previousSelected.includes(configuration)) {
                return previousSelected.filter((selected) => selected !== configuration);
            } else {
                return [...previousSelected, configuration];
            }
        });
    };

    return (
        <div>
            <h2>Select configuration files to be generated. </h2>
            {configurations.map((configuration, index) => (
                <button key={configuration} onClick={() => handle(configuration)}>{configuration}</button> 
            ))}
        </div>
    );

};

/**
 * Get available configuration files for the language.
 * @param {*} selectedLanguage A supported programming language.
 * @returns A list of available configuration files.
 */
const fetchConfigurations = async (selectedLanguage) => {

    return [".gitignore", ".env", "requirements.txt"];

};

export default SelectConfigurations;