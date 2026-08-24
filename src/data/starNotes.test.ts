import { buildStarNoteSearchText, starNoteCells, starNotes } from './starNotes';

const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

describe('STAR note corpus', () => {
  it('has stable unique identifiers', () => {
    expect(starNotes.length).toBeGreaterThanOrEqual(30);
    expect(starNotes.length).toBeLessThanOrEqual(45);
    expect(new Set(starNotes.map((note) => note.id)).size).toBe(starNotes.length);
  });

  it('uses Boeing-style experience questions', () => {
    starNotes.forEach((note) => {
      expect(note.question).toMatch(/^(Tell me about|Give me an example|Describe (?:your experience|a time))/);
      expect(note.question).toMatch(/[?.]$/);
    });
  });

  it('omits general showcase projects without a strong interview match', () => {
    const removedShowcaseIds = [
      'conv-net-chess',
      'genetic-racing',
      'embedding-pca',
      'attention-visualization',
      'function-approximation',
      'pathfinding-lab',
      'extended-axelrod',
      'tanks-gates',
      'galaxy-destroyer',
      'portfolio-navigator',
      'css-experiments',
      'audio-visualizations',
      'original-music-recognition',
    ];

    expect(starNotes.filter((note) => removedShowcaseIds.includes(note.id))).toHaveLength(0);
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
