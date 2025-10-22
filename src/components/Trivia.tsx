// FunFactSection.tsx

import React from 'react';
import { isThin } from './Main';
import ReactGA from 'react-ga4';
import { showEmojis } from '../data/myData';
import PixelArtText from './PixelArtText';

interface LinkSegment {
  type: 'link';
  text: string;
  url: string;
  analyticsCategory: string;
  analyticsLabel: string;
}

interface TextSegment {
  type: 'text';
  text: string;
}

type ContentSegment = TextSegment | LinkSegment;

interface TriviaItem {
  title: string;
  content: ContentSegment[];
}

const triviaItems: TriviaItem[] = [
  {
    title: 'Wikipedia-Famous',
    content: [
      { type: 'text', text: "Niemo's track " },
      {
        type: 'link',
        text: '"Small Talk (Build IV)"',
        url: 'https://en.wikipedia.org/wiki/File:Ars_Niemo_-_Small_Talk_Build_IV.ogg',
        analyticsCategory: 'Wikipedia',
        analyticsLabel: 'Small Talk (Build IV)',
      },
      {
        type: 'text',
        text: " holds a dignified place in the annals of electronic music. It's prominently featured on both the ",
      },
      {
        type: 'link',
        text: 'Drum and Bass',
        url: 'https://en.wikipedia.org/wiki/Drum_and_bass',
        analyticsCategory: 'Wikipedia',
        analyticsLabel: 'Drum and Bass',
      },
      { type: 'text', text: ' and ' },
      {
        type: 'link',
        text: 'Liquid Funk',
        url: 'https://en.wikipedia.org/wiki/Liquid_funk',
        analyticsCategory: 'Wikipedia',
        analyticsLabel: 'Liquid Funk',
      },
      {
        type: 'text',
        text: ' Wikipedia pages - originally uploaded by editor "Ftiercel" on April 15, 2012, this track remains the only audio sample from this extensive genre available on the site.',
      },
    ],
  },
  {
    title: 'Ultimate Frisbee',
    content: [
      {
        type: 'text',
        text: 'Niemo plays a sport called Ultimate Frisbee, which is a competitive mixed-gender team sport. He was executive manager of ',
      },
      {
        type: 'link',
        text: 'Republic of Korea Ultimate (ROK-U)',
        url: 'https://www.rokultimate.net/',
        analyticsCategory: 'Ultimate Frisbee',
        analyticsLabel: 'ROK-U',
      },
      {
        type: 'text',
        text: ', the national ultimate frisbee league of South Korea, from 2015 - 2016. He is currently a coordinator for ',
      },
      {
        type: 'link',
        text: 'Westchester Ultimate Disc Inc (WUDI)',
        url: 'https://www.wudi.org/',
        analyticsCategory: 'Ultimate Frisbee',
        analyticsLabel: 'WUDI',
      },
      { type: 'text', text: ', a league in Westchester, NY.' },
    ],
  },
  {
    title: 'Musician',
    content: [
      { type: 'text', text: 'Niemo is a versatile ' },
      {
        type: 'link',
        text: 'musician',
        url: 'https://en.wikipedia.org/wiki/Concertmaster',
        analyticsCategory: 'Wikipedia',
        analyticsLabel: 'Concertmaster',
      },
      {
        type: 'text',
        text: ' concert violinist, piano composer, flamenco guitarist, and electronic music DJ. He has performed with numerous orchestras, bands, and quartets and has composed music for television and video games. His DJing experience spans weddings, parties, and clubs across the USA and Korea.',
      },
    ],
  },
  {
    title: 'Crypto',
    content: [
      {
        type: 'text',
        text: 'Niemo began mining Bitcoin with professional-grade ASIC miners in 2017, when it was valued at just $1,000. Through this experience, he gained a deep understanding of blockchain and cryptocurrency, which he now leverages to advise friends and coworkers.',
      },
    ],
  },
];

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
    <section className={`py-12 ${isThin ? 'bg-black/80 px-4' : ''}`}>
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
      <div className={`${isThin ? '' : ''}`}>
        {triviaItems.map((item, index) => (
          <div key={index} className="mb-8">
            <h4 className="text-center text-3xl font-bold text-fuchsia-300">{item.title}</h4>
            <p className="mt-2 text-xl">{renderContent(item.content)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TriviaSection;
