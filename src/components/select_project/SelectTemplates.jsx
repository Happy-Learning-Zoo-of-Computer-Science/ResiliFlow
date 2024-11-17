import { useEffect, useState } from "react"

/**
 * Show a checklist of avaliable templates of selected language.
 * @param {*} selectedLanguage Selected language.
 * @param {*} setSelectedTemplates A state setter.
 * @returns 
 */
const SelectTemplates = ( {selectedLanguage, setSelectedTemplates} ) => {
    
    const [templates, setTemplates] = useState([]);
    useEffect(() => {
        const loadTemplates = async () => {
            setTemplates(await fetchTemplates(selectedLanguage));
        };
        loadTemplates();
    }, []);

    const handle = (template) => {
        setSelectedTemplates((previousSelected) => {
            if (previousSelected.includes(template)) {
                return previousSelected.filter((selected) => selected !== template);
            } else {
                return [...previousSelected, template];
            }
        });
    };

    return (
        <div>
            <h2>Select pipeline templates to be generated. </h2>
            {templates.map((template, index) => (
                <button key={template} onClick={() => handle(template)}>{template}</button> 
            ))}
        </div>
    );

};

/**
 * Get available pipeline templates for the language.
 * @param {*} selectedLanguage A supported programming language.
 * @returns A list of available pipeline templates.
 */
const fetchTemplates = async (selectedLanguage) => {

    return ["Template A", "Template B", "Template C"];

};

export default SelectTemplates;