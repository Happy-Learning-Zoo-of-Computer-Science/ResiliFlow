import { useState, useEffect } from "react"

/**
 * Get an available language list from the server and build a select element.
 * @param {*} selectedLanguage Selected language.
 * @param {*} setSelectedLanguage A state setter.
 * @returns A select list.
 */
const SelectLanguage = ( {selectedLanguage, setSelectedLanguage} ) => {

    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        const loadLanguages = async () => {
            setLanguages(await fetchLanguages());
            setSelectedLanguage(languages[0]);
        };
        loadLanguages();
    }, []);

    return (
        <div>
            <h2>Select a programming language.</h2>
            <select id="language-select" value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)}>
                {languages.map((language, index) => (
                    <option key={index} value={language}>{language}</option>
                ))}
            </select>
        </div>
    )

};

/**
 * Get available languages.
 * @returns A list of avaliable languages.
 */
const fetchLanguages = async () => {
    return ["Python", "node.js"]
}

export default SelectLanguage;