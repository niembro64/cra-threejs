import {
  clearDiscussedStarNoteIds,
  loadDiscussedStarNoteIds,
  saveDiscussedStarNoteIds,
  STAR_NOTES_STORAGE_KEY,
} from './starNotesStorage';

describe('STAR note discussed storage', () => {
  beforeEach(() => window.localStorage.clear());

  it('round-trips valid identifiers', () => {
    saveDiscussedStarNoteIds(new Set(['second', 'first']));
    expect(loadDiscussedStarNoteIds(new Set(['first', 'second', 'third']))).toEqual(new Set(['first', 'second']));
  });

  it('drops stale identifiers and malformed data', () => {
    window.localStorage.setItem(STAR_NOTES_STORAGE_KEY, JSON.stringify(['current', 'removed', 12]));
    expect(loadDiscussedStarNoteIds(new Set(['current']))).toEqual(new Set(['current']));

    window.localStorage.setItem(STAR_NOTES_STORAGE_KEY, '{broken');
    expect(loadDiscussedStarNoteIds(new Set(['current']))).toEqual(new Set());
  });

  it('clears only the STAR note key', () => {
    window.localStorage.setItem('unrelated', 'preserve-me');
    saveDiscussedStarNoteIds(new Set(['first']));
    clearDiscussedStarNoteIds();

    expect(window.localStorage.getItem(STAR_NOTES_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem('unrelated')).toBe('preserve-me');
  });
});
