import { create } from 'zustand'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

interface CityInfo {
  name: string
  count: number
}

interface PostingInfo {
  postingId: string
  city: string
  status: 'pending' | 'loading' | 'loaded' | 'error' | 'missing'
  auctionNotice?: PublicAuctionNotice
  errorMessage?: string
}

interface PublicAuctionNotice {
  caseCaption: string
  fileDate: string
  docketNumber: string
  returnDate: string
  town: string
  saleDate: string
  saleTime: string
  inspectionCommencingAt: string
  noticeFrom: string
  noticeThru: string
  heading: string
  body: string
  committee: string
  status: string
  address: string
  dollarAmountString: string
  dollarAmountNumber: number
  committeeName: string
  committeePhone: string
  committeeEmail: string
}

interface ForeclosureStoreProps {
  cityList: CityInfo[]
  selectedCities: string[]
  postings: PostingInfo[]
  fetchingCities: boolean
  fetchingPostings: boolean
  fetchingDetails: boolean
  error: string | null
  timestamp: string
  progress: {
    completed: number
    total: number
    citiesProcessed: number
    totalCities: number
  }
  
  // Actions
  fetchCityList: () => Promise<void>
  setSelectedCities: (cities: string[]) => void
  toggleCitySelection: (cityName: string) => void
  processSelectedCities: () => Promise<void>
  setError: (error: string | null) => void
  clearPostings: () => void
}

export const useForeclosureStore = create<ForeclosureStoreProps>((set, get) => ({
  cityList: [],
  selectedCities: [],
  postings: [],
  fetchingCities: false,
  fetchingPostings: false,
  fetchingDetails: false,
  error: null,
  timestamp: '',
  progress: {
    completed: 0,
    total: 0,
    citiesProcessed: 0,
    totalCities: 0,
  },

  fetchCityList: async () => {
    try {
      set({ fetchingCities: true, error: null })
      const response = await axios.get(`${API_URL}/foreclosure/cities/`)
      
      if (response.data.success) {
        set({
          cityList: response.data.cities,
          timestamp: new Date().toLocaleString(),
          fetchingCities: false
        })
      } else {
        throw new Error(response.data.error || 'Failed to fetch city list')
      }
    } catch (err: any) {
      set({
        error: err.message || 'Failed to fetch city list',
        fetchingCities: false
      })
    }
  },

  setSelectedCities: (cities: string[]) => {
    set({ selectedCities: cities })
  },

  toggleCitySelection: (cityName: string) => {
    const { selectedCities } = get()
    if (selectedCities.includes(cityName)) {
      set({ selectedCities: selectedCities.filter(name => name !== cityName) })
    } else {
      set({ selectedCities: [...selectedCities, cityName] })
    }
  },

  processSelectedCities: async () => {
    const { selectedCities, cityList } = get()
    
    if (selectedCities.length === 0) {
      set({ error: 'Please select at least one city first.' })
      return
    }

    try {
      set({
        error: null,
        fetchingPostings: true,
        postings: [],
        progress: {
          completed: 0,
          total: 0,
          citiesProcessed: 0,
          totalCities: selectedCities.length
        }
      })

      // Step 1: Fetch posting IDs for all selected cities
      const allPostingIds: { city: string; postingIds: string[] }[] = []
      
      for (const cityName of selectedCities) {
        try {
          set(state => ({
            progress: {
              ...state.progress,
              citiesProcessed: state.progress.citiesProcessed + 1
            }
          }))

          const response = await axios.get(`${API_URL}/foreclosure/posting-ids/`, {
            params: { city: cityName }
          })

          if (response.data.success) {
            allPostingIds.push({
              city: cityName,
              postingIds: response.data.postingIds
            })
          }
        } catch (err) {
          console.error(`Error fetching data for ${cityName}:`, err)
        }
      }

      // Step 2: Flatten all posting IDs and prepare for fetching details
      const allPostings: PostingInfo[] = []
      
      allPostingIds.forEach(({ city, postingIds }) => {
        postingIds.forEach((postingId) => {
          allPostings.push({
            postingId,
            city,
            status: 'pending'
          })
        })
      })

      set({
        postings: allPostings,
        fetchingPostings: false,
        progress: {
          completed: 0,
          total: allPostings.length,
          citiesProcessed: selectedCities.length,
          totalCities: selectedCities.length
        }
      })

      // Step 3: Fetch details for all postings in batches
      if (allPostings.length > 0) {
        set({ fetchingDetails: true })

        const batchSize = 5
        const totalBatches = Math.ceil(allPostings.length / batchSize)

        for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
          const batchStart = batchIndex * batchSize
          const batchEnd = Math.min(batchStart + batchSize, allPostings.length)
          const batch = allPostings.slice(batchStart, batchEnd)

          // Mark items in this batch as loading
          set(state => {
            const updatedPostings = [...state.postings]
            for (let i = batchStart; i < batchEnd; i++) {
              if (i < updatedPostings.length) {
                updatedPostings[i] = {
                  ...updatedPostings[i],
                  status: 'loading'
                }
              }
            }
            return { postings: updatedPostings }
          })

          // Fetch details for each posting in the batch
          await Promise.all(
            batch.map(async (posting, index) => {
              try {
                const response = await axios.get(`${API_URL}/foreclosure/auction-details/`, {
                  params: { postingId: posting.postingId }
                })

                if (response.data.success) {
                  if (!response.data.dataFound) {
                    set(state => {
                      const updatedPostings = [...state.postings]
                      const postingIndex = batchStart + index
                      if (postingIndex < updatedPostings.length) {
                        updatedPostings[postingIndex] = {
                          ...updatedPostings[postingIndex],
                          status: 'missing'
                        }
                      }
                      return {
                        postings: updatedPostings,
                        progress: {
                          ...state.progress,
                          completed: state.progress.completed + 1
                        }
                      }
                    })
                  } else {
                    set(state => {
                      const updatedPostings = [...state.postings]
                      const postingIndex = batchStart + index
                      if (postingIndex < updatedPostings.length) {
                        updatedPostings[postingIndex] = {
                          ...updatedPostings[postingIndex],
                          auctionNotice: response.data.auctionNotice,
                          status: 'loaded'
                        }
                      }
                      return {
                        postings: updatedPostings,
                        progress: {
                          ...state.progress,
                          completed: state.progress.completed + 1
                        }
                      }
                    })
                  }
                }
              } catch (err) {
                set(state => {
                  const updatedPostings = [...state.postings]
                  const postingIndex = batchStart + index
                  if (postingIndex < updatedPostings.length) {
                    updatedPostings[postingIndex] = {
                      ...updatedPostings[postingIndex],
                      status: 'error',
                      errorMessage: 'Failed to load auction details'
                    }
                  }
                  return {
                    postings: updatedPostings,
                    progress: {
                      ...state.progress,
                      completed: state.progress.completed + 1
                    }
                  }
                })
              }
            })
          )

          // Small delay between batches
          if (batchIndex < totalBatches - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }

        set({ fetchingDetails: false })
      }
    } catch (err: any) {
      set({
        error: err.message || 'An error occurred while processing the selected cities.',
        fetchingPostings: false,
        fetchingDetails: false
      })
    }
  },

  setError: (error: string | null) => {
    set({ error })
  },

  clearPostings: () => {
    set({ postings: [] })
  }
}))