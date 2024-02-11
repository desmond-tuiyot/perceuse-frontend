import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'
import { MergeOutlined, CrownOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import GraphView from './graph-view/features/graph-view'
import styles from './layout.module.css'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dance Moves', 'dance-moves', <CrownOutlined />),
  getItem('Transitions', 'transitions', <MergeOutlined />)
]

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const navigate = useNavigate()

  return (
    <>
      <div className={styles.navigation}>
        <Button className={styles.collapse} type='primary' onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['dance-moves']}
          mode='inline'
          inlineCollapsed={collapsed}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
       </div>
      <div className={styles.content}><Outlet /></div>
    </>
  )
}

/**
 * Component to lay out the graph view and the sidebar
 */
const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}><SideBar /></div>
      <div className={styles.graphView}><GraphView /></div>
    </div>
  )
}

export default Layout