import React from "react";
import { Link } from "react-router-dom";

const ChooseProject = () => {
    return (
        <div>
            <ul>
                <li><Link to="/create-project">Create a project</Link></li>
                <li><Link to="/load-project">Load a project</Link></li>
                <li><Link to="/import-project">Import a project</Link></li>
            </ul>
        </div>
    );
};

export default ChooseProject;