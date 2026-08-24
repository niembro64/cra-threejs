import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StarNote, starNoteCells, starNotes } from '../data/starNotes';
import {
  clearDiscussedStarNoteIds,
  loadDiscussedStarNoteIds,
  saveDiscussedStarNoteIds,
} from '../utils/starNotesStorage';

type RankedStarNote = StarNote & {
  similarity: number | null;
};

type SearchResult = {
  id: string;
  score: number;
};

type SearchResponse = {
  query: string;
  results: SearchResult[];
};

type SearchState = 'idle' | 'searching' | 'ready' | 'error';

const API_BASE_URL = (process.env.REACT_APP_API_URL || '/api').replace(/\/$/, '');
const SEARCH_DELAY_MS = 500;
const validStarNoteIds = new Set(starNotes.map((note) => note.id));

const cellLabels = {
  situation: 'Situation',
  task: 'Task',
  action: 'Action',
  result: 'Result',
} as const;

const StarNotes: React.FC = () => {
  const [query, setQuery] = useState('');
  const [rankedResults, setRankedResults] = useState<SearchResult[]>([]);
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [discussedIds, setDiscussedIds] = useState<Set<string>>(() => loadDiscussedStarNoteIds(validStarNoteIds));
  const activeRequestRef = useRef(0);

  useEffect(() => {
    document.title = 'STAR Interview Prep | Eric Niemeyer';

    const robotsName = 'robots';
    const previousRobots = document.querySelector<HTMLMetaElement>(`meta[name="${robotsName}"]`);
    const ownedRobots = !previousRobots;
    const robots = previousRobots ?? document.createElement('meta');
    robots.setAttribute('name', robotsName);
    robots.setAttribute('content', 'noindex,nofollow');
    if (ownedRobots) document.head.appendChild(robots);

    return () => {
      document.title = 'Eric Niemeyer';
      if (ownedRobots) robots.remove();
    };
  }, []);

  useEffect(() => {
    const normalizedQuery = query.trim();
    const requestId = ++activeRequestRef.current;

    if (normalizedQuery.length < 3) {
      setRankedResults([]);
      setSearchState('idle');
      return undefined;
    }

    const abortController = new AbortController();
    setSearchState('searching');
    const timeoutId = window.setTimeout(() => {
      fetch(`${API_BASE_URL}/resume-agent/star-notes/search/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: normalizedQuery }),
        signal: abortController.signal,
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(`Search failed with status ${response.status}`);
          return (await response.json()) as SearchResponse;
        })
        .then((payload) => {
          if (activeRequestRef.current !== requestId) return;
          setRankedResults(payload.results);
          setSearchState('ready');
        })
        .catch((error: unknown) => {
          if (abortController.signal.aborted || activeRequestRef.current !== requestId) return;
          setRankedResults([]);
          setSearchState('error');
          console.error('Unable to rank STAR notes', error);
        });
    }, SEARCH_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [query]);

  const visibleNotes = useMemo<RankedStarNote[]>(() => {
    if (!rankedResults.length) {
      return starNotes.map((note) => ({ ...note, similarity: null }));
    }

    const notesById = new Map(starNotes.map((note) => [note.id, note]));
    const rankedIds = new Set(rankedResults.map((result) => result.id));
    const rankedNotes = rankedResults.flatMap((result) => {
      const note = notesById.get(result.id);
      return note ? [{ ...note, similarity: result.score }] : [];
    });
    const missingNotes = starNotes
      .filter((note) => !rankedIds.has(note.id))
      .map((note) => ({ ...note, similarity: null }));
    return [...rankedNotes, ...missingNotes];
  }, [rankedResults]);

  const toggleDiscussed = (id: string) => {
    setDiscussedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveDiscussedStarNoteIds(next);
      return next;
    });
  };

  const clearDiscussed = () => {
    clearDiscussedStarNoteIds();
    setDiscussedIds(new Set());
  };

  const normalizedQuery = query.trim();
  const isRanked = searchState === 'ready' && normalizedQuery.length >= 3;

  return (
    <main className="min-h-screen bg-[#0c1015] text-slate-100">
      <section className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-3 py-4 sm:px-5 lg:px-7">
        <header className="border-b border-slate-700/70 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Private Flight Simulation Interview Prep
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Experience-Based STAR Answers</h1>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">
            Enter the interviewer&apos;s question. Semantic similarity moves the strongest evidence-based answers to the
            top, prioritizing engineering, integration, simulation, and software delivery.
          </p>
        </header>

        <section className="sticky top-0 z-20 rounded-lg border border-cyan-300/25 bg-slate-950/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-4">
          <label htmlFor="star-question" className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-300">
            Interview question
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              id="star-question"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              placeholder="Paste or type the question you were asked…"
              className="min-w-0 flex-1 rounded border border-slate-600 bg-slate-900 px-3 py-2.5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400 hover:bg-slate-800"
              >
                Clear search
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite">
              {searchState === 'searching' && 'Ranking every flash card…'}
              {searchState === 'ready' && `Ranked all ${starNotes.length} cards by semantic similarity.`}
              {searchState === 'error' && 'Search is temporarily unavailable; showing the original order.'}
              {searchState === 'idle' && `Showing ${starNotes.length} cards in the original order.`}
            </p>
            <div className="flex items-center gap-3">
              <span>
                <strong className="text-slate-100">{discussedIds.size}</strong> discussed
              </span>
              <button
                type="button"
                onClick={clearDiscussed}
                disabled={discussedIds.size === 0}
                className="rounded border border-slate-700 px-2.5 py-1 font-semibold text-slate-300 transition hover:border-rose-400/60 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear discussed
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4" aria-label="Ranked STAR flash cards">
          {visibleNotes.map((note, index) => {
            const discussed = discussedIds.has(note.id);
            return (
              <article
                key={note.id}
                className={[
                  'overflow-hidden rounded-lg border bg-slate-950/65 shadow-lg shadow-black/20 transition',
                  discussed ? 'border-emerald-400/45' : 'border-slate-700/80',
                ].join(' ')}
              >
                <header className="flex flex-col gap-3 border-b border-slate-800 bg-slate-900/75 px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 gap-3">
                    <span className="mt-0.5 flex h-7 min-w-7 items-center justify-center rounded bg-cyan-300/10 px-1 text-xs font-bold text-cyan-200">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-white sm:text-lg">{note.title}</h2>
                      <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">{note.question}</p>
                      {isRanked && note.similarity !== null && (
                        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.1em] text-cyan-300/75">
                          Semantic match {note.similarity.toFixed(3)}
                        </p>
                      )}
                    </div>
                  </div>

                  <label className="flex cursor-pointer select-none items-center gap-2 self-start rounded border border-slate-700 bg-slate-950/70 px-2.5 py-1.5 text-xs font-semibold text-slate-200">
                    <input
                      type="checkbox"
                      checked={discussed}
                      onChange={() => toggleDiscussed(note.id)}
                      aria-label={`Mark ${note.title} as discussed`}
                      className="h-4 w-4 accent-emerald-400"
                    />
                    Discussed
                  </label>
                </header>

                <div className="grid gap-px bg-slate-800 sm:grid-cols-2 xl:grid-cols-[0.9fr_0.9fr_1.35fr_0.9fr]">
                  {starNoteCells.map((cell) => (
                    <section key={cell} className="min-w-0 bg-slate-950/90 px-4 py-3">
                      <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-cyan-300">
                        {cellLabels[cell]}
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-sm leading-5 text-slate-200">
                        {note[cell].map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
};

export default StarNotes;
