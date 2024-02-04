import { useState } from 'react'
import { Button, Form, Input } from 'antd'

import useAddDanceMove from '../services/add-dance-move.api'
import useGetDanceMoves from '../services/get-dance-move.api'

import styles from './add-dance-move.module.css'

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
    setMoveName('')
    await refetch()
  }

  const handleEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await call({ 
        data: {
          name: moveName
        }
       })
      setMoveName('')
      await refetch()
    }
  }

  return (
    <Form layout='vertical'>
      <Form.Item>
        <Input type='text' name='name' id='name' onKeyUp={handleEnter} onChange={handleChange} value={moveName} />
      </Form.Item>
      <Form.Item>
        <Button size='large' type='primary' className={styles.submitButton} loading={loading} onClick={handleSubmit}>
          {loading ? 'Adding dance move...' : 'Add Dance Move'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddDanceMove
