import React, { useEffect } from 'react'
import * as d3 from 'd3'

import { GraphData, GraphLink, GraphNode } from '../entities/get-graph-data'

interface DrawNetworkParams {
  data: GraphData
  width: number
  height: number
  canvasRef: React.RefObject<HTMLCanvasElement>
}

/**
 * Hook to draw a network graph using d3 force simulation
 * @param `data` - nodes & links for d3 force simulation
 * @param `width` - width of the canvas element
 * @param `height` - height of the canvas element
 * @param `canvasRef` - ref to the canvas element
 */
const useDrawNetwork = ({ data, width, height, canvasRef }: DrawNetworkParams): void => {
  const links: GraphLink[] = data.links.map((d) => ({ ...d }))
  const nodes: GraphNode[] = data.nodes.map((d) => ({ ...d }))

  useEffect(() => {
    // set dimension of the canvas element
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!context) {
      return
    }

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id((d) => d.id))
      .force('collide', d3.forceCollide().radius(RADIUS))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        drawNetwork(context, width, height, nodes, links)
      })

      console.log('simulation', simulation)
  }, [width, height, nodes, links, canvasRef])

  const RADIUS = 10
  const drawNetwork = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    nodes: GraphNode[],
    links: GraphLink[]
  ) => {
    context.clearRect(0, 0, width, height)
  
    // Draw the links first
    links.forEach((link: d3.SimulationLinkDatum<GraphNode>) => {
      if (
        typeof link.source !== 'number' && typeof link.target !== 'number' &&
        typeof link.source !== 'string' && typeof link.target !== 'string' &&
        link.source.x !== undefined && link.source.y !== undefined &&
        link.target.x !== undefined && link.target.y !== undefined
      ) {
        context.beginPath()
        context.moveTo(link.source.x, link.source.y)
        context.lineTo(link.target.x, link.target.y)
        context.stroke()
      }
    })
  
    // Draw the nodes
    nodes.forEach((node) => {
      if (node.x !== undefined && node.y !== undefined) {
        context.beginPath()
        context.moveTo(node.x + RADIUS, node.y)
        context.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI)
        context.fillStyle = '#cb1dd1'
        context.fill()
      }
    })
  }
}

export default useDrawNetwork
