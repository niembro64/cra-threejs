export const STAR_NOTES_STORAGE_KEY = 'niemo.starNotes.discussed.v1';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const browserStorage = (): StorageLike | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
};

export const loadDiscussedStarNoteIds = (
  validIds: ReadonlySet<string>,
  storage: StorageLike | null = browserStorage()
): Set<string> => {
  if (!storage) return new Set();

  try {
    const storedValue = storage.getItem(STAR_NOTES_STORAGE_KEY);
    if (!storedValue) return new Set();
    const parsedValue: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) return new Set();

    return new Set(parsedValue.filter((value): value is string => typeof value === 'string' && validIds.has(value)));
  } catch {
    return new Set();
  }
};

export const saveDiscussedStarNoteIds = (
  discussedIds: ReadonlySet<string>,
  storage: StorageLike | null = browserStorage()
): void => {
  if (!storage) return;
  try {
    storage.setItem(STAR_NOTES_STORAGE_KEY, JSON.stringify([...discussedIds].sort()));
  } catch {
    // Private browsing and storage policies can reject writes.
  }
};

export const clearDiscussedStarNoteIds = (storage: StorageLike | null = browserStorage()): void => {
  if (!storage) return;
  try {
    storage.removeItem(STAR_NOTES_STORAGE_KEY);
  } catch {
    // Keep the interface usable when storage is unavailable.
  }
};
