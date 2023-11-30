import { useState } from "react"

import useAddDanceMove from "../services/add-dance-move.api"
import useGetDanceMoves from "../services/get-dance-move.api"

const AddDanceMove: React.FC = () => {
  const [moveName, setMoveName] = useState('') 
  const { call, error, loading } = useAddDanceMove()
  const { refetch } = useGetDanceMoves()

  if (error) return <p>Something went wrong!</p>

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoveName(event.target.value)
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await call({ 
      data: {
        name: moveName
      }
     })
     await refetch()
  }

  return (
    <div>
      <h1>Add Dance Move</h1>
      <form>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' onChange={handleChange} value={moveName} />
        <button type='submit' onClick={handleSubmit}>
          {loading ? 'Adding dance move...' : 'Add Dance Move'}
        </button>
      </form>
    </div>
  )
}

export default AddDanceMove