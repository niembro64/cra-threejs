import React from 'react'
import { isThin } from './Main'
import ReactGA from 'react-ga4'
import { showEmojis, socialMedia } from '../data/resumeData'

const SocialMediaSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">👀</h1>}
        <h1 className="pixel-font text-6xl font-bold">FOLLOW</h1>
      </div>
      <div
        className={`flex justify-center ${isThin ? 'space-x-4' : 'space-x-10'}`}
      >
        {socialMedia.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl hover:text-white/50"
            onClick={() => {
              ReactGA.event({
                category: 'Social Media',
                action: 'Click',
                label: social.platform,
              })
            }}
          >
            <i className={`fab fa-${social.platform.toLowerCase()}`}></i>
          </a>
        ))}
      </div>
    </section>
  )
}

export default SocialMediaSection
