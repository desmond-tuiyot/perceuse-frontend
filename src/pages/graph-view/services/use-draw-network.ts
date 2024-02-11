import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

import { GraphData } from '../entities/get-graph-data'
import { D3Simulation, GraphLink, GraphNode } from '../entities'

interface DrawNetworkParams {
  data: GraphData
  width: number
  height: number
}

export type UpdateNodePosition = (index: number, x: number | null, y: number | null) => void

interface DrawNetworkHook {
  simulation: D3Simulation
  nodes: GraphNode[]
  links: GraphLink[]
  updateNodePosition: UpdateNodePosition
}

/**
 * Hook to draw a network graph using d3 force simulation
 * @param `data` - nodes & links for d3 force simulation
 * @param `width` - width of the canvas element
 * @param `height` - height of the canvas element
 */
const useDrawNetwork = ({ data, width, height }: DrawNetworkParams): DrawNetworkHook => {
  const dataRef = useRef(data)

  const [nodes, setNodes] = useState<GraphNode[]>(dataRef.current.nodes)
  const [links, setLinks] = useState<GraphLink[]>(dataRef.current.links)

  const simulation = useRef<D3Simulation>(undefined as unknown as D3Simulation)
  
  useEffect(() => {
    simulation.current = d3.forceSimulation<GraphNode, GraphLink>(dataRef.current.nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(dataRef.current.links).id((d) => d.id))
      .force('collide', d3.forceCollide(50))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        setNodes([...dataRef.current.nodes])
        setLinks([...dataRef.current.links])
      })
  }, [])

  const updateNodePosition = (index: number, x: number | null, y: number | null): void => {
    dataRef.current.nodes[index].fx = x
    dataRef.current.nodes[index].fy = y
  }

  return {
    simulation: simulation.current,
    nodes,
    links,
    updateNodePosition
  }
}

export default useDrawNetwork
