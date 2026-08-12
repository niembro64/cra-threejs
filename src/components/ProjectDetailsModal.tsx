import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { show_dates, showProjectTitleIcons, type Project } from '../data/myData';
import FancyButton from './FancyButton';
import ProjectMedia from './ProjectMedia';

interface ProjectDetailsModalProps {
  project: Project;
  mediaSource: string | null;
  isMuted: boolean;
  canControlSound: boolean;
  showSoundHint: boolean;
  canLaunch: boolean;
  unavailableLabel: string;
  onToggleMuted: () => void;
  onClose: () => void;
}

const focusableElementSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  mediaSource,
  isMuted,
  canControlSound,
  showSoundHint,
  canLaunch,
  unavailableLabel,
  onToggleMuted,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const appElement = document.querySelector<HTMLElement>('.App');
    const previousAppOverflow = appElement?.style.overflowY ?? '';
    const previousBodyOverflow = document.body.style.overflow;

    if (appElement) appElement.style.overflowY = 'hidden';
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableElementSelector) ?? []
      ).filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (appElement) appElement.style.overflowY = previousAppOverflow;
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocusedElement?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-8"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={project.description ? descriptionId : undefined}
        tabIndex={-1}
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-blue-300/50 bg-slate-950 shadow-2xl outline-none sm:max-h-[calc(100dvh-4rem)]"
      >
        <header className="sticky top-0 z-10 flex items-start gap-3 border-b border-white/10 bg-slate-950/95 px-5 py-5 pr-16 backdrop-blur sm:px-8 sm:py-6 sm:pr-20">
          {showProjectTitleIcons && project.icon && (
            <img
              src={`${process.env.PUBLIC_URL}/${project.icon}`}
              alt=""
              className="h-10 w-auto shrink-0 sm:h-12"
            />
          )}
          <div className="min-w-0">
            <h2 id={titleId} className="pixel-font text-3xl uppercase leading-tight text-white sm:text-4xl">
              <strong>{project.title}</strong>
            </h2>
            {show_dates && project.dates && (
              <p className="mt-1 text-base text-blue-200 sm:text-lg">{project.dates}</p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-3xl leading-none text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:right-5 sm:top-5"
            onClick={onClose}
            aria-label={`Close details for ${project.title}`}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        {mediaSource && (
          <div className="px-5 pt-6 sm:px-8 sm:pt-8">
            <div className="relative">
              <ProjectMedia
                source={mediaSource}
                poster={project.image}
                title={project.title}
                isMuted={isMuted}
                isVisible
              />
              {canControlSound && (
                <button
                  type="button"
                  className="absolute bottom-2 right-2 z-10 rounded-full bg-black/70 p-2 text-white shadow-xl transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                  onClick={onToggleMuted}
                  aria-label={isMuted ? `Unmute ${project.title}` : `Mute ${project.title}`}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/${isMuted ? 'no-sound.png' : 'sound.png'}`}
                    alt=""
                    className="h-8 w-8"
                  />
                  {showSoundHint && (
                    <span className="animation-delay-2000 absolute left-0 top-0 h-full w-full animate-ping rounded-full bg-white opacity-50" />
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        <div className="space-y-5 px-5 py-6 sm:px-8 sm:py-8">
          {project.type && (
            <section>
              <h3 className="pixel-font text-2xl uppercase text-blue-300">Type</h3>
              <p className="mt-1 text-lg text-blue-100">{project.type}</p>
            </section>
          )}

          {project.description && (
            <p id={descriptionId} className="text-lg leading-relaxed text-blue-100">
              {project.description}
            </p>
          )}

          {project.stack && (
            <section>
              <h3 className="pixel-font text-2xl uppercase text-fuchsia-300">Stack</h3>
              <p className="mt-1 text-lg text-fuchsia-100">{project.stack.join(', ')}</p>
            </section>
          )}

          {project.bullets && (
            <section>
              <h3 className="pixel-font text-2xl uppercase text-green-300">Features</h3>
              <ul className="mt-1 list-outside list-disc space-y-1 pl-6 text-lg text-green-100">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <footer className="border-t border-white/10 px-5 pb-3 pt-5 sm:px-8">
          {canLaunch ? (
            <FancyButton
              text={`${project.buttonStartText} ${project.title}`.toUpperCase()}
              onClick={() => window.location.assign(project.url)}
            />
          ) : (
            <button
              type="button"
              className="mb-4 w-full rounded-3xl bg-white/10 py-3 text-2xl uppercase text-white/50"
              disabled
            >
              {unavailableLabel}
            </button>
          )}
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default ProjectDetailsModal;
