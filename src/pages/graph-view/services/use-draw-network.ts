import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

import { GraphData, GraphLink, GraphNode } from '../entities/get-graph-data'

interface DrawNetworkParams {
  data: GraphData
  width: number
  height: number
}

interface DrawNetworkHook {
  simulation: d3.Simulation<GraphNode, GraphLink>
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
  const linksCopy: GraphLink[] = data.links.map((d) => ({ ...d }))
  const nodesCopy: GraphNode[] = data.nodes.map((d) => ({ ...d }))

  const [nodes, setNodes] = useState<GraphNode[]>(nodesCopy)
  const [links, setLinks] = useState<GraphLink[]>(linksCopy)

  const simulation = useRef<d3.Simulation<GraphNode, GraphLink>>(undefined as unknown as d3.Simulation<GraphNode, GraphLink>)
  
  useEffect(() => {
    simulation.current = d3.forceSimulation<GraphNode, GraphLink>(nodesCopy)
      .force('link', d3.forceLink<GraphNode, GraphLink>(linksCopy).id((d) => d.id))
      .force('collide', d3.forceCollide(50))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        setNodes([...nodesCopy])
        setLinks([...linksCopy])
      })
  }, [])

  return {
    simulation: simulation.current,
    nodes,
    links
  }
}

export default useDrawNetwork
