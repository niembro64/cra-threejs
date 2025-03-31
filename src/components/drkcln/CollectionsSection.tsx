import React from 'react'
import { useRef, useEffect, useState } from 'react'

// Collections data
const collections = [
  {
    id: 1,
    name: 'SYSTEM_OVERRIDE',
    description:
      'A capsule collection that challenges conventional fashion norms with its futuristic silhouettes and technical fabrics.',
    image: '/crate.png', // Placeholder image
    year: '2023',
  },
  {
    id: 2,
    name: 'DIGITAL_RUINS',
    description:
      'Inspired by the aesthetics of abandoned digital spaces, this collection explores the concept of virtual decay.',
    image: '/crate.png', // Placeholder image
    year: '2023',
  },
  {
    id: 3,
    name: 'NEURAL_NETWORK',
    description:
      'A collection that visualizes the complexity of AI systems through intricate patterns and adaptive designs.',
    image: '/crate.png', // Placeholder image
    year: '2024',
  },
]

export const CollectionsSection: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState(0)
  const collectionsRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])

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

    if (collectionsRef.current) {
      observer.observe(collectionsRef.current)
    }

    return () => {
      if (collectionsRef.current) {
        observer.unobserve(collectionsRef.current)
      }
    }
  }, [])

  return (
    <section className="bg-gray-900 px-6 py-24 text-green-400">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold md:text-6xl">
          <span className="text-white">&lt;</span>
          collections
          <span className="text-white">/&gt;</span>
        </h2>

        <div
          ref={collectionsRef}
          className="translate-y-10 opacity-0 transition-all duration-1000"
        >
          {/* Collections tabs */}
          <div className="mb-12 flex flex-wrap justify-center border-b border-green-500/30">
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                className={`relative px-8 py-4 font-mono text-lg transition-all duration-300 ${
                  activeCollection === index
                    ? 'text-green-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                onClick={() => setActiveCollection(index)}
              >
                {collection.name}

                {/* Active indicator */}
                {activeCollection === index && (
                  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-green-400"></div>
                )}
              </button>
            ))}
          </div>

          {/* Collections content */}
          <div className="relative">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className={`transition-opacity duration-500 ${
                  activeCollection === index
                    ? 'relative z-10 opacity-100'
                    : 'absolute inset-0 z-0 opacity-0'
                }`}
              >
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  {/* Collection image */}
                  <div
                    ref={(el) => (imagesRef.current[index] = el)}
                    className="group relative h-[350px] overflow-hidden bg-black md:h-[500px]"
                  >
                    {/* Main image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${collection.image})` }}
                    ></div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

                    {/* Glitch effect layers */}
                    <div
                      className="absolute inset-0 translate-x-2 translate-y-1 transform bg-cover bg-center opacity-0 mix-blend-screen hue-rotate-90 filter transition-opacity duration-300 group-hover:opacity-30"
                      style={{ backgroundImage: `url(${collection.image})` }}
                    ></div>

                    <div
                      className="absolute inset-0 -translate-x-2 -translate-y-1 transform bg-cover bg-center opacity-0 mix-blend-screen hue-rotate-180 filter transition-opacity duration-300 group-hover:opacity-30"
                      style={{ backgroundImage: `url(${collection.image})` }}
                    ></div>

                    {/* Collection name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-2 text-3xl font-bold text-white md:text-5xl">
                        {collection.name}
                      </div>
                      <div className="font-mono text-green-400">
                        {collection.year}
                      </div>
                    </div>

                    {/* Hover call to action */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button className="bg-green-400 px-6 py-3 font-mono text-black transition-colors duration-300 hover:bg-green-300">
                        EXPLORE COLLECTION
                      </button>
                    </div>
                  </div>

                  {/* Collection details */}
                  <div className="border border-green-500/30 bg-black p-6 md:p-10">
                    <h3 className="mb-6 text-3xl font-bold text-white">
                      {collection.name}
                    </h3>

                    <p className="mb-8 text-lg text-green-300">
                      {collection.description}
                    </p>

                    {/* Collection stats */}
                    <div className="mb-8 grid grid-cols-2 gap-6">
                      <div className="border-l-2 border-green-400 pl-4">
                        <div className="text-sm text-gray-400">Items</div>
                        <div className="text-2xl text-white">12</div>
                      </div>

                      <div className="border-l-2 border-green-400 pl-4">
                        <div className="text-sm text-gray-400">Released</div>
                        <div className="text-2xl text-white">
                          {collection.year}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="bg-green-400 px-6 py-3 font-mono text-black transition-colors duration-300 hover:bg-green-300">
                        VIEW COLLECTION
                      </button>

                      <button className="flex h-12 w-12 items-center justify-center rounded-full border border-green-400 transition-colors duration-300 hover:bg-green-400/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Binary code decoration */}
                    <div className="absolute bottom-4 right-4 font-mono text-xs text-green-500/20">
                      010011000
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
