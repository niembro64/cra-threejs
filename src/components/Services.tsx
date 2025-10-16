import React from 'react';
import PixelArtText from './PixelArtText';
import FancyButton from './FancyButton';
import { Service, ServicesProps } from '../types/types';

const Services: React.FC<ServicesProps> = ({ isThin }) => {
  const services: Service[] = [
    //   {
    //     title: 'Media Converter',
    //     description:
    //       'Convert between common video, audio, and image formats. No account needed, files processed locally.',
    //     status: 'available',
    //     url: 'https://niemo.io/media-convert',
    //   },
    {
      title: 'Connecticut Foreclosures Scraper',
      description: [
        'Live Connecticut home foreclosure info',
        'Requires a special CORS Chrome Extension',
      ],
      status: 'available',
      url: 'https://niemo.io/foreclosure',
    },
    {
      title: 'Westchester Flying Disc Incorporated FYI',
      description: ['Demo proposal functionality for WUDI league website'],
      status: 'available',
      url: 'https://wudi.fyi/',
    },
    // {
    //   title: 'CT Foreclosures Backend',
    //   description: 'Simple interface for property status monitoring. Using Backend (Slower)',
    //   status: 'available',
    //   url: 'https://niemo.io/foreclosures_new',
    // },
    //   {
    //     title: 'Audio Editor',
    //     description:
    //       'Basic audio editing for podcasts and recordings. Trim, split, and adjust volume without installing software.',
    //     status: 'in progress',
    //     url: 'https://niemo.io/audio-edit',
    //   },
    //   {
    //     title: 'YouTube Downloader',
    //     description:
    //       'Download YouTube videos as MP4 or extract audio as MP3. Simple paste-and-download interface.',
    //     status: 'in progress',
    //     url: 'https://niemo.io/youtube-download',
    //   },
  ];

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'text-green-300';
      case 'in progress':
        return 'text-yellow-300';
      case 'maintenance':
        return 'text-red-300';
      default:
        return 'text-blue-300';
    }
  };

  const getStatusIcon = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'available':
        return '●';
      case 'in progress':
        return '⚡';
      case 'maintenance':
        return '⚠';
      default:
        return '○';
    }
  };

  const handleServiceClick = (url: string): void => {
    window.open(url, '_blank');
  };

  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/80' : ''}`}>
      <div className="mb-16 text-center">
        <div className="mb-4 mt-10">
          <PixelArtText
            scrollContainerSelector=".pixel-text-services"
            pixelColor="#fff"
            text=" SERVICES "
          />
        </div>
        <p className="pixel-font pt-4 text-2xl text-blue-300">Tools for common or annoying tasks</p>
      </div>

      <div className="grid grid-cols-1 gap-16">
        {services.map((service, index) => (
          <div key={index} className="w-full rounded-2xl transition-all duration-300">
            <div className="mb-4 flex flex-row items-center justify-center text-center">
              <div className="pixel-font text-4xl uppercase text-white">
                <strong>{service.title}</strong>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-center">
              <span className={`text-xl ${getStatusColor(service.status)}`}>
                {getStatusIcon(service.status)} {service.status.toUpperCase()}
              </span>
            </div>

            <div className="px-4 py-0">
              {service.description.map((desc, descIndex) => (
                <div key={descIndex} className="mb-0 text-center text-xl text-blue-100">
                  {desc}
                </div>
              ))}

              <div className="text-center mt-4">
                <FancyButton text="TRY IT" onClick={() => handleServiceClick(service.url)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-20" />
    </section>
  );
};

export default Services;
