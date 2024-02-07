import { useEffect, useState } from 'react'
import * as d3 from 'd3'

import { GraphData, GraphLink, GraphNode } from '../entities/get-graph-data'

interface DrawNetworkParams {
  data: GraphData
  width: number
  height: number
}

interface DrawNetworkHook {
  nodes: GraphNode[]
  links: GraphLink[]
}

/**
 * Hook to draw a network graph using d3 force simulation
 * @param `data` - nodes & links for d3 force simulation
 * @param `width` - width of the canvas element
 * @param `height` - height of the canvas element
 */
const useDrawNetwork = ({ data, width, height }: DrawNetworkParams): DrawNetworkHook => {
  const links: GraphLink[] = data.links.map((d) => ({ ...d }))
  const nodes: GraphNode[] = data.nodes.map((d) => ({ ...d }))

  const [nodePositions, setNodePositions] = useState<GraphNode[]>([])
  const [linkPositions, setLinkPositions] = useState<GraphLink[]>([])

  useEffect(() => {
    d3.forceSimulation(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id((d) => d.id))
      .force('collide', d3.forceCollide().radius(120))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        setNodePositions([...nodes])
        setLinkPositions([...links])
      })

  }, [width, height, nodes, links])

  return {
    nodes: nodePositions,
    links: linkPositions
  }
}

export default useDrawNetwork
