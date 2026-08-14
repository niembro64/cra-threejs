import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import type { Callbacks } from '@elevenlabs/react';

type TranscriptEntry = {
  id: number;
  role: 'user' | 'agent';
  message: string;
};

type MessagePayload = Parameters<NonNullable<Callbacks['onMessage']>>[0];

type ResumeVoiceAgentPanelProps = {
  autoStart?: boolean;
};

const suggestedQuestions = [
  'What machine learning systems has Eric built?',
  'Tell me about Eric’s engineering leadership experience.',
  'Which projects best demonstrate Eric’s full-stack skills?',
];

const ResumeVoiceConversation: React.FC<ResumeVoiceAgentPanelProps> = ({ autoStart = false }) => {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [error, setError] = useState('');
  const [agentAvailable, setAgentAvailable] = useState<boolean | null>(null);
  const autoStartAttemptedRef = useRef(false);

  const onMessage = useCallback((payload: MessagePayload) => {
    const message = payload.message.trim();
    if (!message) return;
    setTranscript((current) => [
      ...current,
      {
        id: payload.event_id ?? Date.now() + current.length,
        role: payload.role,
        message,
      },
    ]);
  }, []);

  const conversation = useConversation({
    onMessage,
    onError: (message) => setError(message || 'The voice connection encountered an error.'),
    onConnect: () => setError(''),
  });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/resume-agent/status/')
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to check the voice agent status.');
        return response.json();
      })
      .then((payload: { available?: boolean }) => {
        if (!cancelled) setAgentAvailable(Boolean(payload.available));
      })
      .catch(() => {
        if (!cancelled) setAgentAvailable(false);
      });
    return () => {
      cancelled = true;
      void conversation.endSession();
    };
  }, []);

  const startConversation = useCallback(async () => {
    setError('');
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('This browser does not provide microphone access.');
      }
      const permissionStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      permissionStream.getTracks().forEach((track) => track.stop());

      const response = await fetch('/api/resume-agent/session/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const payload = (await response.json()) as { token?: string; detail?: string };
      if (!response.ok || !payload.token) {
        throw new Error(payload.detail || 'Unable to start the voice agent.');
      }
      await conversation.startSession({ conversationToken: payload.token, connectionType: 'webrtc' });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to start the voice agent.');
    }
  }, [conversation]);

  useEffect(() => {
    if (!autoStart || autoStartAttemptedRef.current) return;

    const startTimer = window.setTimeout(() => {
      if (autoStartAttemptedRef.current) return;
      autoStartAttemptedRef.current = true;
      void startConversation();
    }, 0);

    return () => window.clearTimeout(startTimer);
  }, [autoStart, startConversation]);

  const submitTypedMessage = (event: FormEvent) => {
    event.preventDefault();
    const message = typedMessage.trim();
    if (!message || conversation.status !== 'connected') return;
    conversation.sendUserMessage(message);
    setTypedMessage('');
  };

  const stateLabel = useMemo(() => {
    if (conversation.status === 'connecting') return 'Connecting…';
    if (conversation.status === 'error') return 'Error';
    if (conversation.status !== 'connected') return 'Ready';
    if (conversation.isMuted) return 'Muted';
    return conversation.isSpeaking ? 'Agent speaking' : 'Listening';
  }, [conversation.isMuted, conversation.isSpeaking, conversation.status]);

  const connected = conversation.status === 'connected';
  const busy = conversation.status === 'connecting';

  const helperMessage = useMemo(() => {
    if (agentAvailable === false) return 'The voice agent is temporarily unavailable.';
    if (error) return error;
    if (conversation.status === 'connecting') return 'Requesting microphone access and opening a secure session…';
    if (conversation.status === 'error') return 'The voice connection encountered an error. Please start again.';
    if (connected) return 'Your microphone is live. Speak naturally or type a question below.';
    return 'Start again whenever you are ready.';
  }, [agentAvailable, connected, conversation.status, error]);

  return (
    <div className="flex h-full min-h-0 flex-col text-left">
      <header className="flex shrink-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="pixel-font text-xs uppercase tracking-[0.25em] text-fuchsia-300">Interactive résumé</p>
          <h2 id="resume-voice-agent-heading" className="pixel-font mt-1 text-2xl text-white sm:text-3xl">
            ASK MY RÉSUMÉ
          </h2>
        </div>
        <span
          className="pixel-font mt-1 flex shrink-0 items-center gap-2 text-xs text-blue-200 sm:text-sm"
          aria-live="polite"
        >
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              connected
                ? conversation.isSpeaking
                  ? 'bg-fuchsia-300'
                  : conversation.isMuted
                    ? 'bg-amber-300'
                    : 'animate-pulse bg-green-300'
                : busy
                  ? 'animate-pulse bg-blue-300'
                  : 'bg-white/30'
            }`}
          />
          {stateLabel}
        </span>
      </header>

      <div className="mt-3 flex h-11 shrink-0 items-center gap-2">
        {!connected ? (
          <button
            type="button"
            onClick={() => void startConversation()}
            disabled={busy || agentAvailable === false}
            className="pixel-font h-11 border-2 border-fuchsia-300 px-4 text-sm text-white transition hover:bg-fuchsia-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:text-base"
          >
            {conversation.status === 'connecting' ? 'CONNECTING…' : 'START AGAIN'}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => void conversation.endSession()}
              className="pixel-font h-11 border-2 border-red-300 px-4 text-sm text-white transition hover:bg-red-300 hover:text-black sm:px-6 sm:text-base"
            >
              END
            </button>
            <button
              type="button"
              onClick={() => conversation.setMuted(!conversation.isMuted)}
              className="pixel-font h-11 border border-blue-300 px-4 text-sm text-blue-100 hover:bg-blue-300/20 sm:text-base"
            >
              {conversation.isMuted ? 'UNMUTE' : 'MUTE'}
            </button>
          </>
        )}
      </div>

      <div
        className={`mt-2 h-11 shrink-0 overflow-y-auto border px-3 py-2 text-xs leading-snug sm:text-sm ${
          error || agentAvailable === false
            ? 'border-red-300/40 bg-red-300/10 text-red-100'
            : 'border-white/10 bg-white/[0.03] text-blue-100/65'
        }`}
        role={error ? 'alert' : 'status'}
      >
        {helperMessage}
      </div>

      <div className="mt-2 flex shrink-0 gap-2 overflow-x-auto pb-1">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            type="button"
            disabled={!connected}
            onClick={() => conversation.sendUserMessage(question)}
            className="min-w-[12rem] border border-blue-300/30 bg-blue-300/5 px-3 py-2 text-left text-xs leading-snug text-blue-100 transition hover:border-blue-300 hover:bg-blue-300/15 disabled:cursor-not-allowed disabled:opacity-30 sm:min-w-0 sm:flex-1"
          >
            {question}
          </button>
        ))}
      </div>

      <div
        className="mt-2 min-h-0 flex-1 space-y-2 overflow-y-auto border border-white/10 bg-black/40 p-3"
        aria-live="polite"
      >
        {transcript.length === 0 ? (
          <p className="text-sm text-white/45">Live captions will appear here.</p>
        ) : (
          transcript.map((entry) => (
            <div
              key={`${entry.id}-${entry.role}`}
              className={`text-sm leading-relaxed ${entry.role === 'user' ? 'text-blue-100' : 'text-fuchsia-100'}`}
            >
              <span className="pixel-font mr-2 text-xs uppercase text-white/45">
                {entry.role === 'user' ? 'You' : 'Agent'}
              </span>
              <span>{entry.message}</span>
            </div>
          ))
        )}
      </div>

      <form onSubmit={submitTypedMessage} className="mt-2 flex h-11 shrink-0 gap-2">
        <label htmlFor="resume-agent-message" className="sr-only">
          Type a résumé question
        </label>
        <input
          id="resume-agent-message"
          value={typedMessage}
          onChange={(event) => {
            setTypedMessage(event.target.value);
            if (connected) conversation.sendUserActivity();
          }}
          disabled={!connected}
          placeholder={connected ? 'Type a question…' : 'Waiting for a voice session…'}
          className="min-w-0 flex-1 border border-white/20 bg-black/50 px-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-300 disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={!connected || !typedMessage.trim()}
          className="pixel-font border border-blue-300 px-3 text-sm text-blue-100 hover:bg-blue-300 hover:text-black disabled:opacity-35 sm:px-4"
        >
          SEND
        </button>
      </form>

      <p className="mt-2 shrink-0 text-[0.65rem] leading-tight text-white/35 sm:text-xs">
        AI voice by ElevenLabs · Don&apos;t share sensitive personal information.
      </p>
    </div>
  );
};

const ResumeVoiceAgentPanel: React.FC<ResumeVoiceAgentPanelProps> = (props) => (
  <ConversationProvider>
    <ResumeVoiceConversation {...props} />
  </ConversationProvider>
);

export default ResumeVoiceAgentPanel;
