// FunFactSection.tsx

import React from 'react';
import { isThin } from './Main';
import ReactGA from 'react-ga4';
import { showEmojis, triviaItems, ContentSegment } from '../data/myData';
import PixelArtText from './PixelArtText';

const TriviaSection: React.FC = () => {
  const renderContent = (content: ContentSegment[]) => {
    return content.map((segment, index) => {
      if (segment.type === 'text') {
        return <React.Fragment key={index}>{segment.text}</React.Fragment>;
      } else {
        return (
          <a
            key={index}
            href={segment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
            onClick={() => {
              ReactGA.event({
                category: segment.analyticsCategory,
                action: 'Click',
                label: segment.analyticsLabel,
              });
            }}
          >
            {segment.text}
          </a>
        );
      }
    });
  };

  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/80' : ''}`}>
      <div className="mb-8 w-full text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">✨</h1>}
        {/* <h1 className="pixel-font text-6xl font-bold">TRIVIA</h1> */}
        <div className="mb-4 mt-10">
          <PixelArtText
            scrollContainerSelector=".pixel-text-trivia"
            pixelColor="#fff"
            text=" TRIVIA "
          />
        </div>
      </div>
      {triviaItems.map((item, index) => (
        <div key={index} className="mb-8 w-full">
          <h4 className="text-center text-3xl font-bold text-fuchsia-300">{item.title}</h4>
          <p className="mt-2 w-full break-words text-xl">{renderContent(item.content)}</p>
        </div>
      ))}
    </section>
  );
};

export default TriviaSection;
