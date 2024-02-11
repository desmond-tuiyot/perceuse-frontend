import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { D3DragBehavior, D3Simulation } from '../entities'

type DragHook<DraggedElement> = React.RefObject<DraggedElement>
type UpdateNodePosition = (x: number | null, y: number | null) => void

/**
 * Custom hook to handle dragging of nodes in the network diagram
 * @prop `simulation` - d3 force simulation object 
 * @prop `updateNodePosition` - function to update the position of a node
 * @returns ref to apply to the element we want to make draggable
 */
function useDrag<DraggedElement extends Element> (simulation: D3Simulation, simulationInitialized: boolean, updateNodePosition: UpdateNodePosition): DragHook<DraggedElement> {
  const dragRef = useRef(undefined as unknown as D3DragBehavior<DraggedElement>)
  useEffect(() => {
    if (!simulationInitialized) return
    dragRef.current = d3.drag<DraggedElement, unknown, unknown>()
      .on('start', (event) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        updateNodePosition(event.subject.x, event.subject.y)
      })
      .on('drag', (event) => {
        updateNodePosition(event.x, event.y)
      })
      .on('end', (event) => {
        if (!event.active) simulation.alphaTarget(0)
        updateNodePosition(null, null)
      })
  }, [simulationInitialized])

  const draggedRef = useRef<DraggedElement>(undefined as unknown as DraggedElement)
  useEffect(() => {
    if (draggedRef.current && simulationInitialized) {
      d3.select(draggedRef.current).call(dragRef.current)
    }
  }, [simulationInitialized])

  return draggedRef
}

export default useDrag

