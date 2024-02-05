import React from 'react'

import GraphView from './graph-view/features/graph-view'
import styles from './layout.module.css'
import { Outlet } from 'react-router-dom'

/**
 * Component to lay out the graph view and the sidebar
 * @returns 
 */
const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}><Outlet /></div>
      <div className={styles.graphView}><GraphView /></div>
    </div>
  )
}

export default Layout