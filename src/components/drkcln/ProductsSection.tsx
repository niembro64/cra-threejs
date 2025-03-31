import React, { useState, useRef, useEffect } from 'react'

// Products data
const products = [
  {
    id: 1,
    name: 'SHELL.OS Jacket',
    price: '$295',
    description:
      'Adaptive weather-resistant shell with programmable LED matrix.',
    tags: ['Outerwear', 'Tech-Integrated', 'Limited'],
    imgUrl: '/crate.png', // Placeholder image
  },
  {
    id: 2,
    name: 'SYNTAX Error Hoodie',
    price: '$180',
    description:
      'Oversized hoodie with glitch text patterns and hidden pocket system.',
    tags: ['Hoodie', 'Streetwear', 'Unisex'],
    imgUrl: '/crate.png', // Placeholder image
  },
  {
    id: 3,
    name: 'NULL.VOID Pants',
    price: '$210',
    description: 'Technical cargo pants with modular attachment system.',
    tags: ['Bottoms', 'Technical', 'Functional'],
    imgUrl: '/crate.png', // Placeholder image
  },
  {
    id: 4,
    name: 'CIPHER Mesh Top',
    price: '$140',
    description: 'Lightweight mesh layer with encrypted message pattern.',
    tags: ['Top', 'Layering', 'Translucent'],
    imgUrl: '/crate.png', // Placeholder image
  },
]

export const ProductsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)

  // Change active product periodically unless hovering
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovering])

  // Animation for products when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn')
          }
        })
      },
      { threshold: 0.1 },
    )

    if (productsRef.current) {
      observer.observe(productsRef.current)
    }

    return () => {
      if (productsRef.current) {
        observer.unobserve(productsRef.current)
      }
    }
  }, [])

  return (
    <section className="bg-black px-6 py-24 text-green-400">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold md:text-6xl">
          <span className="text-white">&lt;</span>
          products
          <span className="text-white">/&gt;</span>
        </h2>

        <div
          ref={productsRef}
          className="opacity-0 transition-opacity duration-1000"
        >
          {/* Product showcase */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
              {/* Product navigation */}
              <div className="mb-8 flex overflow-x-auto md:col-span-1 md:mb-0 md:flex-col md:overflow-visible">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`relative cursor-pointer border p-4 ${
                      activeIndex === index
                        ? 'border-green-400 text-green-400'
                        : 'border-gray-800 text-gray-500 hover:text-gray-300'
                    } mr-4 min-w-[180px] transition-all duration-300 md:mb-4 md:mr-0 md:min-w-0`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <h3 className="font-mono text-lg tracking-wide">
                      {product.name}
                    </h3>

                    <div className="mt-2 text-sm opacity-70">
                      ${product.price}
                    </div>

                    {/* Active indicator */}
                    {activeIndex === index && (
                      <div className="absolute -right-2 top-1/2 hidden h-8 w-2 -translate-y-1/2 transform bg-green-400 md:block"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Product display */}
              <div className="relative min-h-[500px] md:col-span-4">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`absolute inset-0 flex flex-col transition-all duration-500 md:flex-row ${
                      activeIndex === index
                        ? 'pointer-events-auto translate-x-0 opacity-100'
                        : 'pointer-events-none translate-x-8 opacity-0'
                    }`}
                  >
                    {/* Product image container */}
                    <div className="relative h-[300px] w-full overflow-hidden bg-gray-900 md:h-auto md:w-1/2">
                      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/50 to-transparent"></div>

                      {/* Image */}
                      <div
                        className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-500 hover:scale-110"
                        style={{ backgroundImage: `url(${product.imgUrl})` }}
                      ></div>

                      {/* Digital noise overlay */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDIwMHYyMDBIMHoiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>

                      {/* Price tag */}
                      <div className="absolute right-4 top-4 z-20 border border-green-500 bg-black/80 px-4 py-2 font-mono">
                        {product.price}
                      </div>
                    </div>

                    {/* Product details */}
                    <div className="flex w-full flex-col border-t border-green-500/30 bg-black p-8 md:w-1/2 md:border-l md:border-t-0">
                      <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        {product.name}
                      </h2>

                      <div className="mb-6 flex flex-wrap gap-2">
                        {product.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block border border-green-500/30 bg-gray-900 px-3 py-1 text-xs text-green-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="mb-8 text-green-300">
                        {product.description}
                      </p>

                      <div className="mt-auto flex items-center">
                        <button className="group relative overflow-hidden bg-green-500 px-6 py-3 font-mono text-black">
                          <span className="relative z-10">ADD TO CART</span>
                          <div className="absolute inset-0 h-full w-full translate-y-full transform bg-green-400 transition-transform duration-300 group-hover:translate-y-0"></div>
                        </button>

                        <button className="ml-4 border border-green-500 px-6 py-3 font-mono text-green-400 transition-colors duration-300 hover:bg-green-500/10">
                          DETAILS
                        </button>
                      </div>

                      {/* Binary code decoration */}
                      <div className="absolute bottom-4 right-4 font-mono text-xs text-green-500/20">
                        01010000
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product navigation dots for mobile */}
            <div className="mt-8 flex justify-center md:hidden">
              {products.map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 h-3 w-3 rounded-full transition-colors duration-300 ${
                    activeIndex === index ? 'bg-green-400' : 'bg-gray-700'
                  }`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
          </div>

          {/* View all products button */}
          <div className="mt-16 text-center">
            <button className="inline-block border border-green-500 bg-transparent px-8 py-4 font-mono tracking-wider text-green-400 transition-colors duration-300 hover:bg-green-500 hover:text-black">
              VIEW_ALL_PRODUCTS
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
