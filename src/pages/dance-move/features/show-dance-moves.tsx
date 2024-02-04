import { useApolloClient } from '@apollo/client'
import { Button, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import useGetDanceMoves from '../services/get-dance-move.api'
import useRemoveDanceMove from '../services/remove-dance-move.api'
import styles from './show-dance-moves.module.css'

const DanceMovesView: React.FC = () => {
  const { data, loading, error } = useGetDanceMoves()
  const removeDanceMove = useRemoveDanceMove()
  const client = useApolloClient()

  const handleDelete = async (id: string) => {
    await removeDanceMove.call(id)
    await client.refetchQueries({ include: ['getDanceMoves'] })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong!</p>

  const danceMoves = data?.danceMoves.map(danceMove => ({
    id: danceMove.id,
    title: danceMove.name
  }))

  return (
    <div>
      <List
        header={<div className={styles.header}>Dance Moves</div>}
        itemLayout='horizontal'
        dataSource={danceMoves}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<div className={styles.danceMoveName}>{item.title}</div>}
            />
            <Button loading={removeDanceMove.loading} type='text' onClick={() => handleDelete(item.id)}>
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      />
    </div>
  )
}

export default DanceMovesView