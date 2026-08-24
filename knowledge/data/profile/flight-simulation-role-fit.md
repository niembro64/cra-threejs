# Eric Niemeyer - Flight Simulation Engineering Relevance

## Low-level software and computer architecture

Eric's preparation for simulation engineering combines software, computer hardware, mathematics, and signal processing. He programs in C, C++, Assembly, C#, Java, and Python and understands the path from high-level code through machine instructions and CPU behavior. His computer-engineering background includes digital design, embedded systems, microcontrollers, communications, operating systems, and work across x86-64, ARM64, MIPS, and LR35902-class architectures.

This background is directly relevant when simulation software must behave predictably across operating systems, processor architectures, timing constraints, and interfaces with other systems.

## Physics, motion, and numerical simulation

Eric built Annihilation++, a native C++ real-time strategy game and custom desktop engine whose simulation uses position, velocity, acceleration, rotation, rotational velocity, mass, force, torque, momentum, and friction. Units transition fractionally among ground, water, and air behavior. Rendering can interpolate between lower-rate simulation updates so presentation remains smooth while authoritative state remains explicit.

The engine uses deterministic lockstep for multiplayer. It uses fixed-point math where cross-architecture consistency matters, runs the same simulation on every participant, and compares periodic hashes of game state across Windows, Linux, and macOS machines on x86-64 and ARM-class CPUs. This work required Eric to reason about numerical representation, state reproducibility, timing, networking, performance, and debugging across architectures.

## Simulation performance and algorithms

Annihilation++ uses terrain-aware A-star pathfinding based on travel cost, rendering levels of detail, and spatial grids for projectiles, explosions, hit boxes, and collisions. Those choices reduce all-entity interaction work while allowing the full deterministic world to continue behind fog of war. Eric continually balances physical plausibility, deterministic correctness, visual quality, and computation cost.

His collision-detection lab isolates another simulation concern: discrete frame updates can let fast objects tunnel through a boundary when line-side tests observe only separated samples. He made that failure reproducible and compared it with odd-even ray-intersection containment. The experiment demonstrates his habit of exposing a simulation limitation visually, varying the relevant parameters, and comparing algorithms under the same conditions.

## Signals, DSP, and communications

Eric's signal-processing foundation comes from computer-engineering coursework, communications study, music production, and deployed audio software. He works with Fourier transforms, FFT-derived spectra, MFCCs, filtering, frequency buckets, loudness, and temporal signals. Audience AI used live microphone data, neural audio classification, and a responsive artificial-audience system. His live-performance technology also required low-latency routing, level matching, switching, and distinct monitoring mixes.

This experience supports reasoning about sampled signals, filtering, latency, noise, state over time, and the relationship between mathematical models and observable system behavior.

## Integrated systems and test environments

At Rockwell Automation and Maverick Technologies, Eric built manufacturing execution software joining PLCs, robotic systems, torque tools, barcode scans, operator HMIs, databases, quality workflows, and ERP systems. At Lucid Motors, an MES workflow could begin with a scanned part, issue instructions to a torque tool, capture the tool's actual completion values, persist traceability, and request operator confirmation. This is closely related to software that must monitor messages, model state transitions, coordinate hardware and software boundaries, and support testing in an integrated lab.

Eric also worked across controls engineers, QA engineers, operators, application developers, database teams, client leadership, and business-system owners. He used requirements diagrams, whiteboards, written approvals, Jira, OneNote records, testing, and direct implementation to turn physical processes into functioning software.

## Software architecture and delivery

SeniorSafe is Eric's largest professional integrated system. It combines two live audio sources, streaming services, speech transcription, Python machine-learning services, roughly fifty risk classifiers, APIs, databases, external metadata, pgvector retrieval, mobile clients, and a voice agent. Eric trained and deployed the models, built the retrieval routes, and connected the system so classifications and relevant context could support a live intervention workflow.

Across these systems, Eric develops architecture, interfaces, algorithms, data models, test workflows, documentation, and production code. He has worked in Agile teams with Jira as well as projects requiring explicit waterfall-style change control, and he is accustomed to supporting concurrent client activities while keeping ownership, requirements, and integration evidence visible.
