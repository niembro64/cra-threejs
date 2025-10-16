import React from 'react';
import PixelArtText from './PixelArtText';
import FancyButton from './FancyButton';
import { Service, ServicesProps } from '../types/types';
import { ProjectStatus } from '../data/myData';

const Services: React.FC<ServicesProps> = ({ isThin }) => {
  const services: Service[] = [
    {
      title: 'Connecticut Foreclosures Scraper',
      description: [
        'Live Connecticut home foreclosure info',
        'Requires a special CORS Chrome Extension',
      ],
      projectStatus: 'ok',
      url: 'https://niemo.io/foreclosure',
      desktop: true,
      mobile: false,
    },
    {
      title: 'Westchester Flying Disc Incorporated FYI',
      description: ['Demo proposal functionality for WUDI league website'],
      projectStatus: 'ok',
      url: 'https://wudi.fyi/',
      desktop: true,
      mobile: true,
    },
    {
      title: 'Media Converter',
      description: [
        'Convert between common video, audio, and image formats',
        'No account needed, files processed locally.',
      ],
      projectStatus: 'disabled',
      url: 'https://niemo.io/media-convert',
      desktop: true,
      mobile: true,
    },
    // {
    //   title: 'CT Foreclosures Backend',
    //   description: 'Simple interface for property status monitoring. Using Backend (Slower)',
    //   status: 'ok',
    //   url: 'https://niemo.io/foreclosures_new',
    // },
    {
      title: 'Audio Editor',
      description: [
        'Basic audio editing for podcasts and recordings.',
        'Trim, split, and adjust volume without installing software.',
      ],
      projectStatus: 'disabled',
      url: 'https://niemo.io/audio-edit',
      desktop: true,
      mobile: false,
    },
    {
      title: 'YouTube Downloader',
      description: [
        'Download YouTube videos as MP4 or extract audio as MP3.',
        'Simple paste-and-download interface.',
      ],
      projectStatus: 'disabled',
      url: 'https://niemo.io/youtube-download',
      desktop: true,
      mobile: false,
    },
  ];

  const getStatusColor = (status: ProjectStatus): string => {
    switch (status.toLowerCase()) {
      case 'ok':
        return 'text-green-300';
      case 'disabled':
        return 'text-yellow-300';
      case 'hide':
        return 'text-red-300';
      default:
        return 'text-blue-300';
    }
  };

  const getStatusText = (status: ProjectStatus): string => {
    switch (status.toLowerCase()) {
      case 'ok':
        return '● Active';
      case 'disabled':
        return '⚡ Disabled';
      case 'hide':
        return '⚠ Hidden';
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
        {services.map((service, index) => {
          // if (service.mobile === false && isThin) {
          //   return null;
          // }

          // if (service.desktop === false && !isThin) {
          //   return null;
          // }

          return (
            <div key={index} className="w-full rounded-2xl transition-all duration-300">
              <div className="mb-4 flex flex-row items-center justify-center text-center">
                <div className="pixel-font text-4xl uppercase text-white">
                  <strong>{service.title}</strong>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-center">
                <span className={`text-xl ${getStatusColor(service.projectStatus)}`}>
                  {getStatusText(service.projectStatus)}
                </span>
              </div>

              <div className="px-4 py-0">
                {service.description.map((desc, descIndex) => (
                  <div key={descIndex} className="mb-0 text-center text-xl text-blue-100">
                    {desc}
                  </div>
                ))}

                <div className="text-center mt-4">
                  {service.projectStatus === 'ok' &&
                  ((isThin && service.mobile) || (!isThin && service.desktop)) ? (
                    <FancyButton
                      disabled={service.projectStatus !== 'ok'}
                      text="TRY IT"
                      onClick={() => handleServiceClick(service.url)}
                    />
                  ) : (
                    <button
                      type="button"
                      className={`w-full rounded-3xl bg-white/50 py-2 text-2xl uppercase text-white/50 transition-all hover:bg-gray-700 hover:text-white`}
                      disabled
                    >
                      {service.projectStatus !== 'ok'
                        ? 'Offline'
                        : isThin
                          ? 'Desktop Only'
                          : 'Mobile Only'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-20" />
    </section>
  );
};

export default Services;
