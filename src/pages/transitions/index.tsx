import React from 'react'
import { Divider } from 'antd'

import AddTransitions from './features/add-transitions'
import ShowTransitions from './features/show-transitions'

import styles from './transitions.module.css'

/**
 * Lays out the transitions list view & the add transition form
 */
const Transitions: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.transitionsList}>
        <ShowTransitions />
      </div>
      <Divider />
      <div>
        <AddTransitions />
      </div>
    </div>
  )
}

export default Transitions
