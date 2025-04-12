import React, { useState, useEffect } from 'react'
import axios from 'axios'

type CityDistanceObject = {
  city: string
  distanceMiles: number
}

const citiesByDistance: CityDistanceObject[] = [
  { city: 'Greenwich', distanceMiles: 0.0 },
  { city: 'Stamford', distanceMiles: 5.04 },
  { city: 'New Canaan', distanceMiles: 10.84 },
  { city: 'Norwalk', distanceMiles: 13.11 },
  { city: 'Wilton', distanceMiles: 15.33 },
  { city: 'Bridgeport', distanceMiles: 18.53 },
  { city: 'Fairfield', distanceMiles: 18.68 },
  { city: 'Trumbull', distanceMiles: 20.18 },
  { city: 'Redding', distanceMiles: 21.04 },
  { city: 'Monroe', distanceMiles: 21.22 },
  { city: 'Westport', distanceMiles: 21.29 },
  { city: 'Bethel', distanceMiles: 21.53 },
  { city: 'Danbury', distanceMiles: 21.92 },
  { city: 'Milford', distanceMiles: 23.87 },
  { city: 'Derby', distanceMiles: 25.39 },
  { city: 'Seymour', distanceMiles: 26.08 },
  { city: 'Bridgewater', distanceMiles: 26.68 },
  { city: 'Southbury', distanceMiles: 27.3 },
  { city: 'Middlebury', distanceMiles: 28.09 },
  { city: 'Waterbury', distanceMiles: 28.6 },
  { city: 'Newtown', distanceMiles: 29.1 },
  { city: 'Ansonia', distanceMiles: 29.5 },
  { city: 'Stratford', distanceMiles: 30.0 },
  { city: 'New Haven', distanceMiles: 30.6 },
  { city: 'Hamden', distanceMiles: 31.5 },
  { city: 'Naugatuck', distanceMiles: 31.7 },
  { city: 'Cheshire', distanceMiles: 32.1 },
  { city: 'Wallingford', distanceMiles: 34.1 },
  { city: 'Watertown', distanceMiles: 34.6 },
  { city: 'Southington', distanceMiles: 35.7 },
  { city: 'Meriden', distanceMiles: 35.9 },
  { city: 'Wolcott', distanceMiles: 36.0 },
  { city: 'New Britain', distanceMiles: 37.5 },
  { city: 'Plymouth', distanceMiles: 38.3 },
  { city: 'Middletown', distanceMiles: 38.7 },
  { city: 'Bristol', distanceMiles: 39.1 },
  { city: 'Plainville', distanceMiles: 39.4 },
  { city: 'Berlin', distanceMiles: 39.8 },
  { city: 'Durham', distanceMiles: 40.3 },
  { city: 'Farmington', distanceMiles: 40.5 },
  { city: 'Newington', distanceMiles: 41.3 },
  { city: 'Wethersfield', distanceMiles: 42.0 },
  { city: 'Rocky Hill', distanceMiles: 42.3 },
  { city: 'West Hartford', distanceMiles: 42.6 },
  { city: 'Hartford', distanceMiles: 43.0 },
  { city: 'Manchester', distanceMiles: 43.6 },
  { city: 'West Haven', distanceMiles: 43.7 },
  { city: 'East Hartford', distanceMiles: 43.8 },
  { city: 'Canton', distanceMiles: 44.0 },
  { city: 'Burlington', distanceMiles: 44.2 },
  { city: 'Glastonbury', distanceMiles: 44.3 },
  { city: 'New Hartford', distanceMiles: 44.8 },
  { city: 'Simsbury', distanceMiles: 45.3 },
  { city: 'Avon', distanceMiles: 45.6 },
  { city: 'Hebron', distanceMiles: 46.5 },
  { city: 'East Hampton', distanceMiles: 46.8 },
  { city: 'Bloomfield', distanceMiles: 47.1 },
  { city: 'Colchester', distanceMiles: 48.2 },
  { city: 'Montville', distanceMiles: 50.2 },
  { city: 'Lebanon', distanceMiles: 51.3 },
  { city: 'Windham', distanceMiles: 52.1 },
  { city: 'East Haddam', distanceMiles: 52.5 },
  { city: 'Bozrah', distanceMiles: 53.4 },
  { city: 'Mansfield', distanceMiles: 53.5 },
  { city: 'Norwich', distanceMiles: 54.0 },
  { city: 'Waterford', distanceMiles: 55.3 },
  { city: 'New London', distanceMiles: 56.6 },
  { city: 'Plainfield', distanceMiles: 59.1 },
  { city: 'Woodstock', distanceMiles: 60.3 },
  { city: 'Thompson', distanceMiles: 61.7 },
  { city: 'Sprague', distanceMiles: 62.1 },
  { city: 'Stafford', distanceMiles: 63.3 },
  { city: 'Suffield', distanceMiles: 63.9 },
  { city: 'Ellington', distanceMiles: 64.3 },
  { city: 'East Windsor', distanceMiles: 64.6 },
  { city: 'South Windsor', distanceMiles: 65.1 },
  { city: 'Windsor', distanceMiles: 66.0 },
  { city: 'Windsor Locks', distanceMiles: 67.3 },
  { city: 'Enfield', distanceMiles: 68.5 },
]

// Define types for the data we'll work with
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

  // Sale status (e.g., whether it is cancelled)
  status: string
}

type CityInfo = {
  name: string
  count: number
}

type PostingInfo = {
  postingId: string
  city: string
  status: 'pending' | 'loading' | 'loaded' | 'error'
  auctionNotice?: PublicAuctionNotice
  errorMessage?: string
}

// Parser functions
function parsePublicAuctionNotice(htmlString: string): PublicAuctionNotice {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Helper function to get the trimmed text content by element ID
  const getText = (id: string): string => {
    const element = doc.getElementById(id)
    return element ? (element.textContent?.trim() ?? '') : ''
  }

  // Build and return the PublicAuctionNotice object with fields extracted by their IDs
  return {
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
}

// Extract posting IDs from city pages
function extractPostingIds(htmlString: string, cityName: string): string[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Get the table that holds the foreclosure sales records
  const salesTable = doc.getElementById('ctl00_cphBody_GridView1')
  if (!salesTable) {
    return []
  }

  // Get all the rows in the table
  const rows = salesTable.querySelectorAll('tr')
  const postingIds: string[] = []

  // Iterate over each row. Skip the header row (which contains <th> elements).
  rows.forEach((row) => {
    if (row.querySelector('th')) {
      return // Skip header row
    }

    const cells = row.querySelectorAll('td')
    if (cells.length < 5) {
      return
    }

    // Extract the "View Full Notice" URL from the fifth cell
    const viewNoticeLink = cells[4].querySelector('a')
    const viewFullNoticeUrl = viewNoticeLink?.getAttribute('href') || ''

    // Extract the posting_id from the URL query parameter
    let postingId = ''
    if (viewFullNoticeUrl) {
      const queryPart = viewFullNoticeUrl.split('?')[1]
      if (queryPart) {
        postingId = new URLSearchParams(queryPart).get('PostingId') || ''
      }
    }

    if (postingId) {
      postingIds.push(postingId)
    }
  })

  return postingIds
}

// Extract city names and counts from the main page
function extractCityInfo(htmlString: string): CityInfo[] {
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

    // The expected structure is:
    // <a>City Name</a> <span> (</span> <span>Number</span> <span>)</span> <br>...
    const firstSpan = link.nextElementSibling
    let count = 0
    if (firstSpan) {
      const countSpan = firstSpan.nextElementSibling
      if (countSpan) {
        count = parseInt(countSpan.textContent || '0', 10)
      }
    }

    cities.push({ name, count })
  })

  return cities
}

const Lela = () => {
  // State variables
  const [cityList, setCityList] = useState<CityInfo[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [postings, setPostings] = useState<PostingInfo[]>([])
  const [fetchingCities, setFetchingCities] = useState(true)
  const [fetchingPostings, setFetchingPostings] = useState(false)
  const [fetchingDetails, setFetchingDetails] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timestamp, setTimestamp] = useState<string>('')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
    citiesProcessed: 0,
    totalCities: 0,
  })

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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Fetch initial city list data
  const fetchCityList = async () => {
    try {
      setFetchingCities(true)
      setError(null)
      setTimestamp(new Date().toLocaleString())

      // Fetch the main page that lists all cities
      const response = await axios.get(
        'https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostbyTownList.aspx',
      )

      // Extract city information
      const cities = extractCityInfo(response.data)
      setCityList(cities)
      console.log(`Fetched ${cities.length} cities`)
    } catch (err) {
      setError('Failed to fetch city list. Please try again later.')
      console.error('Error fetching city list:', err)
    } finally {
      setFetchingCities(false)
    }
  }

  // Process selected cities to fetch posting IDs and then details
  const processSelectedCities = async () => {
    if (selectedCities.length === 0) {
      setError('Please select at least one city first.')
      return
    }

    try {
      setError(null)
      setFetchingPostings(true)
      setPostings([]) // Clear previous postings

      // Step 1: Get the cities to fetch
      const citiesToFetch = cityList.filter((city) =>
        selectedCities.includes(city.name),
      )

      setProgress({
        completed: 0,
        total: 0,
        citiesProcessed: 0,
        totalCities: citiesToFetch.length,
      })

      console.log(`Processing ${citiesToFetch.length} cities...`)

      // Step 2: Fetch posting IDs for all selected cities
      const allPostingIds: { city: string; postingIds: string[] }[] = []

      for (const city of citiesToFetch) {
        try {
          setProgress((prev) => ({
            ...prev,
            citiesProcessed: prev.citiesProcessed + 1,
          }))

          // Construct the URL for the city's foreclosure data
          const url = `https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostbyTownDetails.aspx?town=${encodeURIComponent(city.name)}`

          // Fetch the city page
          const response = await axios.get(url)

          // Extract posting IDs
          const postingIds = extractPostingIds(response.data, city.name)
          allPostingIds.push({ city: city.name, postingIds })

          console.log(`Found ${postingIds.length} postings for ${city.name}`)
        } catch (err) {
          console.error(`Error fetching data for ${city.name}:`, err)
        }
      }

      // Step 3: Flatten all posting IDs and prepare for fetching details
      const allPostings: PostingInfo[] = []
      let totalPostings = 0

      allPostingIds.forEach(({ city, postingIds }) => {
        postingIds.forEach((postingId) => {
          allPostings.push({
            postingId,
            city,
            status: 'pending',
          })
          totalPostings++
        })
      })

      // Update state with all posting IDs
      setPostings(allPostings)
      setFetchingPostings(false)

      // Step 4: Start fetching details for all postings
      if (allPostings.length > 0) {
        setFetchingDetails(true)
        setProgress({
          completed: 0,
          total: allPostings.length,
          citiesProcessed: citiesToFetch.length,
          totalCities: citiesToFetch.length,
        })

        // Process postings in batches to avoid overwhelming the server
        const batchSize = 5
        const totalBatches = Math.ceil(allPostings.length / batchSize)

        for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
          const batchStart = batchIndex * batchSize
          const batchEnd = Math.min(batchStart + batchSize, allPostings.length)
          const batch = allPostings.slice(batchStart, batchEnd)

          console.log(
            `Processing batch ${batchIndex + 1}/${totalBatches}, items ${batchStart + 1}-${batchEnd}`,
          )

          // Mark items in this batch as loading
          setPostings((prevPostings) => {
            const updatedPostings = [...prevPostings]
            for (let i = batchStart; i < batchEnd; i++) {
              if (i < updatedPostings.length) {
                updatedPostings[i] = {
                  ...updatedPostings[i],
                  status: 'loading',
                }
              }
            }
            return updatedPostings
          })

          // Fetch details for each posting in the batch concurrently
          await Promise.all(
            batch.map(async (posting, index) => {
              try {
                // Fetch auction notice details
                const url = `https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostDetailPublic.aspx?PostingId=${posting.postingId}`
                const response = await axios.get(url)

                // Parse auction notice
                const auctionNotice = parsePublicAuctionNotice(response.data)

                // Update posting with the auction notice
                setPostings((prevPostings) => {
                  const updatedPostings = [...prevPostings]
                  const postingIndex = batchStart + index

                  if (postingIndex < updatedPostings.length) {
                    updatedPostings[postingIndex] = {
                      ...updatedPostings[postingIndex],
                      auctionNotice,
                      status: 'loaded',
                    }
                  }

                  return updatedPostings
                })

                // Update progress
                setProgress((prev) => ({
                  ...prev,
                  completed: prev.completed + 1,
                }))
              } catch (err) {
                // Update posting with error
                setPostings((prevPostings) => {
                  const updatedPostings = [...prevPostings]
                  const postingIndex = batchStart + index

                  if (postingIndex < updatedPostings.length) {
                    updatedPostings[postingIndex] = {
                      ...updatedPostings[postingIndex],
                      status: 'error',
                      errorMessage: 'Failed to load auction details',
                    }
                  }

                  return updatedPostings
                })

                // Still count as completed for progress tracking
                setProgress((prev) => ({
                  ...prev,
                  completed: prev.completed + 1,
                }))

                console.error(
                  `Error fetching details for posting ID ${posting.postingId}:`,
                  err,
                )
              }
            }),
          )

          // Small delay between batches to be nice to the server
          if (batchIndex < totalBatches - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }

        setFetchingDetails(false)
      }
    } catch (err) {
      setError('An error occurred while processing the selected cities.')
      console.error('Error processing cities:', err)
      setFetchingPostings(false)
      setFetchingDetails(false)
    }
  }

  // Toggle selection of a city
  const handleCitySelection = (cityName: string) => {
    setSelectedCities((prev) => {
      if (prev.includes(cityName)) {
        return prev.filter((name) => name !== cityName)
      }
      return [...prev, cityName]
    })
  }

  // Select all cities
  const selectAllCities = () => {
    setSelectedCities(cityList.map((city) => city.name))
  }

  // Clear city selection
  const clearCitySelection = () => {
    setSelectedCities([])
  }

  // Load initial city list on component mount
  useEffect(() => {
    fetchCityList()
  }, [])

  // Calculate statistics
  const getStats = () => {
    const loaded = postings.filter((p) => p.status === 'loaded').length
    const pending = postings.filter((p) => p.status === 'pending').length
    const loading = postings.filter((p) => p.status === 'loading').length
    const error = postings.filter((p) => p.status === 'error').length
    const cancelled = postings.filter(
      (p) =>
        p.status === 'loaded' &&
        p.auctionNotice?.status?.toLowerCase().includes('cancel'),
    ).length

    return {
      loaded,
      pending,
      loading,
      error,
      cancelled,
      total: postings.length,
    }
  }

  // Display status message
  const getStatusMessage = () => {
    if (fetchingCities) {
      return 'Fetching city list...'
    }

    if (fetchingPostings) {
      return `Fetching posting IDs for cities... (${progress.citiesProcessed}/${progress.totalCities})`
    }

    if (fetchingDetails) {
      return `Fetching auction details... (${progress.completed}/${progress.total})`
    }

    if (postings.length > 0) {
      const stats = getStats()
      return `Loaded ${stats.loaded} of ${stats.total} auction details (${stats.cancelled} cancelled)`
    }

    return "Select cities and click 'Process Selected Cities' to fetch foreclosure data."
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
                onClick={fetchCityList}
                className={`rounded px-4 py-2 text-white transition ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={fetchingCities}
              >
                Refresh City List
              </button>
            </div>
          </div>
        </div>

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

        {/* Status Bar */}
        <div
          className={`mb-6 rounded-lg p-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              {getStatusMessage()}
            </p>

            {(fetchingPostings || fetchingDetails) && (
              <div className="mt-2 w-full">
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full bg-blue-500 transition-all duration-200"
                    style={{
                      width: `${
                        fetchingPostings
                          ? (progress.citiesProcessed / progress.totalCities) *
                            100
                          : (progress.completed / progress.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Dashboard (when data is loaded) */}
        {!fetchingCities &&
          !fetchingPostings &&
          !fetchingDetails &&
          postings.length > 0 && (
            <div
              className={`mb-6 rounded-lg p-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}
            >
              <h2
                className={`mb-3 text-lg font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
              >
                Foreclosure Data Summary
              </h2>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {(() => {
                  const stats = getStats()
                  return (
                    <>
                      <div
                        className={`rounded p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                      >
                        <p className="text-xs text-gray-500">Total</p>
                        <p
                          className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                        >
                          {stats.total}
                        </p>
                      </div>
                      <div
                        className={`rounded p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                      >
                        <p className="text-xs text-gray-500">Loaded</p>
                        <p
                          className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}
                        >
                          {stats.loaded}
                        </p>
                      </div>
                      <div
                        className={`rounded p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                      >
                        <p className="text-xs text-gray-500">Pending</p>
                        <p
                          className={`text-xl font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                          {stats.pending}
                        </p>
                      </div>
                      <div
                        className={`rounded p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                      >
                        <p className="text-xs text-gray-500">Errors</p>
                        <p
                          className={`text-xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
                        >
                          {stats.error}
                        </p>
                      </div>
                      <div
                        className={`rounded p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                      >
                        <p className="text-xs text-gray-500">Cancelled Sales</p>
                        <p
                          className={`text-xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}
                        >
                          {stats.cancelled}
                        </p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          )}

        {/* City Selection Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2
              className={`text-xl font-semibold ${isDarkMode ? 'text-blue-300' : ''}`}
            >
              Connecticut Cities with Foreclosure Data
            </h2>
            <p
              className={
                isDarkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-600'
              }
            >
              {cityList.length} cities found - select cities and click "Process"
              to fetch foreclosure data
            </p>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={processSelectedCities}
              className={`rounded px-4 py-2 text-white transition ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-500'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              disabled={
                fetchingCities ||
                fetchingPostings ||
                fetchingDetails ||
                selectedCities.length === 0
              }
            >
              Process Selected Cities ({selectedCities.length})
            </button>
            <button
              onClick={selectAllCities}
              className={`rounded px-4 py-2 transition ${
                isDarkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              disabled={
                fetchingCities ||
                fetchingPostings ||
                fetchingDetails ||
                cityList.length === 0
              }
            >
              Select All Cities
            </button>
            <button
              onClick={clearCitySelection}
              className={`rounded px-4 py-2 transition ${
                isDarkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              disabled={
                fetchingCities ||
                fetchingPostings ||
                fetchingDetails ||
                selectedCities.length === 0
              }
            >
              Clear Selection
            </button>
          </div>

          <div
            className={`overflow-hidden rounded-lg border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className={isDarkMode ? 'bg-gray-800 p-3' : 'bg-gray-100 p-3'}>
              <h3
                className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              >
                Select Cities
              </h3>
            </div>

            <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {fetchingCities ? (
                <div className="flex justify-center py-8">
                  <div
                    className={`h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 ${
                      isDarkMode ? 'border-blue-400' : 'border-blue-500'
                    }`}
                  ></div>
                </div>
              ) : cityList.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {cityList.map((city, index) => (
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
                  No cities found. The website structure may have changed or no
                  data is available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Loading Indicator - Full Screen for major operations */}
        {(fetchingPostings || fetchingDetails) && (
          <div className="my-8 flex flex-col items-center justify-center">
            <div
              className={`mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 ${
                isDarkMode ? 'border-blue-400' : 'border-blue-500'
              }`}
            ></div>
            <p
              className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {fetchingPostings
                ? 'Fetching posting IDs...'
                : 'Fetching auction details...'}
            </p>
          </div>
        )}

        {/* Results Table */}
        {!fetchingCities &&
          !fetchingPostings &&
          !fetchingDetails &&
          postings.length > 0 && (
            <div className="mb-8">
              <div className="mb-4">
                <h2
                  className={`text-xl font-semibold ${isDarkMode ? 'text-blue-300' : ''}`}
                >
                  Foreclosure Auction Notices
                </h2>
                <p
                  className={
                    isDarkMode
                      ? 'text-sm text-gray-400'
                      : 'text-sm text-gray-600'
                  }
                >
                  {postings.filter((p) => p.status === 'loaded').length} of{' '}
                  {postings.length} details loaded
                </p>
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
                  <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
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
                        City
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
                        Sale Date
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
                    {postings.length > 0 ? (
                      postings.map((posting, index) => (
                        <tr
                          key={`${posting.postingId}-${index}`}
                          className={
                            isDarkMode
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-50'
                          }
                        >
                          {/* Status */}
                          <td
                            className={`whitespace-nowrap px-6 py-4 text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {posting.status === 'loading' ? (
                              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                Loading...
                              </span>
                            ) : posting.status === 'loaded' ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {posting.auctionNotice?.status || 'Loaded'}
                              </span>
                            ) : posting.status === 'error' ? (
                              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                Error
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                Pending
                              </span>
                            )}
                          </td>

                          {/* City */}
                          <td
                            className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {posting.auctionNotice?.town ||
                              posting.city ||
                              'N/A'}
                          </td>

                          {/* Case Caption */}
                          <td
                            className={`px-6 py-4 text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {posting.auctionNotice?.caseCaption || 'N/A'}
                          </td>

                          {/* Sale Date */}
                          <td
                            className={`whitespace-nowrap px-6 py-4 text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {posting.auctionNotice?.saleDate
                              ? `${posting.auctionNotice.saleDate} ${posting.auctionNotice.saleTime ? `at ${posting.auctionNotice.saleTime}` : ''}`
                              : 'N/A'}
                          </td>

                          {/* Docket Number */}
                          <td
                            className={`whitespace-nowrap px-6 py-4 text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {posting.auctionNotice?.docketNumber || 'N/A'}
                          </td>

                          {/* Actions */}
                          <td
                            className={`whitespace-nowrap px-6 py-4 text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            <a
                              href={`https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostDetailPublic.aspx?PostingId=${posting.postingId}`}
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
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className={`px-6 py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                          No data available yet. Select cities and click
                          "Process Selected Cities".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Lela
