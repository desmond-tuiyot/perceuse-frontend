import DanceMovesView from './features/show-dance-moves'
import AddDanceMove from './features/add-dance-move'

import styles from './dance-move.module.css'

/**
 * Lays out the dance moves list view & the add dance move form
 */
const DanceMove: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.movesList}>
        <DanceMovesView />
      </div>
      <div>
        <AddDanceMove />
      </div>
    </div>
  )
}

export default DanceMove