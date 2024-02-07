import React, { useRef } from 'react'

import useDrawNetwork from '../services/use-draw-network'
import { GraphData, GraphLink, GraphNode } from '../entities/get-graph-data'

interface NetworkDiagramProps {
  width: number
  height: number
  data: GraphData
}

/**
 * Renders the network diagram representing transitions between dance moves
 * @prop `width` - width of the diagram
 * @prop `height` - height of the diagram
 * @prop `data` - graph data to be rendered - contains nodes and links
 */
const NetworkDiagram: React.FC<NetworkDiagramProps> = ({ width, height, data }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { nodes, links } = useDrawNetwork({ width, height, data })
  return (
    <svg
      ref={svgRef}
      style={{ maxWidth: '100%', width, height: 'auto' }}
      width={width}
      height={height}
      viewBox={`0, 0, ${width}, ${height}`}
    >
      <NetworkNodes nodes={nodes} />
      <NetworkLinks links={links} />
    </svg>
  )
}

interface NetworkNodesProps {
  nodes: GraphNode[]
}

/**
 * Renders the nodes in the network diagram
 * @prop `nodes` - array of nodes to be rendered
 */
const NetworkNodes: React.FC<NetworkNodesProps> = ({ nodes }) => {
  return(
    <g stroke='#fff' strokeWidth={1.5}>
      {nodes.map(node => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={12}
          fill='#0085FF'
        />
      ))}
    </g>
  )
}

interface NetworkLinksProps {
  links: GraphLink[]
}

/**
 * Renders the links between nodes in the network diagram
 * @prop `links` - array of links between nodes
*/
const NetworkLinks: React.FC<NetworkLinksProps> = ({ links }) => {
  const isGraphNode = (node: number | GraphNode): node is GraphNode => {
    return typeof node !== 'number'
  }


  return (
    <g stroke='#999' strokeWidth={1.5}>
      {links.map(link => (
        isGraphNode(link.source) && isGraphNode(link.target) ? (
          <line
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
          />
        ) : null
      ))}
    </g>  
  )
}

export default NetworkDiagram