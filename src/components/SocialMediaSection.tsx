import React from 'react'

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
  ]

  return (
    <section className="px-4 py-12 text-center">
      <div className="mb-8">
        <h1 className="text-6xl font-bold">Follow Me</h1>
      </div>
      <div className="flex justify-center space-x-8">
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

        {/* <a
          href="https://soundcloud.com/niemoaudio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-orange-600 hover:text-orange-800"
        >
          <i className="fab fa-soundcloud"></i>
        </a>
        <a
          href="https://www.instagram.com/niemoaudio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-pink-600 hover:text-pink-800"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.youtube.com/@niemoaudio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-red-600 hover:text-red-800"
        >
          <i className="fab fa-youtube"></i>
        </a>
        <a
          href="https://www.facebook.com/niemoaudio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-blue-600 hover:text-blue-800"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/niemoaudio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-blue-700 hover:text-blue-900"
        >
          <i className="fab fa-linkedin"></i>
        </a> */}
      </div>
    </section>
  )
}

export default SocialMediaSection
