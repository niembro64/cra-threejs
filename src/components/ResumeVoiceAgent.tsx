import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { resumeVoiceAgentVisibilityConfig } from '../config/resumeVoiceAgent';
import { isThin } from './Main';
import PixelArtText from './PixelArtText';

const loadResumeVoiceAgentPanel = () => import('./ResumeVoiceAgentPanel');
const ResumeVoiceAgentPanel = lazy(loadResumeVoiceAgentPanel);

const ResumeVoiceAgent: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(resumeVoiceAgentVisibilityConfig.statusEndpoint, {
      cache: 'no-store',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to check voice-agent visibility.');
        return response.json() as Promise<{ visible?: boolean }>;
      })
      .then((payload) => setIsVisible(payload.visible !== false))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setIsVisible(resumeVoiceAgentVisibilityConfig.failOpen);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        void loadResumeVoiceAgentPanel();
        observer.disconnect();
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const activate = () => {
    void loadResumeVoiceAgentPanel();
    setIsActivated(true);
  };

  if (isVisible !== true) return null;

  return (
    <>
      <section
        id="resume-voice-agent"
        className={`scroll-mt-8 px-4 py-12 text-center ${isThin ? 'resume-section-surface' : ''}`}
        aria-labelledby="resume-voice-agent-heading"
      >
        <div
          ref={cardRef}
          data-testid="resume-voice-agent-card"
          className="mx-auto h-[32rem] max-w-3xl overflow-hidden px-4 py-5 sm:px-6 sm:py-6"
          onPointerEnter={() => void loadResumeVoiceAgentPanel()}
          onFocusCapture={() => void loadResumeVoiceAgentPanel()}
        >
          {!isActivated ? (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="pixel-font mb-3 text-sm uppercase tracking-[0.28em] text-fuchsia-300">Interactive résumé</p>
              <h2 id="resume-voice-agent-heading" className="sr-only">
                ASK MY RESUME
              </h2>
              <div className="w-full max-w-2xl">
                <PixelArtText pixelColor="#fff" text=" ASK MY RESUME " totalHorzPixels={88} />
              </div>
              <p className="pixel-font mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-blue-200 md:text-xl">
                Talk with a voice agent that knows Eric
              </p>
              <button
                type="button"
                onClick={activate}
                className="pixel-font mt-8 bg-fuchsia-300/15 px-8 py-4 text-xl text-white transition hover:bg-fuchsia-300 hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 active:scale-95"
              >
                START
              </button>
              <p className="mt-4 text-sm text-white/55">microphone permission requested</p>
            </div>
          ) : (
            <Suspense
              fallback={
                <div
                  className="pixel-font flex h-full items-center justify-center text-blue-200"
                  aria-busy="true"
                  aria-live="polite"
                >
                  Loading voice controls…
                </div>
              }
            >
              <ResumeVoiceAgentPanel autoStart />
            </Suspense>
          )}
        </div>
        <p className="pixel-font mt-4 hidden animate-bounce text-xl text-blue-300 md:block">↓ scroll down ↓</p>
      </section>
      <div className="h-40" aria-hidden="true" />
    </>
  );
};

export default ResumeVoiceAgent;
