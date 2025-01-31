import React from 'react'
import { isMobile } from './Main'

export type SocialMedia = {
  platform: string
  url: string
}

const SocialMediaSection: React.FC = () => {
  const socialMedia: SocialMedia[] = [
    {
      platform: 'SoundCloud',
      url: 'https://soundcloud.com/niemoaudio/ars-niemo-laser-commander',
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/ericniemo/',
    },
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@niemoaudio',
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/NiemoAudio',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/eric-niemo/',
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/niembro64',
    },
  ]

  return (
    <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-6xl font-bold">👀</h1>
        <h1 className="pixel-font text-5xl font-bold">FOLLOW NIEMO</h1>
      </div>
      <div
        className={`flex justify-center ${isMobile ? 'space-x-4' : 'space-x-10'}`}
      >
        {socialMedia.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl hover:text-white/50"
          >
            <i className={`fab fa-${social.platform.toLowerCase()}`}></i>
          </a>
        ))}
      </div>
    </section>
  )
}

export default SocialMediaSection
