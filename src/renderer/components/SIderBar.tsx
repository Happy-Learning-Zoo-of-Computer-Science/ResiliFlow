import { HomeOutlined, ProjectOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Link } from 'react-router-dom'
const menuItems = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: '2',
    icon: <ProjectOutlined />,
    label: <Link to="/create-project">Create Project</Link>,
  },
  {
    key: '3',
    icon: <ProjectOutlined />,
    label: <Link to="/choose-project">Choose Project</Link>,
  },
  {
    key: '4',
    icon: <ProjectOutlined />,
    label: <Link to="/pipeline">Pipeline Editor</Link>,
  },
  {
    key: '5',
    icon: <ProjectOutlined />,
    label: <Link to="/inspection">Inspection</Link>,
  },
  {
    key: '6',
    icon: <ProjectOutlined />,
    label: <Link to="/report">Report</Link>,
  },
  {
    key: '7',
    icon: <ProjectOutlined />,
    label: <Link to="/visualize">Visualize</Link>,
  },
]
export const SideBar: React.FC = () => {
  return (
    <Sider className="main-layout-sider">
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  )
}
