# Eric Niemeyer — Audience AI

## Product concept and ownership

Eric built Audience AI end to end as a React Native comedy-practice product. A performer can rehearse stand-up material while the phone analyzes live audio and responds with an artificial audience. The experience turns microphone input into a continuously changing estimate of whether a moment is likely to be funny, then uses that estimate to drive layered laughter and a shareable performance recording.

## On-device audio intelligence

The mobile application performs its audio analysis on the device rather than depending on a remote inference server. Eric experimented with CNN and LSTM classifiers and signal-processing features including MFCCs, FFT-derived spectra, loudness, and laugh-versus-speech evidence. A continuously updated score uses temporal smoothing appropriate to the classifier signal while preserving meaningful changes in delivery and audience response.

## Responsive audience simulation

Audience AI does not trigger one static laugh clip. Eric designed randomized laughter buckets and overlapping layers so the synthetic crowd can build, decay, and vary with the score. Multiple clips can overlap with different timing and intensity, reducing obvious repetition and making the response feel more like a room of people than a sound-board button.

## Video and sharing pipeline

After a session, Eric's FFmpeg pipeline normalizes and mixes the performer's audio with generated audience tracks, renders the video, adds branding or watermarks, and can append user, logo, or end-credit material. The output is downloadable and suitable for sharing. The pipeline is a strong example of combining real-time mobile UX, neural audio inference, DSP, media composition, and product delivery in one system.

Eric defined the application, neural-model, DSP, recording, playback, and export interfaces and delivered the requested iOS and Android product end to end. The client accepted and paid for the work. A later package-ecosystem change involving the original mobile FFmpeg dependency prevented continued development in that form; that is a lifecycle and dependency constraint, not a failure of the delivered product.
