import React from 'react';
import { isThin } from './Main';
import ReactGA from 'react-ga4';
import { showEmojis, socialMedia } from '../data/myData';
import PixelArtText from './PixelArtText';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaSoundcloud, FaYoutube } from 'react-icons/fa';
import type { IconType } from 'react-icons';

const socialIcons: Record<string, IconType> = {
  SoundCloud: FaSoundcloud,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  Facebook: FaFacebook,
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
};

const SocialMediaSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isThin ? 'resume-section-surface' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">👀</h1>}
        {/* <h1 className="pixel-font text-6xl font-bold">FOLLOW</h1> */}

        <div className="mb-4 mt-4">
          <PixelArtText scrollContainerSelector=".pixel-text-follow" pixelColor="#fff" text=" FOLLOW " />
        </div>
      </div>
      <div className={`flex ${isThin ? 'justify-around' : 'justify-center space-x-10'}`}>
        {socialMedia.map((social) => {
          const SocialIcon = socialIcons[social.platform];
          if (!SocialIcon) return null;

          return (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl transition-colors hover:text-white/50"
              aria-label={`Follow Eric on ${social.platform}`}
              onClick={() => {
                ReactGA.event({
                  category: 'Social Media',
                  action: 'Click',
                  label: social.platform,
                });
              }}
            >
              <SocialIcon className="h-10 w-10" aria-hidden="true" focusable="false" />
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default SocialMediaSection;
