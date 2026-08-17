import { act, fireEvent, render, screen } from '@testing-library/react';

import ResumeVoiceAgent from './ResumeVoiceAgent';

jest.mock('./ResumeVoiceAgentPanel', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ autoStart }: { autoStart?: boolean }) =>
      React.createElement('button', { type: 'button' }, 'START'),
  };
});

const mockFetch = jest.fn();

beforeEach(() => {
  mockFetch.mockReset();
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ visible: true }),
  });
  global.fetch = mockFetch as unknown as typeof fetch;
});

test('renders an explicit, non-autoplaying voice-agent entry point', async () => {
  render(<ResumeVoiceAgent />);

  expect(await screen.findByRole('button', { name: 'START' })).toBeInTheDocument();
  expect(screen.getByText('microphone permission requested')).toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('places the desktop-only scroll prompt at the end of the voice-agent section', async () => {
  render(<ResumeVoiceAgent />);

  const card = await screen.findByTestId('resume-voice-agent-card');
  const scrollPrompt = screen.getByText('↓ scroll down ↓');

  expect(scrollPrompt).toHaveClass('hidden', 'md:block');
  expect(scrollPrompt.closest('section')).toBe(card.closest('section'));
  expect(card.compareDocumentPosition(scrollPrompt) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test('keeps the voice controls inside the fixed-size card', async () => {
  render(<ResumeVoiceAgent />);
  const card = await screen.findByTestId('resume-voice-agent-card');

  expect(card).toHaveClass('h-[32rem]');
  expect(card).not.toHaveClass('border');
  expect(card.className).not.toContain('bg-');
  expect(card.className).not.toContain('shadow');
  expect(card.closest('section')).toHaveClass('resume-section-surface');
  expect(card.closest('section')?.nextElementSibling).toHaveClass('h-40');
  fireEvent.click(screen.getByRole('button', { name: 'START' }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(await screen.findByRole('button', { name: 'START' })).toBeInTheDocument();
  expect(screen.getByTestId('resume-voice-agent-card')).toBe(card);
});

test('renders no voice-agent section when the server hides it', async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ visible: false }),
  });

  render(<ResumeVoiceAgent />);

  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(screen.queryByTestId('resume-voice-agent-card')).not.toBeInTheDocument();
});

test('fails open when the visibility check is unavailable', async () => {
  mockFetch.mockRejectedValue(new Error('network unavailable'));

  render(<ResumeVoiceAgent />);

  expect(await screen.findByRole('button', { name: 'START' })).toBeInTheDocument();
});
