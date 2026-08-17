# Annihilation++ RTS / Budget Annihilation

- Category: Video Games
- Type: Cross-architecture (CPU) desktop game; 3D physics-based real-time strategy
- Public URL: https://games.niemo.io/budget-annihilation
- Implementation language: C++
- Platform: desktop, with support for different CPU architectures

## What Eric built

Annihilation++ is a cross-architecture desktop game written in C++. It is a full-3D, physics-first real-time strategy project inspired by Total Annihilation. Players build factories, manage energy and metal, place structures, and command armies across terrain. Units are governed by force, mass, and momentum rather than merely sliding along predefined grid steps.

Its most technically distinctive feature is a deterministic C++ simulation designed to execute consistently across different CPU architectures. Terrain-aware pathfinding, fog of war, resource systems, unit behavior, building placement, and physics all operate around that simulation core.

## Important classification

Annihilation++ is a desktop game, not a web game. The public portfolio URL is a project presentation surface; it must not be used to infer that the game itself is implemented for a browser. Do not describe the game as being written in Vue, TypeScript, Three.js, Rust, WebAssembly, or PeerJS, and do not characterize it as a mobile or browser game.

## What it demonstrates

This is a systems-heavy C++ project: desktop game architecture, deterministic state, cross-CPU consistency, 3D simulation, resource economy, unit data, building placement, physics, pathfinding, visibility, and UI must all agree. It is strong evidence of Eric’s systems-programming work and his interest in finite, explicit state and reproducible simulation behavior. It should not be represented as a finished commercial game.
