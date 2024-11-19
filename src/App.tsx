import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ChooseProject from './components/select_project/SelectProject'
import CreateProject from './components/select_project/CreateProject'
import LoadProject from './components/select_project/LoadProject'
import ImportProject from './components/select_project/ImportProject'

const App = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home page</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<ChooseProject />}></Route>
        <Route path="/create-project" element={<CreateProject />}></Route>
        <Route path="/load-project" element={<LoadProject />}></Route>
        <Route path="/import-project" element={<ImportProject />}></Route>
      </Routes>
    </Router>
  )
}

export default App
