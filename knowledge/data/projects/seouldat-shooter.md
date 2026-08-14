# Seouldat Shooter

- Category: Video Games
- Type: online multiplayer arena shooter
- Dates: 2024–ongoing
- Public URL: https://seouldat.niemo.io
- Declared stack: Phaser, Express, Socket.IO
- Platform: desktop web; keyboard and mouse

## What Eric built

Seouldat is a browser-based multiplayer arena shooter designed around fast keyboard movement and mouse aiming. A player can open a second tab or invite a friend and fight online. It includes original game audio and is intentionally marked as desktop-only.

The portfolio specifically calls out an authoritative server, client-side prediction, and server-client reconciliation. In that networking model the server owns the accepted game state, while each client predicts its own movement immediately to hide network delay. When authoritative updates arrive, reconciliation corrects divergence. Those techniques are central to responsive real-time multiplayer and are more demanding than simply broadcasting positions between browsers.

## Published experience observed August 13, 2026

The public URL responded, but the inspected browser frame remained blank after loading, so no additional gameplay claims can be grounded in the current landing screen. This may be a WebGL/game startup issue, a server-session requirement, or a transient deployment problem; the observation alone does not establish the cause. The project video and canonical niemo.io metadata therefore remain the authoritative public description.

## What it demonstrates

Seouldat demonstrates online game networking, real-time input, prediction under latency, correction of client/server disagreement, Phaser gameplay, a Node/Express service, Socket.IO messaging, and desktop shooter controls. It is a useful example when discussing Eric’s experience with WebSockets and real-time distributed state.

