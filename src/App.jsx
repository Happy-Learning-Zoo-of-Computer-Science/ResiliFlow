import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChooseProject from './pages/ChooseProject';
import CreateProject from "./pages/CreateProject"
import LoadProject from "./pages/LoadProject"
import ImportProject from "./pages/ImportProject"


const App = () => {
    return (
        <Router>
            <ul>
                <li><Link to="/">Home page</Link></li>
            </ul>
            <Routes>
                <Route path="/" element={<ChooseProject />}></Route>
                <Route path="/create-project" element={<CreateProject />}></Route>
                <Route path="/load-project" element={<LoadProject />}></Route>
                <Route path="/import-project" element={<ImportProject />}></Route>
            </Routes>
        </Router>
    );
};

export default App;
