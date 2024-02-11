import React from 'react'

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
  const { nodes, links } = useDrawNetwork({ width, height, data })
  return (
    <svg
      style={{ maxWidth: '100%', width, height: 'auto' }}
      width={width}
      height={height}
      viewBox={`0, 0, ${width}, ${height}`}
    >
      <NetworkLinks links={links} />
      <NetworkNodes nodes={nodes} />
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
    <g strokeWidth={1.5}>
      {nodes.map((node, index) => (
        <NetworkNode key={`${index}-node`} node={node} />
      ))}
      {nodes.map((node, index) => (
        <NodeLabel key={`${index}-label`} node={node} />
      ))}
    </g>
  )
}

/**
 * Renders the label for a node in the network diagram
 * @prop `node` - node data - contains label and position
 * @returns 
 */
const NodeLabel: React.FC<{ node: GraphNode }> = ({ node }) => {
  return (
    <text
      x={node.x}
      y={node.y}
      dy={-20}
      fontSize={18}
      fill='hsl(0, 0%, 10%)'
      textAnchor='middle'
      alignmentBaseline='middle'
    >
      {node.label}
    </text> 
  )
}

interface NetworkNodeProps {
  node: GraphNode
}

const NetworkNode: React.FC<NetworkNodeProps> = ({ node }) => {
  return (
    <circle
      key={node.id}
      cx={node.x}
      cy={node.y}
      r={5}
      fill='#0085FF'
    />
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
  return (
    <g stroke='#999' strokeWidth={1.5}>
      {links.map((link, index) => (
        <NetworkLink key={index} link={link} />
      ))}
    </g>  
  )
}

/**
 * Renders a single link between two nodes in the network diagram
 * @prop `link` - link data - specifies source and target nodes
 */
const NetworkLink: React.FC<{ link: GraphLink }> = ({ link }) => {
  const isGraphNode = (node: number | GraphNode): node is GraphNode => {
    return typeof node !== 'number'
  }
  if (!isGraphNode(link.source) || !isGraphNode(link.target)) return <></>

  return (
    <line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
    />
  )
}

export default NetworkDiagram