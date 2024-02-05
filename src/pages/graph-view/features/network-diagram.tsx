import React, { useRef } from 'react'

import useDrawNetwork from '../services/use-draw-network'
import { GraphData } from '../entities/get-graph-data'

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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useDrawNetwork({ canvasRef, width, height, data })
  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
      }}
      width={width}
      height={height}
    />
  )
}

export default NetworkDiagram