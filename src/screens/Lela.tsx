import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Lela = () => {
  const [rawHtml, setRawHtml] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timestamp, setTimestamp] = useState<string>('')

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

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold">Raw HTML Data</h1>
        <p className="text-gray-600">
          From:
          https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostbyTownList.aspx
        </p>
      </header>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Data fetched at:{' '}
              <span className="font-semibold">{timestamp}</span>
            </p>
          </div>
          <button
            onClick={fetchData}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {loading && (
        <div className="my-8 flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          <h3 className="mb-1 font-semibold">Error</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">HTML Content</h2>
            <p className="text-sm text-gray-600">
              Raw HTML from the source website:
            </p>
          </div>

          <div className="mb-4 overflow-hidden rounded-lg border">
            <div className="bg-gray-100 p-2">
              <p className="font-mono text-xs">
                Content Length: {rawHtml.length} characters
              </p>
            </div>
            <div className="max-h-[70vh] overflow-auto p-4">
              <pre className="whitespace-pre-wrap break-words rounded bg-gray-50 p-4 font-mono text-xs">
                {rawHtml}
              </pre>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Iframe View</h2>
            <p className="text-sm text-gray-600">
              Rendered HTML (may not work due to browser security):
            </p>
          </div>

          <div className="h-[500px] w-full border">
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
  )
}

export default Lela
