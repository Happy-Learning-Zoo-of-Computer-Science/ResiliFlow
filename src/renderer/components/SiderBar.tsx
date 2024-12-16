import {
  ApartmentOutlined,
  ControlOutlined,
  HomeOutlined,
  InsertRowAboveOutlined,
  MacCommandOutlined,
  ProjectOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: '/create-project',
    icon: <ControlOutlined />,
    label: <Link to="/create-project">Project Configuration</Link>,
  },
  // {
  //   key: '/choose-project',
  //   icon: <ProjectOutlined />,
  //   label: <Link to="/choose-project">Choose Project</Link>,
  // },
  {
    key: '/pipeline',
    icon: <ApartmentOutlined />,
    label: <Link to="/pipeline">Visual Script Management</Link>,
  },
  {
    key: '/inspection',
    icon: <InsertRowAboveOutlined />,
    label: <Link to="/inspection">Inspection</Link>,
  },
  // {
  //   key: '/report',
  //   icon: <ProjectOutlined />,
  //   label: <Link to="/report">Report</Link>,
  // },
  // {
  //   key: '/visualize',
  //   icon: <ProjectOutlined />,
  //   label: <Link to="/visualize">Visualize</Link>,
  // },
]
export const SideBar: React.FC = () => {
  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname)

  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location.pathname])
  return (
    <Sider width={260} className="main-layout-sider">
      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  )
}