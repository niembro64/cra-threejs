# Eric Niemeyer — Technical Engineering Practices

## Machine learning system design

Eric treats machine learning as an end-to-end engineering system: define the decision, design labels, build data tools, select an architecture, train and validate under realistic noise, choose operating thresholds, deploy inference, observe failures, and improve the dataset. He has applied this process to fraud-text classification, audio and laughter detection, image tasks, game agents, and semantic retrieval. He is comfortable with MLPs, RNNs, CNNs, transformers, attention masks, tokenizers, embeddings, supervised learning, reinforcement learning, self-play, and genetic algorithms.

He uses MLflow to retain architectures, hyperparameters, optimizers, and training or validation curves across experiments. Patience-based early stopping is checked against the visible validation plateau. This keeps model selection, stopping decisions, and comparisons reproducible.

## Retrieval-augmented generation

Eric's RAG work uses embeddings to map document passages and incoming questions into a shared vector space. PostgreSQL and pgvector retrieve semantically relevant passages, while diversity selection reduces redundant results and conversation state softly favors new evidence without discarding previously retrieved facts. The language or voice model receives the selected public excerpts and is instructed to answer only from them. This is conventional contextual RAG, not a full RAPTOR hierarchy of recursively summarized clusters.

## Full-stack and mobile architecture

Eric has built production systems with React, React Native, Vue, Angular, Node, Express, Laravel, Django, Flask, C#, Python, PHP, TypeScript, JavaScript, MongoDB, MySQL, PostgreSQL, SQLite, AWS, EC2, S3, Docker, and Git-based release workflows. He selects architecture around the product: on-device inference when latency and independence matter, web portals for administrative workflows, APIs and databases for shared state, and native integrations when mobile hardware or store delivery requires them.

## Real-time media and signal processing

Eric works with FFmpeg, FFTs, MFCCs, filtering, spectra, audio classification, recording, mixing, and video composition. Audience AI combines live microphone analysis with layered sound playback and a multi-stage export pipeline. His performance technology work matched live and prerecorded vocal levels, switched modes during shows, and delivered distinct in-ear monitor mixes. These examples connect DSP concepts with latency, reliability, and human-facing experience.

## Simulation, games, and performance

Eric builds custom game and simulation systems in C++, JavaScript, TypeScript, Phaser, Three.js, React Native Game Engine, Unity, and HTML Canvas. His C++ Annihilation++ engine combines deterministic lockstep, fixed-point cross-architecture math, state-hash verification, physics, terrain-aware A*, fog of war, levels of detail, spatial grids, and cross-CPU validation. Smaller projects explore collision detection, pathfinding, genetic algorithms, neural networks, embeddings, game theory, rendering, and interaction design.

## Industrial and embedded perspective

Eric's engineering range includes PLC-connected manufacturing systems and hardware such as Raspberry Pi, ESP32, Arduino, and microcontrollers. He understands that software touching physical processes must account for equipment ownership, legacy interfaces, traceability, timing, and operational risk. His architecture experience spans x86-64, ARM64, MIPS, and LR35902-class targets, from desktop simulation to embedded and retro-computing experiments.
