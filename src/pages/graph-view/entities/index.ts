import * as d3 from 'd3'

export interface GraphNode extends d3.SimulationNodeDatum {
  id: number
  label: string
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: number
  target: number
  value: number
}

export type D3Simulation = d3.Simulation<GraphNode, GraphLink>

export type D3DragBehavior<DragElement extends Element> = d3.DragBehavior<DragElement, unknown, unknown>

export type D3ZoomBehavior<ZoomElement extends Element> = d3.ZoomBehavior<ZoomElement, unknown>