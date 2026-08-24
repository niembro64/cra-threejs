import { buildStarNoteSearchText, starNoteCells, starNotes } from './starNotes';

const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

describe('STAR note corpus', () => {
  it('has stable unique identifiers', () => {
    expect(starNotes.length).toBeGreaterThanOrEqual(60);
    expect(new Set(starNotes.map((note) => note.id)).size).toBe(starNotes.length);
  });

  it('keeps every displayed cell concise', () => {
    starNotes.forEach((note) => {
      starNoteCells.forEach((cell) => {
        expect(note[cell].length).toBeGreaterThan(0);
        expect(note[cell].length).toBeLessThanOrEqual(4);
        note[cell].forEach((bullet) => {
          expect({ id: note.id, cell, bullet, words: wordCount(bullet) }).toEqual(
            expect.objectContaining({ words: expect.any(Number) })
          );
          expect(wordCount(bullet)).toBeLessThanOrEqual(10);
        });
      });
    });
  });

  it('includes hidden semantic context for every card', () => {
    starNotes.forEach((note) => {
      expect(note.themes.length).toBeGreaterThan(0);
      expect(note.aliases.length).toBeGreaterThan(0);
      expect(buildStarNoteSearchText(note)).toContain(note.title);
      expect(buildStarNoteSearchText(note)).toContain(note.question);
    });
  });
});
