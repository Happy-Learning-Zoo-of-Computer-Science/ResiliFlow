import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Layout } from 'antd'

import ChooseProject from './pages/project/SelectProject'
import CreateProject from './pages/project/CreateProject'
import LoadProject from './pages/project/LoadProject'
import ImportProject from './pages/project/ImportProject'
import Inspection from './pages/Inspection'
import Report from './pages/Report'
import PipelineEditor from './pages/pipeline/PipelineEditor'
import Home from './pages/Home'
import AppFooter from './components/AppFooter'

import './assets/css/App.css'
import { SideBar } from './components/SiderBar'
import { VisualizePanel } from './pages/VisualizePanel'
import {useState} from "react";

const { Content, Footer } = Layout

const App = () => {
  const [folderPath, setFolderPath] = useState<string>('');
  const createProjectProps = {folderPath, setFolderPath};
  const pipelineEditorProps = {folderPath};

  return (
    <Router>
      <Layout className="main-layout">
        <Layout className="content-layout">
          <SideBar />{' '}
          <Content className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/choose-project" element={<ChooseProject />} />
              <Route path="/create-project" element={<CreateProject {...createProjectProps} />} />
              <Route path="/load-project" element={<LoadProject />} />
              <Route path="/import-project" element={<ImportProject />} />
              <Route path="/inspection" element={<Inspection />} />
              <Route path="/report/:pipelineId" element={<Report />} />
              <Route path="/visualize" element={<VisualizePanel />} />
              <Route path="/pipeline" element={<PipelineEditor {...pipelineEditorProps} />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
            <Footer className="main-footer" >
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

export default App
