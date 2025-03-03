import React from 'react'
import { isThin } from './Main'
import { showEmojis, workEnvironments } from '../data/myData'

interface DeskItem {
  image: string
  title: string
  description: string[]
}

// const deskItems: DeskItem[] = [
//   {
//     image: '/bedroom.JPG',
//     title: 'Modern Workspace',
//     description: [
//       'Ergonomic chair for all-day comfort',
//       'Adjustable standing desk',
//       'Dual monitor setup for productivity',
//       'Cable management system',
//     ],
//   },
//   {
//     image: '/',
//     title: 'Creative Corner',
//     description: [
//       'Natural lighting from large windows',
//       'Plants to improve air quality',
//       'Minimalist design to reduce distractions',
//       'Wireless peripherals',
//     ],
//   },
//   {
//     image: '/desk_images/tech_hub.jpg',
//     title: 'Tech Hub',
//     description: [
//       'Mechanical keyboard for optimal typing',
//       'Wireless charging pad',
//       'Smart lighting with adjustable brightness',
//       'High-performance PC setup',
//     ],
//   },
//   {
//     image: '/desk_images/collaborative_space.jpg',
//     title: 'Collaborative Space',
//     description: [
//       'Whiteboard wall for brainstorming',
//       'Comfortable seating for team meetings',
//       'Audio/video equipment for remote collaboration',
//       'Multiple device docking stations',
//     ],
//   },
// ]

const WorkEnvironment: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">🖥️</h1>}
        <h1 className="pixel-font text-6xl font-bold">WORK ENVIRONMENT</h1>
        <p className="pixel-font pt-4 text-2xl text-blue-300">
          Comfortable developing with MacOS, Linux, Windows
        </p>
        <p className="pixel-font text-2xl text-teal-300">
          Experienced in both remove & office settings
        </p>
      </div>

      <div
        className={`grid ${isThin ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-10'}`}
      >
        {workEnvironments.map((desk, index) => (
          <div
            key={index}
            className="bg-black/30 shadow-lg transition-all hover:bg-black/40 hover:shadow-xl"
          >
            <div className="h-100 overflow-hidden rounded-2xl rounded-t-2xl border border-white">
              <img
                src={process.env.PUBLIC_URL + desk.image}
                alt={desk.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  ;(e.target as HTMLImageElement).src =
                    process.env.PUBLIC_URL + '/qwhite_hardpixels_transbg.png'
                }}
              />
            </div>

            <div className="p-6">
              <h3 className="pixel-font mb-4 text-3xl text-blue-300">
                {desk.title}
              </h3>

              <ul className="ml-6 list-disc text-xl">
                {desk.description.map((point, i) => (
                  <li key={i} className="mb-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WorkEnvironment
