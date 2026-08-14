import { fireEvent, render, screen } from '@testing-library/react';

import ResumeVoiceAgent from './ResumeVoiceAgent';

jest.mock('./ResumeVoiceAgentPanel', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ autoStart }: { autoStart?: boolean }) =>
      React.createElement('button', { type: 'button' }, autoStart ? 'START AGAIN' : 'START'),
  };
});

test('renders an explicit, non-autoplaying voice-agent entry point', () => {
  render(<ResumeVoiceAgent />);

  expect(screen.getByRole('button', { name: 'START VOICE AGENT' })).toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('keeps the voice controls inside the fixed-size card', async () => {
  render(<ResumeVoiceAgent />);
  const card = screen.getByTestId('resume-voice-agent-card');

  expect(card).toHaveClass('h-[32rem]');
  fireEvent.click(screen.getByRole('button', { name: 'START VOICE AGENT' }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(await screen.findByRole('button', { name: 'START AGAIN' })).toBeInTheDocument();
  expect(screen.getByTestId('resume-voice-agent-card')).toBe(card);
});
