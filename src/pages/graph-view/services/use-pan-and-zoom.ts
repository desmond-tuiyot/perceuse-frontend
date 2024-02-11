import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { D3ZoomBehavior } from '../entities'

interface ZoomHook<TransformedParentElement extends Element> {
  transform: string
  transformedElementParentRef: React.RefObject<TransformedParentElement>
}

/**
 * Custom hook to handle panning and zooming of the network diagram
 * @returns - `transform` - the current transform of the diagram & 
 *  `transformedElementParentRef` - ref to apply to the parent element of object to zoom & pan
 */
function usePanAndZoom<TransformedParentElement extends Element> (): ZoomHook<TransformedParentElement> {
  const [transform, setTransform] = useState('translate(0, 0)')
  
  const zoomRef = useRef(undefined as unknown as D3ZoomBehavior<TransformedParentElement>)
  useEffect(() => {
    zoomRef.current = d3.zoom<TransformedParentElement, unknown>()
      .on('zoom', (event) => {
        const { transform } = event
        setTransform(transform.toString())
      })
  }, [])
  
  const ref = useRef<TransformedParentElement>(undefined as unknown as TransformedParentElement)
  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(zoomRef?.current)
    }
  }, [])

  return {
    transform,
    transformedElementParentRef: ref
  }
}

export default usePanAndZoom