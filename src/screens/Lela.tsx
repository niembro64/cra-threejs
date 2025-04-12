import React, { useState, useEffect } from 'react'
import axios from 'axios'

const showHTMLContent: boolean = false

// Define a type for all the information we want to extract
type PublicAuctionNotice = {
  // Case/filing details
  caseCaption: string
  fileDate: string
  docketNumber: string
  returnDate: string

  // Sale information
  town: string
  saleDate: string
  saleTime: string
  inspectionCommencingAt: string
  noticeFrom: string
  noticeThru: string

  // Notice details
  heading: string
  body: string

  // Committee contact
  committee: string

  // New field for the sale status (e.g., whether it is cancelled)
  status: string
}

function parsePublicAuctionNotice(htmlString: string): PublicAuctionNotice {
  // Create a new DOMParser instance and parse the HTML string into a document
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Helper function to get the trimmed text content by element ID
  const getText = (id: string): string => {
    const element = doc.getElementById(id)
    return element ? (element.textContent?.trim() ?? '') : ''
  }

  // Build and return the PublicAuctionNotice object with fields extracted by their IDs
  const notice: PublicAuctionNotice = {
    // Case and filing details
    caseCaption: getText('ctl00_cphBody_uEfileCaseInfo1_lblCaseCap'),
    fileDate: getText('ctl00_cphBody_uEfileCaseInfo1_lblFileDate'),
    docketNumber: getText('ctl00_cphBody_uEfileCaseInfo1_hlnkDocketNo'),
    returnDate: getText('ctl00_cphBody_uEfileCaseInfo1_lblRetDate'),

    // Sale information details
    town: getText('ctl00_cphBody_hlnktown1'),
    saleDate: getText('ctl00_cphBody_lblSaleDate'),
    saleTime: getText('ctl00_cphBody_lblSaleTime'),
    inspectionCommencingAt: getText('ctl00_cphBody_lblInsp'),
    noticeFrom: getText('ctl00_cphBody_lblNoticeFrom'),
    noticeThru: getText('ctl00_cphBody_lblNoticeThru'),

    // Notice header and body text
    heading: getText('ctl00_cphBody_lblHeading'),
    body: getText('ctl00_cphBody_lblBody'),

    // Committee contact information
    committee: getText('ctl00_cphBody_lblCommittee'),

    // Sale status (e.g., "This Sale is Cancelled.")
    status: getText('ctl00_cphBody_lblStatus'),
  }

  return notice
}

// Define a type for a foreclosure sale record including postingId
type ForeclosureSale = {
  index: number
  saleDate: string
  docketNumber: string
  saleInfo: string
  viewFullNoticeUrl: string
  postingId: string
}

function extractForeclosureSales(htmlString: string): ForeclosureSale[] {
  // Create a new DOMParser instance and parse the HTML string
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Get the table that holds the foreclosure sales records by its id
  const salesTable = doc.getElementById('ctl00_cphBody_GridView1')
  if (!salesTable) {
    return []
  }

  // Get all the rows in the table
  const rows = salesTable.querySelectorAll('tr')
  const sales: ForeclosureSale[] = []

  // Iterate over each row. Skip the header row (which contains <th> elements).
  rows.forEach((row) => {
    if (row.querySelector('th')) {
      // This is a header row – skip it.
      return
    }

    const cells = row.querySelectorAll('td')
    if (cells.length < 5) {
      return
    }

    // Extract the index from the first cell
    const indexText = cells[0].textContent?.trim() || '0'
    const saleIndex = parseInt(indexText, 10)

    // Extract the sale date (possibly containing a <br> for time) from the second cell
    const saleDate = cells[1].textContent?.trim() || ''

    // Extract the docket number from the <a> tag in the third cell
    const docketNumber = cells[2].querySelector('a')?.textContent?.trim() || ''

    // Extract sale details (sale type and property address) from the fourth cell
    const saleInfo = cells[3].textContent?.trim() || ''

    // Extract the "View Full Notice" URL from the <a> tag in the fifth cell
    const viewNoticeLink = cells[4].querySelector('a')
    const viewFullNoticeUrl = viewNoticeLink?.getAttribute('href') || ''

    // Extract the posting_id from the URL query parameter
    let postingId = ''
    if (viewFullNoticeUrl) {
      // Extract the query part after the "?" character
      const queryPart = viewFullNoticeUrl.split('?')[1]
      if (queryPart) {
        postingId = new URLSearchParams(queryPart).get('PostingId') || ''
      }
    }

    // Add the complete foreclosure sale record to our results array
    sales.push({
      index: saleIndex,
      saleDate,
      docketNumber,
      saleInfo,
      viewFullNoticeUrl,
      postingId,
    })
  })

  return sales
}

// Function to extract city names from HTML
// Define the type for a city's information
type CityInfo = {
  name: string
  count: number
}

function extractCityInfo(htmlString: string): CityInfo[] {
  // Create a new DOMParser instance to parse the HTML string
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Select all anchor elements with an href containing "PendPostbyTownDetails.aspx?town="
  const cityLinks = doc.querySelectorAll(
    "a[href*='PendPostbyTownDetails.aspx?town=']",
  )
  const cities: CityInfo[] = []

  // Iterate over the city links to extract the name and the count
  cityLinks.forEach((link) => {
    const name = link.textContent?.trim() || ''

    // Navigate to the next element siblings.
    // The expected structure is:
    // <a>City Name</a> <span> (</span> <span>Number</span> <span>)</span> <br>...
    const firstSpan = link.nextElementSibling // Should be the span containing "("
    let count = 0
    if (firstSpan) {
      const countSpan = firstSpan.nextElementSibling // Should be the span containing the count
      if (countSpan) {
        count = parseInt(countSpan.textContent || '0', 10)
      }
    }

    cities.push({ name, count })
  })

  return cities
}

// Define interface for foreclosure sale with auction notice
interface ForeclosureSaleWithNotice {
  city: string
  cityCount: number
  postingId: string
  saleDate: string
  docketNumber: string
  saleInfo: string
  viewFullNoticeUrl: string
  status: 'loading' | 'loaded' | 'error' | 'pending'
  auctionNotice?: PublicAuctionNotice
  errorMessage?: string
}

const Lela = () => {
  const [rawHtml, setRawHtml] = useState<string>('')
  const [cityNames, setCityNames] = useState<CityInfo[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [foreclosureSales, setForeclosureSales] = useState<
    ForeclosureSaleWithNotice[]
  >([])
  const [selectedSale, setSelectedSale] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timestamp, setTimestamp] = useState<string>('')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchText, setSearchText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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

  // Fetch foreclosure data for a specific city
  const fetchCityForeclosureData = async (
    cityName: string,
    cityCount: number,
  ) => {
    try {
      // Construct the URL for the city's foreclosure data
      const url = `https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostbyTownDetails.aspx?town=${encodeURIComponent(cityName)}`

      const response = await axios.get(url)
      console.log(
        `Fetched data for ${cityName}:`,
        response.data.substring(0, 100) + '...',
      )

      // Extract foreclosure sales from the city-specific HTML
      const cityForeclosureSales = extractForeclosureSales(response.data)

      // Map the sales to include the city name
      const salesWithCity = cityForeclosureSales.map((sale) => ({
        ...sale,
        city: cityName,
        cityCount: cityCount,
        status: 'pending' as const,
      }))

      return salesWithCity
    } catch (error) {
      console.error(`Error fetching data for ${cityName}:`, error)
      return []
    }
  }

  // Fetch foreclosure data for selected cities
  const fetchSelectedCitiesData = async (citiesToFetch: CityInfo[]) => {
    if (citiesToFetch.length === 0) return

    setLoadingCities(true)
    setForeclosureSales([])

    try {
      // Use Promise.all to fetch data for all cities concurrently
      const allSalesPromises = citiesToFetch.map((city) =>
        fetchCityForeclosureData(city.name, city.count),
      )

      // Process results as they come in
      const results = await Promise.all(allSalesPromises)

      // Flatten the array of arrays
      const allSales = results.flat()
      console.log('All foreclosure sales:', allSales)

      setForeclosureSales(allSales)
    } catch (error) {
      console.error('Error fetching city foreclosure data:', error)
      setError('Failed to fetch foreclosure data for selected cities.')
    } finally {
      setLoadingCities(false)
    }
  }

  // Handle city selection
  const handleCitySelection = (cityName: string) => {
    setSelectedCities((prev) => {
      // If already selected, remove it
      if (prev.includes(cityName)) {
        return prev.filter((name) => name !== cityName)
      }
      // Otherwise add it
      return [...prev, cityName]
    })
  }

  // Fetch selected cities data
  const handleFetchSelectedCities = () => {
    if (selectedCities.length === 0) {
      setError('Please select at least one city first.')
      return
    }

    const citiesToFetch = cityNames.filter((city) =>
      selectedCities.includes(city.name),
    )
    fetchSelectedCitiesData(citiesToFetch)
  }

  // Fetch main page data
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Make the actual request to the foreclosure website
      const response = await axios.get(
        'https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostbyTownList.aspx',
      )

      // Log the raw HTML for debugging
      console.log('Raw HTML received:', response.data.substring(0, 500) + '...')

      // Set the raw HTML and timestamp
      setRawHtml(response.data)
      setTimestamp(new Date().toLocaleString())

      // Extract and set city names
      const cities: CityInfo[] = extractCityInfo(response.data)
      console.log('Extracted city names:', cities)
      setCityNames(cities)
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

  // Load initial data
  useEffect(() => {
    fetchData()
  }, [])

  // Fetch auction notice details for a posting
  const fetchAuctionDetails = async (postingId: string) => {
    // Find the sale in our list
    const saleIndex = foreclosureSales.findIndex(
      (sale) => sale.postingId === postingId,
    )
    if (saleIndex === -1) return

    try {
      // Mark this sale as loading
      const updatedSales = [...foreclosureSales]
      updatedSales[saleIndex] = {
        ...updatedSales[saleIndex],
        status: 'loading',
      }
      setForeclosureSales(updatedSales)

      // Construct the URL for the auction notice
      const url = `https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostDetailPublic.aspx?PostingId=${postingId}`

      // Fetch the auction notice HTML
      const response = await axios.get(url)
      console.log(
        `Fetched auction details for posting ID ${postingId}:`,
        response.data.substring(0, 200) + '...',
      )

      // Parse the auction notice HTML
      const auctionNotice = parsePublicAuctionNotice(response.data)

      if (auctionNotice) {
        // Update the sale with the auction notice
        const newUpdatedSales = [...foreclosureSales]
        newUpdatedSales[saleIndex] = {
          ...newUpdatedSales[saleIndex],
          auctionNotice,
          status: 'loaded',
        }
        setForeclosureSales(newUpdatedSales)

        // Set this as the selected sale
        setSelectedSale(postingId)
      } else {
        throw new Error('Failed to parse auction notice')
      }
    } catch (error) {
      console.error(
        `Error fetching auction details for posting ID ${postingId}:`,
        error,
      )

      // Update the sale with the error
      const newUpdatedSales = [...foreclosureSales]
      newUpdatedSales[saleIndex] = {
        ...newUpdatedSales[saleIndex],
        status: 'error',
        errorMessage: 'Failed to load auction details',
      }
      setForeclosureSales(newUpdatedSales)
    }
  }

  // Load multiple auction details
  const loadBatchAuctionDetails = async (count: number = 5) => {
    // Find sales that don't have details loaded yet
    const salesToLoad = foreclosureSales
      .filter((sale) => sale.status === 'pending')
      .slice(0, count)

    if (salesToLoad.length === 0) return

    // Load details for each sale in parallel
    await Promise.all(
      salesToLoad.map((sale) => fetchAuctionDetails(sale.postingId)),
    )
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Calculate stats and summary data
  const calculateStats = () => {
    if (foreclosureSales.length === 0) return null

    const loadedSales = foreclosureSales.filter((s) => s.status === 'loaded')
    const cancelledSales = loadedSales.filter((s) =>
      s.auctionNotice?.status?.toLowerCase().includes('cancel'),
    )

    // Count by town
    const townCounts: Record<string, number> = {}
    loadedSales.forEach((sale) => {
      const town = sale.auctionNotice?.town || sale.city || 'Unknown'
      townCounts[town] = (townCounts[town] || 0) + 1
    })

    // Sort towns by count (descending)
    const topTowns = Object.entries(townCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return {
      totalSales: foreclosureSales.length,
      loadedSales: loadedSales.length,
      cancelledSales: cancelledSales.length,
      pendingSales: foreclosureSales.filter((s) => s.status === 'pending')
        .length,
      errorSales: foreclosureSales.filter((s) => s.status === 'error').length,
      topTowns,
    }
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
            Connecticut Foreclosure Data
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
                Refresh City List
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
            {/* City Selection List */}
            <div className="mb-8">
              <div className="mb-4">
                <h2
                  className={`text-xl font-semibold ${isDarkMode ? 'text-blue-300' : ''}`}
                >
                  Connecticut Cities with Foreclosure Data
                </h2>
                <p
                  className={
                    isDarkMode
                      ? 'text-sm text-gray-400'
                      : 'text-sm text-gray-600'
                  }
                >
                  {cityNames.length} cities found - select cities to view
                  foreclosure data
                </p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={handleFetchSelectedCities}
                  className={`rounded px-4 py-2 text-white transition ${
                    isDarkMode
                      ? 'bg-green-600 hover:bg-green-500'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                  disabled={loadingCities || selectedCities.length === 0}
                >
                  Fetch Selected Cities ({selectedCities.length})
                </button>
                <button
                  onClick={() => {
                    const allCities = cityNames.map((city) => city.name)
                    setSelectedCities(allCities)
                  }}
                  className={`rounded px-4 py-2 transition ${
                    isDarkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  disabled={loadingCities || cityNames.length === 0}
                >
                  Select All Cities
                </button>
                <button
                  onClick={() => setSelectedCities([])}
                  className={`rounded px-4 py-2 transition ${
                    isDarkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  disabled={loadingCities || selectedCities.length === 0}
                >
                  Clear Selection
                </button>
              </div>

              <div
                className={`overflow-hidden rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div
                  className={isDarkMode ? 'bg-gray-800 p-3' : 'bg-gray-100 p-3'}
                >
                  <h3
                    className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    Select Cities
                  </h3>
                </div>

                <div
                  className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  {cityNames.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {cityNames.map((city, index) => (
                        <div
                          key={index}
                          onClick={() => handleCitySelection(city.name)}
                          className={`cursor-pointer rounded-lg p-3 transition ${
                            selectedCities.includes(city.name)
                              ? isDarkMode
                                ? 'bg-blue-700 hover:bg-blue-600'
                                : 'bg-blue-100 hover:bg-blue-200'
                              : isDarkMode
                                ? 'bg-gray-700 hover:bg-gray-600'
                                : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <span
                            className={
                              selectedCities.includes(city.name)
                                ? isDarkMode
                                  ? 'text-blue-100'
                                  : 'text-blue-800'
                                : isDarkMode
                                  ? 'text-gray-100'
                                  : 'text-gray-800'
                            }
                          >
                            {city.name} ({city.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      No cities found. The website structure may have changed or
                      no data is available.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Loading Indicator */}
            {loadingCities && (
              <div className="my-8 flex flex-col items-center justify-center">
                <div
                  className={`mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 ${
                    isDarkMode ? 'border-blue-400' : 'border-blue-500'
                  }`}
                ></div>
                <p
                  className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Fetching foreclosure data...
                </p>
              </div>
            )}

            {/* Auction Notices Table */}
            {!loadingCities && foreclosureSales.length > 0 && (
              <div className="mb-8">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2
                      className={`text-xl font-semibold ${isDarkMode ? 'text-blue-300' : ''}`}
                    >
                      Public Auction Notice Data
                    </h2>
                    <p
                      className={
                        isDarkMode
                          ? 'text-sm text-gray-400'
                          : 'text-sm text-gray-600'
                      }
                    >
                      {
                        foreclosureSales.filter(
                          (sale) => sale.status === 'loaded',
                        ).length
                      }{' '}
                      of {foreclosureSales.length} auction details loaded
                    </p>
                  </div>

                  {/* Stats Summary */}
                  {(() => {
                    const stats = calculateStats()
                    if (!stats) return null

                    return (
                      <div
                        className={`mt-2 w-full rounded-lg p-3 ${
                          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                        }`}
                      >
                        <div className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                          <div
                            className={`rounded p-2 ${
                              isDarkMode
                                ? 'bg-gray-700'
                                : 'border border-gray-200 bg-white'
                            }`}
                          >
                            <p
                              className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                              Total Sales
                            </p>
                            <p
                              className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                              {stats.totalSales}
                            </p>
                          </div>
                          <div
                            className={`rounded p-2 ${
                              isDarkMode
                                ? 'bg-gray-700'
                                : 'border border-gray-200 bg-white'
                            }`}
                          >
                            <p
                              className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                              Loaded Details
                            </p>
                            <p
                              className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                              {stats.loadedSales}
                            </p>
                          </div>
                          <div
                            className={`rounded p-2 ${
                              isDarkMode
                                ? 'bg-gray-700'
                                : 'border border-gray-200 bg-white'
                            }`}
                          >
                            <p
                              className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                              Cancelled Sales
                            </p>
                            <p
                              className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                              {stats.cancelledSales}
                            </p>
                          </div>
                          <div
                            className={`rounded p-2 ${
                              isDarkMode
                                ? 'bg-gray-700'
                                : 'border border-gray-200 bg-white'
                            }`}
                          >
                            <p
                              className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                              Pending Details
                            </p>
                            <p
                              className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                              {stats.pendingSales}
                            </p>
                          </div>
                        </div>

                        {stats.topTowns.length > 0 && (
                          <div>
                            <p
                              className={`mb-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                              Top Towns by Sale Count:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {stats.topTowns.map(([town, count]) => (
                                <span
                                  key={town}
                                  className={`rounded-full px-2 py-1 text-xs ${
                                    isDarkMode
                                      ? 'bg-blue-900 text-blue-100'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {town}: {count}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })()}

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => loadBatchAuctionDetails(5)}
                      className={`rounded px-4 py-2 text-white transition ${
                        isDarkMode
                          ? 'bg-purple-600 hover:bg-purple-500'
                          : 'bg-purple-500 hover:bg-purple-600'
                      }`}
                      disabled={
                        loadingCities ||
                        foreclosureSales.every(
                          (sale) => sale.status !== 'pending',
                        )
                      }
                    >
                      Load Next 5 Auction Details
                    </button>
                    <button
                      onClick={() =>
                        loadBatchAuctionDetails(
                          foreclosureSales.filter(
                            (sale) => sale.status === 'pending',
                          ).length,
                        )
                      }
                      className={`rounded px-4 py-2 text-white transition ${
                        isDarkMode
                          ? 'bg-indigo-600 hover:bg-indigo-500'
                          : 'bg-indigo-500 hover:bg-indigo-600'
                      }`}
                      disabled={
                        loadingCities ||
                        foreclosureSales.every(
                          (sale) => sale.status !== 'pending',
                        )
                      }
                    >
                      Load All Remaining Details
                    </button>
                  </div>
                </div>

                {/* Search and Filter Controls */}
                <div
                  className={`mb-4 rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                >
                  <div className="flex flex-wrap gap-4">
                    <div className="min-w-[200px] flex-1">
                      <label
                        className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Search
                      </label>
                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                          setSearchText(e.target.value)
                          setCurrentPage(1) // Reset to first page on search
                        }}
                        placeholder="Search by case caption, docket number, or town..."
                        className={`w-full rounded border p-2 ${
                          isDarkMode
                            ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Filter Status
                      </label>
                      <select
                        value={filterStatus}
                        onChange={(e) => {
                          setFilterStatus(e.target.value)
                          setCurrentPage(1) // Reset to first page on filter change
                        }}
                        className={`rounded border p-2 ${
                          isDarkMode
                            ? 'border-gray-600 bg-gray-700 text-white'
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                      >
                        <option value="all">All Notices</option>
                        <option value="loaded">Loaded Details</option>
                        <option value="pending">Pending Details</option>
                        <option value="cancelled">Cancelled Sales</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className={`overflow-x-auto rounded-lg border ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <table
                    className={`min-w-full divide-y ${
                      isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
                    }`}
                  >
                    <thead
                      className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}
                    >
                      <tr>
                        <th
                          scope="col"
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          Town
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          Case Caption
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          Sale Date/Time
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          Docket Number
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isDarkMode
                          ? 'divide-gray-700 bg-gray-800'
                          : 'divide-gray-200 bg-white'
                      }`}
                    >
                      {(() => {
                        // Filter and search the foreclosure sales
                        let filteredSales = [...foreclosureSales]

                        // Apply status filter
                        if (filterStatus === 'loaded') {
                          filteredSales = filteredSales.filter(
                            (sale) => sale.status === 'loaded',
                          )
                        } else if (filterStatus === 'pending') {
                          filteredSales = filteredSales.filter(
                            (sale) => sale.status === 'pending',
                          )
                        } else if (filterStatus === 'cancelled') {
                          filteredSales = filteredSales.filter(
                            (sale) =>
                              sale.status === 'loaded' &&
                              sale.auctionNotice?.status
                                ?.toLowerCase()
                                .includes('cancel'),
                          )
                        }

                        // Apply search text filter
                        if (searchText.trim()) {
                          const search = searchText.toLowerCase()
                          filteredSales = filteredSales.filter(
                            (sale) =>
                              (
                                sale.auctionNotice?.caseCaption ||
                                sale.saleInfo ||
                                ''
                              )
                                .toLowerCase()
                                .includes(search) ||
                              (
                                sale.auctionNotice?.docketNumber ||
                                sale.docketNumber ||
                                ''
                              )
                                .toLowerCase()
                                .includes(search) ||
                              (sale.auctionNotice?.town || sale.city || '')
                                .toLowerCase()
                                .includes(search),
                          )
                        }

                        // Calculate pagination
                        const totalPages = Math.ceil(
                          filteredSales.length / itemsPerPage,
                        )
                        const startIndex = (currentPage - 1) * itemsPerPage
                        const paginatedSales = filteredSales.slice(
                          startIndex,
                          startIndex + itemsPerPage,
                        )

                        // If no results after filtering
                        if (filteredSales.length === 0) {
                          return (
                            <tr>
                              <td
                                colSpan={6}
                                className={`px-6 py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                              >
                                No matching foreclosure sales found.
                              </td>
                            </tr>
                          )
                        }

                        // Render the paginated list
                        return paginatedSales.map((sale, index) => (
                          <tr
                            key={`${sale.postingId}-${index}`}
                            className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} ${selectedSale === sale.postingId ? (isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50') : ''}`}
                            onClick={() => {
                              if (sale.status === 'loaded') {
                                setSelectedSale(sale.postingId)
                              } else if (sale.status === 'pending') {
                                fetchAuctionDetails(sale.postingId)
                              }
                            }}
                          >
                            {/* Status */}
                            <td
                              className={`whitespace-nowrap px-6 py-4 text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}
                            >
                              {sale.status === 'loading' ? (
                                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                  Loading...
                                </span>
                              ) : sale.status === 'loaded' ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  {sale.auctionNotice?.status || 'Loaded'}
                                </span>
                              ) : sale.status === 'error' ? (
                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                  Error
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                  Pending
                                </span>
                              )}
                            </td>

                            {/* Town */}
                            <td
                              className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {sale.auctionNotice?.town || sale.city || 'N/A'}
                            </td>

                            {/* Case Caption */}
                            <td
                              className={`px-6 py-4 text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}
                            >
                              {sale.status === 'loaded'
                                ? sale.auctionNotice?.caseCaption || 'N/A'
                                : sale.saleInfo
                                    ?.replace(
                                      'PUBLIC AUCTION FORECLOSURE SALE:',
                                      '',
                                    )
                                    .trim() || 'N/A'}
                            </td>

                            {/* Sale Date/Time */}
                            <td
                              className={`whitespace-nowrap px-6 py-4 text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}
                            >
                              {sale.auctionNotice?.saleDate
                                ? `${sale.auctionNotice.saleDate} ${sale.auctionNotice.saleTime ? `at ${sale.auctionNotice.saleTime}` : ''}`
                                : sale.saleDate}
                            </td>

                            {/* Docket Number */}
                            <td
                              className={`whitespace-nowrap px-6 py-4 text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}
                            >
                              {sale.auctionNotice?.docketNumber ||
                                sale.docketNumber ||
                                'N/A'}
                            </td>

                            {/* Actions */}
                            <td
                              className={`whitespace-nowrap px-6 py-4 text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-500'
                              }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex flex-col space-y-2">
                                {sale.status === 'pending' && (
                                  <button
                                    onClick={() =>
                                      fetchAuctionDetails(sale.postingId)
                                    }
                                    className={`text-sm font-medium ${
                                      isDarkMode
                                        ? 'text-blue-400 hover:text-blue-300'
                                        : 'text-blue-600 hover:text-blue-800'
                                    }`}
                                  >
                                    Load Details
                                  </button>
                                )}

                                {sale.viewFullNoticeUrl && (
                                  <a
                                    href={`https://sso.eservices.jud.ct.gov/foreclosures/Public/${sale.viewFullNoticeUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-sm font-medium ${
                                      isDarkMode
                                        ? 'text-blue-400 hover:text-blue-300'
                                        : 'text-blue-600 hover:text-blue-800'
                                    }`}
                                  >
                                    View on Website
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      })()}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {(() => {
                  // Filter sales for pagination calculation
                  let filteredSales = [...foreclosureSales]

                  // Apply status filter
                  if (filterStatus === 'loaded') {
                    filteredSales = filteredSales.filter(
                      (sale) => sale.status === 'loaded',
                    )
                  } else if (filterStatus === 'pending') {
                    filteredSales = filteredSales.filter(
                      (sale) => sale.status === 'pending',
                    )
                  } else if (filterStatus === 'cancelled') {
                    filteredSales = filteredSales.filter(
                      (sale) =>
                        sale.status === 'loaded' &&
                        sale.auctionNotice?.status
                          ?.toLowerCase()
                          .includes('cancel'),
                    )
                  }

                  // Apply search text filter
                  if (searchText.trim()) {
                    const search = searchText.toLowerCase()
                    filteredSales = filteredSales.filter(
                      (sale) =>
                        (sale.auctionNotice?.caseCaption || sale.saleInfo || '')
                          .toLowerCase()
                          .includes(search) ||
                        (
                          sale.auctionNotice?.docketNumber ||
                          sale.docketNumber ||
                          ''
                        )
                          .toLowerCase()
                          .includes(search) ||
                        (sale.auctionNotice?.town || sale.city || '')
                          .toLowerCase()
                          .includes(search),
                    )
                  }

                  const totalPages = Math.ceil(
                    filteredSales.length / itemsPerPage,
                  )

                  if (totalPages <= 1) return null

                  return (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div
                        className={
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }
                      >
                        Page {currentPage} of {totalPages} (
                        {filteredSales.length} results)
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                          className={`rounded px-3 py-1 text-sm ${
                            isDarkMode
                              ? currentPage === 1
                                ? 'cursor-not-allowed bg-gray-700 text-gray-500'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                              : currentPage === 1
                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          First
                        </button>

                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className={`rounded px-3 py-1 text-sm ${
                            isDarkMode
                              ? currentPage === 1
                                ? 'cursor-not-allowed bg-gray-700 text-gray-500'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                              : currentPage === 1
                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          Previous
                        </button>

                        {/* Page numbers */}
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            // Display pages around current page
                            let pageNum: number = 0
                            if (totalPages <= 5) {
                              pageNum = i + 1
                            } else if (currentPage <= 3) {
                              pageNum = i + 1
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i
                            } else {
                              pageNum = currentPage - 2 + i
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`rounded px-3 py-1 text-sm ${
                                  pageNum === currentPage
                                    ? isDarkMode
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-blue-500 text-white'
                                    : isDarkMode
                                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                              >
                                {pageNum}
                              </button>
                            )
                          },
                        )}

                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className={`rounded px-3 py-1 text-sm ${
                            isDarkMode
                              ? currentPage === totalPages
                                ? 'cursor-not-allowed bg-gray-700 text-gray-500'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                              : currentPage === totalPages
                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          Next
                        </button>

                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                          className={`rounded px-3 py-1 text-sm ${
                            isDarkMode
                              ? currentPage === totalPages
                                ? 'cursor-not-allowed bg-gray-700 text-gray-500'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                              : currentPage === totalPages
                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          Last
                        </button>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* Auction Notice Details */}
            {!loadingCities &&
              selectedSale &&
              foreclosureSales.find((sale) => sale.postingId === selectedSale)
                ?.status === 'loaded' && (
                <div className="mb-8">
                  <div className="mb-4">
                    <h2
                      className={`text-xl font-semibold ${isDarkMode ? 'text-blue-300' : ''}`}
                    >
                      Public Auction Notice Details
                    </h2>
                    <p
                      className={
                        isDarkMode
                          ? 'text-sm text-gray-400'
                          : 'text-sm text-gray-600'
                      }
                    >
                      Detailed information for selected foreclosure sale
                    </p>
                  </div>

                  {(() => {
                    // Find the selected sale and its notice
                    const selectedSaleData = foreclosureSales.find(
                      (sale) => sale.postingId === selectedSale,
                    )
                    const notice = selectedSaleData?.auctionNotice

                    if (!notice) return null

                    return (
                      <div
                        className={`overflow-hidden rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <div
                          className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                        >
                          <h3
                            className={`mb-4 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                          >
                            {notice.heading || 'Public Auction Notice'}
                          </h3>

                          {notice.status && (
                            <div
                              className={`mb-4 rounded-lg p-4 ${isDarkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}
                            >
                              <p className="font-medium">{notice.status}</p>
                            </div>
                          )}

                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Case Information */}
                            <div
                              className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                            >
                              <h4
                                className={`text-md mb-3 font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
                              >
                                Case Information
                              </h4>

                              <dl className="grid grid-cols-1 gap-3">
                                <div>
                                  <dt
                                    className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                  >
                                    Caption
                                  </dt>
                                  <dd
                                    className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                  >
                                    {notice.caseCaption || 'N/A'}
                                  </dd>
                                </div>

                                <div>
                                  <dt
                                    className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                  >
                                    Docket Number
                                  </dt>
                                  <dd
                                    className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                  >
                                    {notice.docketNumber || 'N/A'}
                                  </dd>
                                </div>

                                <div>
                                  <dt
                                    className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                  >
                                    File Date
                                  </dt>
                                  <dd
                                    className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                  >
                                    {notice.fileDate || 'N/A'}
                                  </dd>
                                </div>

                                <div>
                                  <dt
                                    className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                  >
                                    Return Date
                                  </dt>
                                  <dd
                                    className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                  >
                                    {notice.returnDate || 'N/A'}
                                  </dd>
                                </div>
                              </dl>
                            </div>

                            {/* Sale Information */}
                            <div
                              className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                            >
                              <h4
                                className={`text-md mb-3 font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
                              >
                                Sale Information
                              </h4>

                              <dl className="grid grid-cols-1 gap-3">
                                <div>
                                  <dt
                                    className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                  >
                                    Town
                                  </dt>
                                  <dd
                                    className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                  >
                                    {notice.town || 'N/A'}
                                  </dd>
                                </div>

                                <div>
                                  <dt
                                    className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                  >
                                    Sale Date and Time
                                  </dt>
                                  <dd
                                    className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                  >
                                    {notice.saleDate}{' '}
                                    {notice.saleTime
                                      ? `at ${notice.saleTime}`
                                      : ''}
                                  </dd>
                                </div>

                                <div>
                                  <dt
                                    className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                  >
                                    Inspection
                                  </dt>
                                  <dd
                                    className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                  >
                                    {notice.inspectionCommencingAt ||
                                      'None specified'}
                                  </dd>
                                </div>

                                <div>
                                  <dt
                                    className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                  >
                                    Notice Period
                                  </dt>
                                  <dd
                                    className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                  >
                                    {notice.noticeFrom && notice.noticeThru
                                      ? `${notice.noticeFrom} to ${notice.noticeThru}`
                                      : 'N/A'}
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>

                          {/* Notice Body */}
                          {notice.body && (
                            <div className="mt-6">
                              <h4
                                className={`text-md mb-3 font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
                              >
                                Notice Details
                              </h4>
                              <div
                                className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                              >
                                <p
                                  className={`whitespace-pre-line text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                  {notice.body}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Committee Information */}
                          {notice.committee && (
                            <div className="mt-6">
                              <h4
                                className={`text-md mb-3 font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
                              >
                                Committee Information
                              </h4>
                              <div
                                className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                              >
                                <p
                                  className={`whitespace-pre-line text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                  {notice.committee}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* External Link */}
                          <div className="mt-6 flex justify-end">
                            {selectedSaleData.viewFullNoticeUrl && (
                              <a
                                href={`https://sso.eservices.jud.ct.gov/foreclosures/Public/${selectedSaleData.viewFullNoticeUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium ${
                                  isDarkMode
                                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                              >
                                <span>View Official Notice</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

            {/* Raw HTML Display */}
            {showHTMLContent && (
              <>
                <div className="mb-4">
                  <h2
                    className={`text-xl font-semibold ${isDarkMode ? 'text-blue-300' : ''}`}
                  >
                    HTML Content
                  </h2>
                  <p
                    className={
                      isDarkMode
                        ? 'text-sm text-gray-400'
                        : 'text-sm text-gray-600'
                    }
                  >
                    Raw HTML from the source website:
                  </p>
                </div>
                <div
                  className={`mb-4 overflow-hidden rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div
                    className={
                      isDarkMode ? 'bg-gray-800 p-2' : 'bg-gray-100 p-2'
                    }
                  >
                    <p
                      className={`font-mono text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Content Length: {rawHtml.length} characters
                    </p>
                  </div>
                  <div className="max-h-[50vh] overflow-auto p-4">
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Lela
