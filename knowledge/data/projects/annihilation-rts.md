# Annihilation++ RTS / Budget Annihilation

- Category: Video Games
- Type: Cross-architecture (CPU) desktop game; 3D physics-based real-time strategy
- Public URL: https://games.niemo.io/budget-annihilation
- Implementation language: C++
- Platform: desktop, with support for different CPU architectures
- Commercial status: intended for Steam/commercial release, but do not describe it as already released unless a current public store listing confirms that

## What Eric built

Annihilation++ is a cross-architecture desktop game written in C++. It is a full-3D, physics-first real-time strategy project inspired by Total Annihilation. Players build factories, manage energy and metal, place structures, and command armies across terrain. Units are governed by force, mass, and momentum rather than merely sliding along predefined grid steps.

Its most technically distinctive feature is a deterministic C++ simulation designed to execute consistently across different CPU architectures. Terrain-aware pathfinding, fog of war, resource systems, unit behavior, building placement, and physics all operate around that simulation core. Multiplayer communication includes WebRTC connections and short-lived game lobbies around the lockstep session.

Eric built the game engine himself in C++ rather than relying on an existing engine. The project is designed around native desktop performance, low-level control of simulation state, and a commercial/Steam-oriented release path.

## Simulation and physics details

The simulation aims for F=MA-style behavior. Units have mass and apply forces to move. Friction is modeled across different media: ground, air, and water. Units can be partially in more than one medium, so locomotion and friction can be applied fractionally. For example, a unit that is half in air and half in water can receive partial air locomotion/friction and partial water behavior, creating smoother transitions between media.

Movement is not a purely graphical effect. The game models position, velocity, rotation, and rotational velocity. The simulation tick can run at a lower frequency than rendering, while the client interpolates toward smooth presentation using position/velocity and exponential moving averages.

Pathfinding is terrain-aware and time-aware. Instead of treating A* as only shortest-distance search, Eric uses heuristics that account for traversal cost. A unit may choose to go around a hill instead of directly over it when climbing would be slower because of mass, slope, or locomotion limitations.

## Deterministic lockstep networking

Earlier multiplayer work used an authoritative-server pattern where player commands went to a single source-of-truth simulation and world state came back to clients for rendering. For Annihilation++, Eric moved toward deterministic lockstep: every client runs the same simulation and must arrive at the same state.

The lockstep design is tested across Ubuntu Linux, Windows 10/11, and macOS, including x86-64 and ARM-class CPU architectures. Because normal C++ floating-point math can compile differently across CPUs and operating systems, the project treats cross-architecture math consistency as a core design problem. Tiny multiply/add differences can eventually desynchronize the simulation.

Eric uses fixed-point math where deterministic cross-architecture numerical behavior is required. That choice turns precision and range into explicit design tradeoffs while avoiding CPU-specific floating-point drift in shared simulation state.

To verify determinism, Eric starts games across multiple machines and compares hashes of game state at intervals. Matching hashes across operating systems and architectures indicate that the simulation state is still identical.

## Rendering, LOD, and performance

The game uses native low-level rendering rather than a web or high-level game-engine renderer. Performance is a central design constraint because the world can be large, the player may zoom from close unit inspection to a full-map view, and deterministic lockstep requires the full simulation to continue even for entities hidden behind fog of war.

Eric uses levels of detail for units, trees, grass, and other visible objects. Larger units can stay at a higher LOD from farther away, while small nearby units may drop to lower detail sooner because their screen size makes high detail irrelevant. This keeps rendering performance more uniform across zoom levels.

The project avoids unnecessary all-entity checks. Projectiles, explosions, collisions, hit boxes, and laser/beam effects use spatial grids so the simulation checks only nearby grid cells instead of every entity against every other entity. Laser-style weapons also have bounded terminus behavior for performance and gameplay clarity.

## Design tradeoffs

The project requires continual tradeoffs among artistic feel, physical plausibility, deterministic simulation, and performance. Weapon effects must look interesting and make sense in a futuristic RTS while remaining cheap enough for many simultaneous projectiles and explosions. Pathfinding, collision, rendering LOD, fog-of-war visibility, and full-map simulation all have to agree without breaking lockstep determinism.

## Important classification

Annihilation++ is a desktop game, not a web game. The public portfolio URL is a project presentation surface; it must not be used to infer that the game itself is implemented for a browser. Do not describe the game as being written in Vue, TypeScript, Three.js, Rust, WebAssembly, or PeerJS, and do not characterize it as a mobile or browser game.

## What it demonstrates

This is a systems-heavy C++ project: desktop game architecture, custom engine work, deterministic state, cross-CPU consistency, lockstep networking, 3D simulation, resource economy, unit data, building placement, physics, pathfinding, visibility, rendering LOD, spatial partitioning, projectile systems, and UI must all agree. It is strong evidence of Eric’s systems-programming work and his interest in finite, explicit state and reproducible simulation behavior. It should not be represented as a finished commercial game or an already-published Steam title unless current public evidence confirms that status.
