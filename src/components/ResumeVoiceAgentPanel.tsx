import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import type { Callbacks } from '@elevenlabs/react';
import ResumeAgentWaveform from './ResumeAgentWaveform';
import PixelArtText from './PixelArtText';
import { decodePcm16Base64 } from '../utils/audioWaveform';
import { readJsonResponse } from '../utils/httpJson';

type TranscriptEntry = {
  id: number;
  role: 'user' | 'agent';
  message: string;
};

type MessagePayload = Parameters<NonNullable<Callbacks['onMessage']>>[0];
type AudioPayload = Parameters<NonNullable<Callbacks['onAudio']>>[0];

type ResumeVoiceAgentPanelProps = {
  autoStart?: boolean;
};

const ResumeVoiceConversation: React.FC<ResumeVoiceAgentPanelProps> = ({ autoStart = false }) => {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState('');
  const [agentAvailable, setAgentAvailable] = useState<boolean | null>(null);
  const autoStartAttemptedRef = useRef(false);
  const agentAudioSamplesRef = useRef(new Float32Array());
  const agentAudioReceivedAtRef = useRef(0);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

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

  const onAudio = useCallback((base64Audio: AudioPayload) => {
    agentAudioSamplesRef.current = decodePcm16Base64(base64Audio);
    agentAudioReceivedAtRef.current = performance.now();
  }, []);

  const conversation = useConversation({
    onMessage,
    onAudio,
    onError: (message) => setError(message || 'The voice connection encountered an error.'),
    onConnect: () => setError(''),
  });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/resume-agent/status/')
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to check the voice agent status.');
        return readJsonResponse<{ available?: boolean }>(
          response,
          'The voice agent returned an unexpected status response.'
        );
      })
      .then((payload) => {
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
    agentAudioSamplesRef.current = new Float32Array();
    agentAudioReceivedAtRef.current = 0;
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('This browser does not provide microphone access.');
      }
      const permissionStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      permissionStream.getTracks().forEach((track) => track.stop());

      const response = await fetch('/api/resume-agent/session/', {
        method: 'POST',
        cache: 'no-store',
        credentials: 'same-origin',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const payload = await readJsonResponse<{ token?: string; detail?: string }>(
        response,
        'The voice agent could not connect to the résumé service. Please refresh and try again.'
      );
      if (!response.ok || !payload.token) {
        throw new Error(payload.detail || 'Unable to start the voice agent.');
      }
      await conversation.startSession({ conversationToken: payload.token, connectionType: 'webrtc' });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to start the voice agent.');
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } finally {
      agentAudioSamplesRef.current = new Float32Array();
      agentAudioReceivedAtRef.current = 0;
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

  const stateLabel = useMemo(() => {
    if (conversation.status === 'connecting') return 'Connecting…';
    if (conversation.status === 'error') return 'Error';
    if (conversation.status !== 'connected') return 'Ready';
    return conversation.isSpeaking ? 'Agent speaking' : 'Listening';
  }, [conversation.isSpeaking, conversation.status]);

  const connected = conversation.status === 'connected';
  const busy = conversation.status === 'connecting';

  useEffect(() => {
    if (connected || transcript.length === 0) return;
    const container = transcriptContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [connected, transcript.length]);

  return (
    <div className="flex h-full min-h-0 flex-col text-left">
      <header className="flex shrink-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="pixel-font text-xs uppercase tracking-[0.25em] text-fuchsia-300">Interactive résumé</p>
          <h2 id="resume-voice-agent-heading" className="sr-only">
            ASK MY RESUME
          </h2>
          <div className="mt-1 w-52 sm:w-72">
            <PixelArtText pixelColor="#fff" text=" ASK MY RESUME " totalHorzPixels={78} />
          </div>
        </div>
        <span
          className="pixel-font mt-1 flex shrink-0 items-center gap-2 text-xs text-blue-200 sm:text-sm"
          aria-live="polite"
        >
          {stateLabel}
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              connected
                ? conversation.isSpeaking
                  ? 'bg-fuchsia-300'
                  : 'animate-pulse bg-green-300'
                : busy
                  ? 'animate-pulse bg-blue-300'
                  : 'bg-white/30'
            }`}
          />
        </span>
      </header>

      <div className="mt-3 flex h-11 shrink-0 items-center">
        {connected ? (
          <button
            type="button"
            onClick={() => void stopConversation()}
            className="pixel-font h-11 bg-red-300/15 px-6 text-sm text-red-100 transition hover:bg-red-300 hover:text-black sm:text-base"
          >
            STOP
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void startConversation()}
            disabled={busy || agentAvailable === false}
            className="pixel-font h-11 bg-fuchsia-300/15 px-6 text-sm text-fuchsia-100 transition hover:bg-fuchsia-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
          >
            {busy ? 'CONNECTING…' : 'START'}
          </button>
        )}
      </div>

      {connected ? (
        <div className="mt-3 flex min-h-0 flex-1 items-center">
          <ResumeAgentWaveform
            samplesRef={agentAudioSamplesRef}
            receivedAtRef={agentAudioReceivedAtRef}
          />
        </div>
      ) : (
        <div
          ref={transcriptContainerRef}
          className="mt-2 min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-4"
          aria-label="Conversation history"
        >
          {(error || agentAvailable === false) && (
            <p className="text-sm text-red-200" role="alert">
              {error || 'The voice agent is temporarily unavailable.'}
            </p>
          )}
          {transcript.length > 0 && (
            <div className="space-y-2" role="list">
              {transcript.map((entry) => (
                <div
                  key={`${entry.id}-${entry.role}`}
                  className={`flex ${entry.role === 'user' ? 'justify-end pr-1' : 'justify-start pl-1'}`}
                  role="listitem"
                >
                  <div
                    className={`resume-chat-bubble text-[0.95rem] leading-snug sm:text-base ${
                      entry.role === 'user' ? 'resume-chat-bubble--user' : 'resume-chat-bubble--agent'
                    }`}
                  >
                    <span className="sr-only">
                      {entry.role === 'user' ? 'You' : 'Agent'}
                      {': '}
                    </span>
                    <span>{entry.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ResumeVoiceAgentPanel: React.FC<ResumeVoiceAgentPanelProps> = (props) => (
  <ConversationProvider>
    <ResumeVoiceConversation {...props} />
  </ConversationProvider>
);

export default ResumeVoiceAgentPanel;
