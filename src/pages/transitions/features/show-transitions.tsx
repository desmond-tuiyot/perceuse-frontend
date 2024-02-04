import React from 'react'
import { List, Tag } from 'antd'

import useGetTransitions from '../services/get-transitions.api'
import styles from './show-transitions.module.css'

/**
 * Renders the list of transitions
 */
const ShowTransitions: React.FC = () => {
  const { data, loading, error } = useGetTransitions()

  if (loading) return <p>Loading transitions...</p>
  if (error) return <p>Couldn't fetch transitions</p>

  const getTransitionColor = (id: number) => {
    if (id % 2 === 0) return 'blue'
    return 'green'
  }

  return (
    <div>
      <List
        header={<div className={styles.header}>Transitions</div>}
        itemLayout='horizontal'
        dataSource={data?.transitions}
        renderItem={(item, index) => (
          <List.Item>
            <Tag color={getTransitionColor(index)}>{item?.danceMove1?.name}</Tag> - <Tag color={getTransitionColor(index+1)}>{item?.danceMove2?.name}</Tag>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ShowTransitions
