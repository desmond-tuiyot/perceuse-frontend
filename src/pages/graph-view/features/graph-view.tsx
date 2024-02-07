import React from 'react'

import useGetDanceMoves from '../../dance-move/services/get-dance-move.api'
import useGetTransitions from '../../transitions/services/get-transitions.api'
import NetworkDiagram from './network-diagram'
import getGraphData from '../entities/get-graph-data'

/**
 * Component to display the graph view
 */
const GraphView: React.FC = () => {
  const transitions = useGetTransitions()?.data?.transitions || []
  const danceMoves = useGetDanceMoves()?.data?.danceMoves || []

  if (!transitions.length || !danceMoves.length) return <p>Loading...</p>
  if (transitions.length === 0) return <p>No transitions found</p>
  if (danceMoves.length === 0) return <p>No dance moves found</p>

  const graphData = getGraphData(danceMoves, transitions)
  return (
    <NetworkDiagram width={1000} height={1000} data={graphData} />
  )
}

export default GraphView