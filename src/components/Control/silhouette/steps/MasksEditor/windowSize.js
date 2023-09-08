import { useState, useEffect } from 'react'

function computeViewerDim() {
  return [innerWidth - 200, innerHeight - 200]
}

export default function useWindowSize() {
  const [viewerDim, setViewerDim] = useState(computeViewerDim)

  useEffect(() => {
    function onResize() {
      setViewerDim(computeViewerDim())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return viewerDim
}
