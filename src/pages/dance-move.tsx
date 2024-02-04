import DanceMovesView from './dance-move/features/show-dance-moves'
import AddDanceMove from './dance-move/features/add-dance-move'

import styles from './dance-move.module.css'

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