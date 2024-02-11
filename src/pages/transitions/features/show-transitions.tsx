import React from 'react'
import { Button, List, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import useGetTransitions from '../services/get-transitions.api'
import useRemoveTransition from '../services/remove-transition.api'

import styles from './show-transitions.module.css'

/**
 * Renders the list of transitions
 */
const ShowTransitions: React.FC = () => {
  const { data, loading, error, refetch } = useGetTransitions()
  const removeTransition = useRemoveTransition()

  if (loading) return <p>Loading transitions...</p>
  if (error) return <p>Couldn't fetch transitions</p>

  const getTransitionColor = (id: number) => {
    if (id % 2 === 0) return 'blue'
    return 'green'
  }

  const handleDelete = async (id: number) => {
    await removeTransition.call(id)
    await refetch()
  }

  return (
    <div>
      <List
        header={<div className={styles.header}>Transitions</div>}
        itemLayout='horizontal'
        dataSource={data?.transitions}
        renderItem={(item, index) => (
          <List.Item>
            <div className={styles.listContent}>
              <div>
                <Tag color={getTransitionColor(index)}>{item?.danceMove1?.name}</Tag> - <Tag color={getTransitionColor(index+1)}>{item?.danceMove2?.name}</Tag>
              </div>
              <Button type='text' onClick={() => handleDelete(item.id)}>
                <DeleteOutlined />
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ShowTransitions
