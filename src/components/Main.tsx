// Main.tsx

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import ContactSection from './ContactSection';
import { Resume } from './Resume';
import AudioSpectrogram from './Spectrogram';
import { Tooltip } from 'react-tooltip';
import { ProjectStore } from '../store/ProjectStore';
import { showContactSection, showKirbyGame, showSmashedGif, tooltipDelay, toolTipStyle } from '../data/myData';
import PixelArtText from './PixelArtText';

const BackgroundScene = lazy(() => import('./BackgroundScene'));

export const phoneNumber = '618-616-3380';
export const email = 'niemeyer.eric@gmail.com';
export const isThin: boolean = window.innerWidth < 1200;
export const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

export const __DEV__ = process.env.NODE_ENV === 'development';

interface NetworkInformation {
  downlink?: number;
  effectiveType?: string;
  saveData?: boolean;
}

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

const Main: React.FC = () => {
  const setConnectionQuality = ProjectStore((state) => state.setConnectionQuality);
  const highFreqPowerRef = useRef<number>(0);
  const lowFreqPowerRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sceneReady, setSceneReady] = useState(false);

  const [urlStateCurr, setUrlStateCurr] = useState<URL | null>(null);
  const [urlStatePrev, setUrlStatePrev] = useState<URL | null>(null);

  const [showDemoNavigationGame, setShowDemoNavigationGame] = useState<boolean>(false);

  const bounceDuration = 1000;

  const scrollToBottom = () => {
    const bottom = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    window.scrollTo({ top: bottom, behavior: 'smooth' });
  };

  const [animateKirby, setAnimateKirby] = useState(false);

  const handleKirbyClick = async () => {
    scrollToBottom();

    setAnimateKirby(true);
    setTimeout(() => {
      setShowDemoNavigationGame(true);
    }, bounceDuration);
  };

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event?.data?.url) {
        console.log('Received message from iframe:', event);
        setUrlStateCurr(event.data.url);
      }
    }
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  useEffect(() => {
    if (urlStateCurr !== urlStatePrev && urlStateCurr !== null) {
      __DEV__ && console.log('NAVIGATING TO URL', urlStateCurr);
      const httpToHttps = (url: string) => url.replace('http://', 'https://');
      const urlStateCurrHttps = httpToHttps(urlStateCurr.toString());
      window.location.href = urlStateCurrHttps;
      setUrlStatePrev(urlStateCurr);
    }
  }, [urlStateCurr, urlStatePrev]);

  useEffect(() => {
    const idleWindow = window as IdleWindow;
    let timeoutId = 0;
    let idleId = 0;

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(() => setSceneReady(true), { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(() => setSceneReady(true), 150);
    }

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId) idleWindow.cancelIdleCallback?.(idleId);
    };
  }, []);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const defaultQuality = isThin ? 'medium' : 'high';

    if (connection?.saveData || connection?.effectiveType?.includes('2g') || (connection?.downlink ?? 10) < 1) {
      setConnectionQuality('low');
    } else if (connection?.effectiveType === '3g' || (connection?.downlink ?? 10) < 2) {
      setConnectionQuality('medium');
    } else {
      setConnectionQuality(defaultQuality);
    }
  }, [setConnectionQuality]);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip">
      <div className="absolute left-0 top-0 -z-10 min-h-screen w-full"></div>

      {sceneReady && (
        <Suspense fallback={null}>
          <BackgroundScene
            compact={isThin || isMobile}
            highFreqPowerRef={highFreqPowerRef}
            lowFreqPowerRef={lowFreqPowerRef}
            audioRef={audioRef}
          />
        </Suspense>
      )}

      {/* Desktop Resume & AudioSpectrogram */}
      {!isThin && (
        <div className="fixed left-0 z-10 h-screen w-[30%] px-4">
          <div className="mt-8 flex flex-col items-center">
            <h1 className="pixel-font text-center text-6xl font-bold uppercase">Eric Niemeyer</h1>
            {showSmashedGif && (
              <img
                data-tooltip-content={'His 2017 gif spawned a 2022 game'}
                className="pixel-art tooltip mt-4 w-[70%] object-cover"
                src="/smashed_small.gif"
                alt="gif"
              />
            )}
          </div>
          <div className="absolute bottom-2 left-0 flex w-full justify-center">
            <AudioSpectrogram
              highFreqPowerRef={highFreqPowerRef}
              lowFreqPowerRef={lowFreqPowerRef}
              audioRef={audioRef}
            />
          </div>
        </div>
      )}

      <>
        <div className="left-0 top-0 z-0 flex h-full w-full flex-col items-end">
          <div className={`relative ${isThin ? 'w-full' : 'w-[70%]'} h-full`}>
            <div className="h-auto w-full">
              <Resume />
            </div>

            <div className="h-40" />

            {showContactSection && (
              <div className={!isThin ? '' : 'border border-black/0 bg-black/80'}>
                <div className="mb-4 mt-16">
                  <PixelArtText scrollContainerSelector=".pixel-text-contact" pixelColor="#fff" text=" CONTACT " />
                </div>
                <ContactSection
                  animateKirby={animateKirby}
                  onPhoneClick={() => window.open('tel:618-616-3380')}
                  handleKirbyClick={handleKirbyClick}
                />

                <section
                  className={`${
                    isThin
                      ? showDemoNavigationGame
                        ? 'h-[500px]'
                        : 'h-[200px]'
                      : showDemoNavigationGame
                        ? 'h-[700px]'
                        : 'h-[300px]'
                  } relative z-30 flex flex-col items-center justify-end`}
                >
                  {showDemoNavigationGame ? (
                    <>
                      <iframe
                        className={`${isThin ? 'h-[400px] w-full' : 'h-[800px] w-full'} justify-self-center shadow-xl transition-all`}
                        src="https://projects.niemo.io"
                        title="Projects"
                        allowFullScreen
                      ></iframe>
                      <img
                        className={`absolute right-2 z-40 h-12 w-12 cursor-pointer transition-all hover:scale-105 hover:opacity-100 active:opacity-50 ${isThin ? 'top-28' : 'top-2 opacity-50'}`}
                        src="/remove.png"
                        alt="Close"
                        onClick={() => setShowDemoNavigationGame(false)}
                      />
                    </>
                  ) : (
                    <>
                      {showKirbyGame && (
                        <div
                          className={`${isThin ? 'h-[400px] w-full' : 'h-[800px] w-full'} flex flex-col items-center justify-center justify-self-center shadow-xl transition-all`}
                        >
                          <img
                            className="pixel-art mt-4 h-full origin-center transform cursor-pointer justify-self-center opacity-10 transition-all hover:scale-105 hover:opacity-50 active:scale-95 active:opacity-100"
                            src="/qwhite_hardpixels_transbg.png"
                            alt="Question Mark"
                            onClick={handleKirbyClick}
                          />
                        </div>
                      )}
                    </>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
        <Tooltip
          opacity={1}
          anchorSelect=".tooltip"
          place="top"
          delayHide={tooltipDelay}
          delayShow={tooltipDelay}
          style={toolTipStyle}
        />
      </>
    </div>
  );
};

export default Main;
