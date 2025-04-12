import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Lela = () => {
  const [rawHtml, setRawHtml] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timestamp, setTimestamp] = useState<string>('')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  // Check user's preferred color scheme on component mount
  useEffect(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    setIsDarkMode(prefersDark)

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Make the actual request to the foreclosure website
      // Note: This will work only with a CORS extension enabled in the browser
      const response = await axios.get(
        'https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostbyTownList.aspx',
      )

      // Log the raw HTML for debugging
      console.log('Raw HTML received:', response.data.substring(0, 500) + '...')

      // Set the raw HTML and timestamp
      setRawHtml(response.data)
      setTimestamp(new Date().toLocaleString())
    } catch (err) {
      setError('Failed to fetch data. Please try again later.')
      console.error('Error fetching data:', err)

      if (axios.isAxiosError(err)) {
        console.error('Axios error details:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Toggle dark mode manually
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6 text-center">
          <h1
            className={`mb-2 text-3xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
          >
            Raw HTML Data
          </h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            From:
            https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostbyTownList.aspx
          </p>
        </header>

        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p
                className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Data fetched at:{' '}
                <span className="font-semibold">{timestamp}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={toggleDarkMode}
                className={`rounded px-4 py-2 text-sm font-medium transition ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={fetchData}
                className={`rounded px-4 py-2 text-white transition ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="my-8 flex justify-center">
            <div
              className={`h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 ${
                isDarkMode ? 'border-blue-400' : 'border-blue-500'
              }`}
            ></div>
          </div>
        )}

        {error && (
          <div
            className={`mb-6 rounded-lg p-4 ${
              isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'
            }`}
          >
            <h3 className="mb-1 font-semibold">Error</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-6">
            <div className="mb-4">
              <h2
                className={`text-xl font-semibold ${isDarkMode ? 'text-blue-300' : ''}`}
              >
                HTML Content
              </h2>
              <p
                className={
                  isDarkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-600'
                }
              >
                Raw HTML from the source website:
              </p>
            </div>

            <div
              className={`mb-4 overflow-hidden rounded-lg border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div
                className={isDarkMode ? 'bg-gray-800 p-2' : 'bg-gray-100 p-2'}
              >
                <p
                  className={`font-mono text-xs ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Content Length: {rawHtml.length} characters
                </p>
              </div>
              <div className="max-h-[70vh] overflow-auto p-4">
                <pre
                  className={`whitespace-pre-wrap break-words rounded p-4 font-mono text-xs ${
                    isDarkMode
                      ? 'border border-gray-700 bg-gray-800 text-gray-300'
                      : 'bg-gray-50 text-gray-800'
                  }`}
                >
                  {rawHtml}
                </pre>
              </div>
            </div>

            <div className="mb-4">
              <h2
                className={`text-xl font-semibold ${isDarkMode ? 'text-blue-300' : ''}`}
              >
                Iframe View
              </h2>
              <p
                className={
                  isDarkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-600'
                }
              >
                Rendered HTML (may not work due to browser security):
              </p>
            </div>

            <div
              className={`h-[500px] w-full rounded border ${
                isDarkMode ? 'border-gray-700 bg-white' : 'border-gray-200'
              }`}
            >
              <iframe
                srcDoc={rawHtml}
                title="Foreclosure Data"
                className="h-full w-full"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lela
