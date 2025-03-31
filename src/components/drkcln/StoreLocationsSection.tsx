import React, { useRef, useEffect, useState } from 'react'

// Store locations data
const locations = [
  {
    id: 1,
    city: 'Tokyo',
    address: '2-5-6 Jingumae, Shibuya City',
    coordinates: [35.6712, 139.7055],
    hours: '11:00 - 21:00',
    phone: '+81 3-1234-5678',
    image: '/crate.png', // Placeholder image
  },
  {
    id: 2,
    city: 'New York',
    address: '127 Elizabeth St, Manhattan',
    coordinates: [40.7197, -73.9962],
    hours: '10:00 - 20:00',
    phone: '+1 (212) 555-1234',
    image: '/crate.png', // Placeholder image
  },
  {
    id: 3,
    city: 'London',
    address: '58 Redchurch St, Shoreditch',
    coordinates: [51.524, -0.0727],
    hours: '10:00 - 19:00',
    phone: '+44 20 7123 4567',
    image: '/crate.png', // Placeholder image
  },
  {
    id: 4,
    city: 'Berlin',
    address: 'Münzstraße 10, Mitte',
    coordinates: [52.526, 13.406],
    hours: '11:00 - 20:00',
    phone: '+49 30 1234 5678',
    image: '/crate.png', // Placeholder image
  },
]

export const StoreLocationsSection: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Animation for section when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Simulate map marker position change when active location changes
  useEffect(() => {
    if (!mapRef.current) return

    const marker = mapRef.current.querySelector('.map-marker') as HTMLElement
    if (!marker) return

    // Update marker position based on active location
    const coords = locations[activeLocation].coordinates
    const x = ((coords[1] + 180) / 360) * 100
    const y = ((90 - coords[0]) / 180) * 100

    marker.style.left = `${x}%`
    marker.style.top = `${y}%`

    // Animate the marker
    marker.classList.add('animate-ping-once')
    setTimeout(() => {
      marker.classList.remove('animate-ping-once')
    }, 500)
  }, [activeLocation])

  return (
    <section className="bg-black px-6 py-24 text-green-400">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold md:text-6xl">
          <span className="text-white">&lt;</span>
          locations
          <span className="text-white">/&gt;</span>
        </h2>

        <div
          ref={sectionRef}
          className="translate-y-10 opacity-0 transition-all duration-1000"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Store locations list */}
            <div className="border border-green-500/30 bg-gray-900 p-6">
              <h3 className="mb-6 text-2xl font-bold">Our Physical Stores</h3>

              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div
                    key={location.id}
                    className={`cursor-pointer p-4 transition-colors duration-300 ${
                      activeLocation === index
                        ? 'border-l-4 border-green-400 bg-green-400/10'
                        : 'border-l-4 border-transparent hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveLocation(index)}
                  >
                    <h4 className="mb-1 text-xl font-bold text-white">
                      {location.city}
                    </h4>
                    <p className="text-sm text-green-300">{location.address}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-green-500/30 p-6">
                <p className="mb-4 text-sm text-green-300">
                  Can't visit us in person? Explore our stores in virtual
                  reality through our app.
                </p>
                <button className="bg-green-400 px-6 py-3 font-mono text-black transition-colors duration-300 hover:bg-green-300">
                  VIRTUAL TOUR
                </button>
              </div>
            </div>

            {/* Map and store details */}
            <div className="flex flex-col border border-green-500/30 bg-gray-900">
              {/* Digital map */}
              <div
                ref={mapRef}
                className="relative h-64 overflow-hidden bg-gray-800"
              >
                {/* Map background with matrix/grid effect */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMCBMIDEwMCAwIEwgMTAwIDEwMCBMIDAgMTAwIHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjEwIiB4Mj0iMTAwIiB5Mj0iMTAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjIwIiB4Mj0iMTAwIiB5Mj0iMjAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjMwIiB4Mj0iMTAwIiB5Mj0iMzAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjQwIiB4Mj0iMTAwIiB5Mj0iNDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjUwIiB4Mj0iMTAwIiB5Mj0iNTAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjYwIiB4Mj0iMTAwIiB5Mj0iNjAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjcwIiB4Mj0iMTAwIiB5Mj0iNzAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjgwIiB4Mj0iMTAwIiB5Mj0iODAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjkwIiB4Mj0iMTAwIiB5Mj0iOTAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMTAiIHkxPSIwIiB4Mj0iMTAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMjAiIHkxPSIwIiB4Mj0iMjAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMzAiIHkxPSIwIiB4Mj0iMzAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iNDAiIHkxPSIwIiB4Mj0iNDAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iNTAiIHkxPSIwIiB4Mj0iNTAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iNjAiIHkxPSIwIiB4Mj0iNjAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iNzAiIHkxPSIwIiB4Mj0iNzAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iODAiIHkxPSIwIiB4Mj0iODAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iOTAiIHkxPSIwIiB4Mj0iOTAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-50"></div>

                {/* Continents overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMjAwLDkwIEwyMTUsODUgTDIzMCw5MCBMMTI1LDE4MCBMMTE1LDE3MCBMMTIwLDE2MCBMMTM1LDE1NSBMMTM1LDE0NSBMMTQ1LDE0MCBMMTU1LDEzNSBMMTYwLDEyNSBMMTcwLDEyMCBMMTc1LDExMCBMMTg1LDEwNSBMMTk1LDk1IEwyMDAsOTBaIiBmaWxsPSIjMDBmZjAwIiBmaWxsLW9wYWNpdHk9IjAuMSIgLz4KICA8cGF0aCBkPSJNNTAwLDkwIEw1MTUsODUgTDUzMCw5MCBMNTUwLDEwMCBMNTYwLDExMCBMNTcwLDEyMCBMNTgwLDEzMCBMNTkwLDE0MCBMNTgwLDE1MCBMNTcwLDE2MCBMNTYwLDE3MCBMNTUwLDE4MCBMNTQwLDE5MCBMNTMwLDIwMCBMNTIwLDIxMCBMNTEwLDIyMCBMNTAwLDIzMCBMNDkwLDIyMCBMNDgwLDIxMCBMNDcwLDIwMCBMNDYwLDE5MCBMNDUwLDE4MCBMNDQwLDE3MCBMNDMwLDE2MCBMNDQwLDE1MCBMNDUwLDE0MCBMNDYwLDEzMCBMNDcwLDEyMCBMNDgwLDExMCBMNDkwLDEwMCBMNTAwLDkwWiIgZmlsbD0iIzAwZmYwMCIgZmlsbC1vcGFjaXR5PSIwLjEiIC8+CiAgPHBhdGggZD0iTTMwMCwxODAgTDMyMCwxNzUgTDM0MCwxODAgTDM2MCwxOTAgTDM4MCwyMDAgTDQwMCwyMTAgTDM5MCwyMjAgTDM4MCwyMzAgTDM3MCwyNDAgTDM2MCwyNTAgTDM0MCwyNDUgTDMyMCwyNDAgTDMwMCwyMzUgTDI4MCwyMzAgTDI2MCwyMjAgTDI0MCwyMTAgTDI2MCwyMDAgTDI4MCwxOTAgTDMwMCwxODBaIiBmaWxsPSIjMDBmZjAwIiBmaWxsLW9wYWNpdHk9IjAuMSIgLz4KPC9zdmc+')] bg-contain bg-center bg-no-repeat"></div>

                {/* Active location marker */}
                <div
                  className="map-marker absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-green-400"
                  style={{
                    left: `${((locations[activeLocation].coordinates[1] + 180) / 360) * 100}%`,
                    top: `${((90 - locations[activeLocation].coordinates[0]) / 180) * 100}%`,
                  }}
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></div>
                </div>

                {/* Other location markers */}
                {locations.map((location, index) => {
                  if (index === activeLocation) return null

                  return (
                    <div
                      key={location.id}
                      className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-gray-400 transition-colors duration-300 hover:bg-green-300"
                      style={{
                        left: `${((location.coordinates[1] + 180) / 360) * 100}%`,
                        top: `${((90 - location.coordinates[0]) / 180) * 100}%`,
                      }}
                      onClick={() => setActiveLocation(index)}
                    ></div>
                  )
                })}

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                  <div className="font-mono text-xs text-green-400">
                    <span className="mr-2">
                      LAT: {locations[activeLocation].coordinates[0].toFixed(4)}
                    </span>
                    <span>
                      LONG:{' '}
                      {locations[activeLocation].coordinates[1].toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active location details */}
              <div className="flex-1 p-6">
                <div className="mb-6 flex items-center">
                  <div className="mr-3 h-3 w-3 rounded-full bg-green-400"></div>
                  <h4 className="text-xl font-bold text-white">
                    {locations[activeLocation].city}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-24 font-mono text-gray-400">ADDRESS</div>
                    <div className="flex-1 text-green-300">
                      {locations[activeLocation].address}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-24 font-mono text-gray-400">HOURS</div>
                    <div className="flex-1 text-green-300">
                      {locations[activeLocation].hours}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-24 font-mono text-gray-400">PHONE</div>
                    <div className="flex-1 text-green-300">
                      {locations[activeLocation].phone}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center space-x-4">
                  <button className="bg-green-400 px-6 py-3 font-mono text-black transition-colors duration-300 hover:bg-green-300">
                    GET DIRECTIONS
                  </button>

                  <button className="border border-green-400 px-6 py-3 font-mono text-green-400 transition-colors duration-300 hover:bg-green-400/10">
                    CONTACT STORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
