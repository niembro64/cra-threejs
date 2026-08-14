import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

const loadResumeVoiceAgentPanel = () => import('./ResumeVoiceAgentPanel');
const ResumeVoiceAgentPanel = lazy(loadResumeVoiceAgentPanel);

const ResumeVoiceAgent: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="resume-voice-agent"
      className="scroll-mt-8 px-4 pb-20 pt-8 text-center"
      aria-labelledby="resume-voice-agent-heading"
    >
      <div
        ref={cardRef}
        data-testid="resume-voice-agent-card"
        className="mx-auto h-[32rem] max-w-3xl overflow-hidden border border-fuchsia-300/40 bg-black/75 px-4 py-5 shadow-[0_0_40px_rgba(192,38,211,0.14)] backdrop-blur-sm sm:px-6 sm:py-6"
        onPointerEnter={() => void loadResumeVoiceAgentPanel()}
        onFocusCapture={() => void loadResumeVoiceAgentPanel()}
      >
        {!isActivated ? (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="pixel-font mb-3 text-sm uppercase tracking-[0.28em] text-fuchsia-300">Interactive résumé</p>
            <h2 id="resume-voice-agent-heading" className="pixel-font text-3xl text-white md:text-5xl">
              ASK MY RÉSUMÉ
            </h2>
            <p className="pixel-font mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-blue-200 md:text-xl">
              Talk with an AI guide about Eric&apos;s work, projects, skills, and experience.
            </p>
            <button
              type="button"
              onClick={activate}
              className="pixel-font mt-8 border-2 border-fuchsia-300 bg-fuchsia-300/10 px-8 py-4 text-xl text-white transition hover:bg-fuchsia-300 hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 active:scale-95"
            >
              START VOICE AGENT
            </button>
            <p className="mt-4 text-sm text-white/55">
              AI-generated voice · microphone permission is requested only after you start
            </p>
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
    </section>
  );
};

export default ResumeVoiceAgent;
