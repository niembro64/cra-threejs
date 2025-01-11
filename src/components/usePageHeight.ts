import { useState, useEffect } from 'react'

const usePageHeight = () => {
  const [pageHeight, setPageHeight] = useState(0)

  useEffect(() => {
    const updatePageHeight = () => {
      setPageHeight(
        Math.max(
          document.body.scrollHeight,
          document.documentElement.offsetHeight,
        ),
      )
    }

    // Update the page height initially
    updatePageHeight()

    // Add a listener for window resize events
    window.addEventListener('resize', updatePageHeight)

    // Cleanup the listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updatePageHeight)
    }
  }, [])

  useEffect(() => {
    console.log('pageHeight', pageHeight)
  }, [pageHeight])

  return pageHeight
}

export default usePageHeight
