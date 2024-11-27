import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChooseProject from './pages/SelectProject'
import CreateProject from './pages/CreateProject'
import LoadProject from './pages/LoadProject'
import ImportProject from './pages/ImportProject'
import Inspection from './pages/Inspection'
import Report from './pages/Report'
import AppHeader from './components/AppHeader'
import Home from './pages/Home'
import AppFooter from './components/AppFooter'
import PipelineEditor from "./pages/pipeline/PipelineEditor";

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
          <Route path="/pipeline" element={<PipelineEditor />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <AppFooter />
      </Router>
    </>
  )
}

export default App
