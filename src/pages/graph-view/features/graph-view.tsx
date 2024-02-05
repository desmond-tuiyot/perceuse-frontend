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

  const graphData = getGraphData(danceMoves, transitions)
  return (
    <NetworkDiagram width={600} height={600} data={graphData} />
  )
}

export default GraphView