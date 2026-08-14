# Annihilation++ RTS / Budget Annihilation

- Category: Video Games
- Type: 3D physics-based real-time strategy game
- Dates: 2025–ongoing
- Public URL: https://games.niemo.io/budget-annihilation
- Declared stack: Vue, TypeScript, Three.js, Rust, WebAssembly, PeerJS
- Platforms: desktop and mobile web

## What Eric built

Annihilation++ is a full-3D, physics-first real-time strategy project inspired by Total Annihilation. Players build factories, manage energy and metal, place structures, and command armies across terrain. Units are governed by force, mass, and momentum rather than merely sliding along predefined grid steps.

Its most technically distinctive claim is cross-architecture deterministic lockstep. Instead of continuously streaming every object’s authoritative position, multiplayer peers execute the same simulation from a shared command stream. A Rust simulation core compiled to WebAssembly helps keep numerical and state behavior consistent across browsers and CPU architectures, while PeerJS supplies peer connectivity. Terrain-aware pathfinding and fog of war add classic RTS systems around that core.

## Published experience observed August 13, 2026

The live “Budget Annihilation” page offers hosting and joining online games through lobby codes and shows available lobbies. It also contains an Entity Lab for inspecting units and buildings. Visible blueprints expose fields such as build cost, energy and metal behavior, hit points, mass, footprint, combat values, turrets, and placement rules. This lab makes the data-driven entity system inspectable before a match.

## What it demonstrates

This is a systems-heavy project: 3D rendering, simulation architecture, networking, deterministic state, resource economy, unit data, building placement, physics, pathfinding, visibility, and UI must all agree. It is strong evidence of Eric’s interest in finite, explicit state and reproducible simulation behavior. The project is ongoing, so unfinished content or changing balance should not be represented as a final commercial game.

