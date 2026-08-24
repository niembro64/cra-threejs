import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import Notes from './Notes';
import { STAR_NOTES_STORAGE_KEY } from '../utils/starNotesStorage';

describe('STAR flash cards', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('persists and clears discussed cards without clearing unrelated storage', () => {
    window.localStorage.setItem('unrelated', 'keep');
    render(<Notes />);

    const checkbox = screen.getByRole('checkbox', {
      name: 'Mark Building real-time phone-fraud detection as discussed',
    });
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(JSON.parse(window.localStorage.getItem(STAR_NOTES_STORAGE_KEY) || '[]')).toContain(
      'seniorsafe-fraud-platform'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Clear discussed' }));
    expect(checkbox).not.toBeChecked();
    expect(window.localStorage.getItem(STAR_NOTES_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem('unrelated')).toBe('keep');
  });

  it('places backend-ranked cards first', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        query: 'Tell me about creative discipline',
        results: [{ id: 'original-music-recognition', score: 0.91 }],
      }),
    } as Response);
    render(<Notes />);

    fireEvent.change(screen.getByLabelText('Interview question'), {
      target: { value: 'Tell me about creative discipline' },
    });
    act(() => jest.advanceTimersByTime(500));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(within(screen.getAllByRole('article')[0]).getByText('Sustaining original music production')).toBeVisible()
    );
    expect(screen.getByText('Ranked all 65 cards by semantic similarity.')).toBeVisible();
  });
});
