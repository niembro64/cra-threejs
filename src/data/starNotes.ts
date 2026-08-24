import rawStarNotes from './starNotes.json';

export type StarNoteCell = 'situation' | 'task' | 'action' | 'result';

export type StarNote = {
  id: string;
  title: string;
  question: string;
  themes: string[];
  aliases: string[];
  situation: string[];
  task: string[];
  action: string[];
  result: string[];
};

export const starNotes = rawStarNotes as StarNote[];

export const starNoteCells: StarNoteCell[] = ['situation', 'task', 'action', 'result'];

export const buildStarNoteSearchText = (note: StarNote): string =>
  [
    `STAR interview story: ${note.title}`,
    `Sample question: ${note.question}`,
    `Interview competencies and technical context: ${note.themes.join(', ')}`,
    `Related interview prompts: ${note.aliases.join('; ')}`,
    `Situation: ${note.situation.join(' ')}`,
    `Task: ${note.task.join(' ')}`,
    `Action: ${note.action.join(' ')}`,
    `Result: ${note.result.join(' ')}`,
  ].join('\n');
