import useGetDanceMoves from "../services/get-dance-move.api"

const DanceMovesView: React.FC = () => {
  const { data, loading, error } = useGetDanceMoves()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong!</p>

  return (
    <div>
      <h1>DanceMove</h1>
      <ul>
        {data?.danceMoves.map(danceMove => (
          <li key={danceMove.id}>{danceMove.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default DanceMovesView