import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined, ProjectOutlined} from '@ant-design/icons';

import ChooseProject from './pages/SelectProject';
import CreateProject from './pages/CreateProject';
import LoadProject from './pages/LoadProject';
import ImportProject from './pages/ImportProject';
import Inspection from './pages/Inspection';
import Report from './pages/Report';
// import PipelineEditor from './pages/pipeline/PipelineEditor';
import Home from './pages/Home';
import AppFooter from './components/AppFooter';

const {Content, Footer, Sider} = Layout;

const menuItems = [
    {
        key: '1',
        icon: <HomeOutlined/>,
        label: <Link to="/">Home</Link>,
    },
    {
        key: '2',
        icon: <ProjectOutlined/>,
        label: <Link to="/create-project">Create Project</Link>,
    },
    {
        key: '3',
        icon: <ProjectOutlined/>,
        label: <Link to="/choose-project">Choose Project</Link>,
    },
    {
        key: '4',
        icon: <ProjectOutlined/>,
        label: <Link to="/pipeline">Pipeline Editor</Link>,
    },
    {
        key: '5',
        icon: <ProjectOutlined/>,
        label: <Link to="/inspection">Inspection</Link>,
    },
    {
        key: '6',
        icon: <ProjectOutlined/>,
        label: <Link to="/report">Report</Link>,
    },
];

const App = () => {
    return (
        <Router>
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    style={{
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems}/>
                </Sider>
                <Layout style={{display: 'flex', flexDirection: 'column', marginLeft: 200}}>
                    {/*<Header style={{ padding: 0 }}>*/}
                    {/*  <AppHeader />*/}
                    {/*</Header>*/}
                    <Content style={{margin: '16px', flex: 1, overflow: 'auto'}}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/choose-project" element={<ChooseProject/>}/>
                            <Route path="/create-project" element={<CreateProject/>}/>
                            <Route path="/load-project" element={<LoadProject/>}/>
                            <Route path="/import-project" element={<ImportProject/>}/>
                            <Route path="/inspection" element={<Inspection/>}/>
                            <Route path="/report/:pipelineId" element={<Report/>}/>
                            {/*<Route path="/pipeline" element={<PipelineEditor/>}/>*/}
                            <Route path="*" element={<h1>404 Not Found</h1>}/>
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <AppFooter/>
                    </Footer>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;