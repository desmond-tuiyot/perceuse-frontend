import { DanceMove } from '../../dance-move/entities' 
import { Transition } from '../../transitions/entities'
import { GraphLink, GraphNode } from '.'

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

/**
 * Formats moves & transitions data into nodes & links for d3 force simulation
 * @param moves - array of dance moves
 * @param transitions - array of transitions
 * @returns - nodes & links for d3 force simulation
 */
const getGraphData = (moves: DanceMove[], transitions: Transition[]): GraphData => {
  const nodes = moves.map(move => ({
    id: move.id,
    label: move.name
  }))

  const links = transitions.map(transition => ({
    source: transition.danceMove1?.id,
    target: transition.danceMove2?.id,
    value: 1
  }))

  return { nodes, links }
}

export default getGraphData