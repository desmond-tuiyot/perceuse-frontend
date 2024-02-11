import React from 'react'

import useGetDanceMoves from '../../dance-move/services/get-dance-move.api'
import useGetTransitions from '../../transitions/services/get-transitions.api'
import NetworkDiagram from './network-diagram'
import getGraphData from '../entities/get-graph-data'

/**
 * Component to display the graph view
 */
const GraphView: React.FC = () => {
  const transitionsHook = useGetTransitions()
  const danceMovesHook = useGetDanceMoves()

  if (transitionsHook.loading || danceMovesHook.loading) return <p>Loading...</p>
  
  const danceMoves = danceMovesHook.data?.danceMoves || []
  if (danceMoves.length === 0) return <p>No dance moves found</p>
  
  const transitions = transitionsHook.data?.transitions || []
  const graphData = getGraphData(danceMoves, transitions)
  return (
    <NetworkDiagram width={1000} height={1000} data={graphData} />
  )
}

export default GraphView