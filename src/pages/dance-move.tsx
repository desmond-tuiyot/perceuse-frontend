import DanceMovesView from './dance-move/features/show-dance-moves'
import AddDanceMove from './dance-move/features/add-dance-move'

const DanceMove: React.FC = () => {
  return (
    <div>
      <h1>Add & View Dance Moves</h1>
      <AddDanceMove />
      <DanceMovesView />
    </div>
  )
}

export default DanceMove