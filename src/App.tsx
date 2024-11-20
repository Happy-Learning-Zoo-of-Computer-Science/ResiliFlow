import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ChooseProject from './components/select_project/SelectProject'
import CreateProject from './components/select_project/CreateProject'
import LoadProject from './components/select_project/LoadProject'
import ImportProject from './components/select_project/ImportProject'
import Inspection from './components/Inspection/Inspection'
import Report from './components/Inspection/Report'
import AppHeader from './components/AppHeader'
import Home from './components/Home'
import AppFooter from './components/AppFooter'

const App = () => {
  return (
    <>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/choose-project" element={<ChooseProject />}></Route>
          <Route path="/create-project" element={<CreateProject />}></Route>
          <Route path="/load-project" element={<LoadProject />}></Route>
          <Route path="/import-project" element={<ImportProject />}></Route>
          <Route path="/inspection" element={<Inspection />}></Route>
          <Route path="/report/:pipelineId" element={<Report />}></Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <AppFooter />
      </Router>
    </>
  )
}

export default App
