import React from 'react'

import SequenceView from './features/sequence-view'
import Settings from './features/settings'
import TransitionControl from './features/transition-control'
import styles from './transition-trainer.module.css'

const TransitionTrainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <SequenceView />
      <TransitionControl />
      <Settings />
    </div>
  )
}

export default TransitionTrainer