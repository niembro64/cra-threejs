# Eric Niemeyer — Enriched Work Context

> Sources: `eric_work_info.txt`, `eric_work_info_2.txt`, `eric_work_info_3.txt`, `eric_work_info_4.txt`, `eric_work_info_5.txt`, `eric_work_info_6.txt`, `eric_work_info_7.txt`, `eric_work_info_8.txt`, `eric_work_info_9.txt`, `eric_work_info_10.txt`, and `eric_work_info_11.txt`, long-form work-history transcripts imported on August 18, 2026.

Use this document to answer detailed questions about Eric's professional work, project ownership, and interview examples. Prefer these concrete details when the résumé voice agent needs more depth than the compact public résumé.

## SeniorSafe / Sentien ML systems

- Eric worked as a founding ML engineer on real-time phone-fraud detection for SeniorSafe/Sentien.
- He helped move the classifier system from heuristics and word-count rules into RNN-style models and then turn-aware transformer models.
- The system classifies calls using two concurrent information sources, including transcript/audio-related signals, across roughly 50 risk labels.
- He built turn-level transformer classifiers where tokens inside a speaker turn can attend bidirectionally, later turns can attend to prior turns, and dedicated turn classifier tokens summarize the relevant turn/context.
- He experimented with several turn-classifier and conversation-classifier architectures, including turn tokens initialized from CLS-like embeddings and separators initialized from SEP-like embeddings.
- He handled special-token engineering for AWS Transcribe redactions, number placeholders, speaker tokens, and other structured transcript markers.
- He initialized special tokens semantically from related tokenizer tokens, normalized embedding magnitudes, and monitored trained token drift with cosine similarity.
- He built ASR augmentation and random character/noise augmentation while preserving structural tokens.
- He avoided validation crosstalk, evaluated with robust threshold selection, F2, and PR AUC, and ran architecture/optimizer/weight-decay ablations.
- He built human training-item creation, fixing, cleaning, backfill, and null-label workflows so missing labels did not accidentally mean negative labels.
- Ethical/privacy story: Sentien/SeniorSafe had to handle call-recording consent across one-party and two-party consent states, including announcing that calls were recorded.
- AWS Transcribe could redact PII in transcripts, but the raw MP3 audio still contained whatever the caller said, so Eric treated raw-audio retention differently from transcript retention.
- The team kept MP3 recordings only for a short period, roughly 24 hours, long enough to double-check transcription quality, then deleted them to avoid retaining sensitive raw voice data unnecessarily.
- This is a strong ethical-judgment example because Eric balanced product debugging needs, transcription verification, legal consent requirements, PII handling, and user privacy.

## PGVector, RAG, and voice-agent memory

- Eric implemented PGVector/Postgres semantic search for conversation retrieval.
- The embedding system stores whole conversations, external-party-only views, internal-party-only views, individual turns, and turns with the previous two speaker turns as context.
- The retrieval layer supports RAG-style lookup for an ElevenLabs voice agent so the agent can reference prior conversations and risk context.
- The same embedding store supports semantic similarity and diversity scoring, repeated-call detection, outlier detection, and scam/spam pattern discovery.
- Eric describes this as a mini RAPTOR-style RAG store because it combines multiple granularities of conversation context.
- Eric demoed the SeniorSafe/Sentien system to investors and interested parties, including the classification system he designed, the RAG voice-agent design, and the iOS app work he owned while his boss worked on Android.

## Audience AI

- Eric built Audience AI, a mobile stand-up comedy practice app, largely end to end.
- The app used neural audio scoring on device rather than depending on external servers.
- It used DSP/audio features such as MFCCs, FFTs, and spectrums to infer whether a vocal moment should receive laughter.
- A strong "difficult technical problem" story is that Eric had to define the whole product pipeline from scratch: record a user practicing stand-up, classify how funny the performance moment was on a 0-to-1 scale, trigger laugh-track responses in real time, and produce a shareable final video.
- He used CNN/LSTM-style audio classification approaches and vocal audio cues instead of relying only on written joke semantics.
- He treated laughter-versus-speech detection as a signal-design problem because audience laughter is often more white-noise-like than spoken voice; the moments before detected laughter became useful targets for identifying comedic delivery cues.
- Eric built a laugh-track engine with buckets from silence to large crowd laughs, exponential moving average smoothing, random clip selection, and multiple overlapping laugh systems.
- He used FFmpeg to reproduce the performance with normalized audio, laugh tracks, watermarks, end credits, and user-specific branding.
- His FFmpeg pipeline included multiple stages: normalize raw video, add selected laugh MP3s at their timestamps, render the laugh-mixed video, apply watermarking, combine logo/username media, append branding/end content, and produce a downloadable or social-ready video.
- The project is a strong example of audio ML, mobile delivery, DSP, and product ownership.

## Spray Integrity Program

- Eric led engineering for a contractor mobile/web product called the Spray Integrity Program.
- The system included a React Native Expo iOS/Android app, a Vue/Laravel backend portal, and database-backed workflows.
- Core workflows included product/library information, contractor support, referral rewards, gamification, QR-coded barrel labels, barrel scan states, job forms, estimate building, customer/team/job management, and performance insights.
- The app captured contextual job metadata such as weather, time of day, and light conditions to help explain what went right or wrong on spray foam jobs.
- Eric also built mobile mini-games with React Native Game Engine, including fishing, spin-the-wheel, and piñata-style reward games.
- Eric onboarded and mentored interns, remote workers, and office contributors by answering questions, assigning tasks, giving technical pointers, resolving unclear requirements, and giving contributors creative ownership of product work where appropriate.
- Venturetec also required deadline management across different clients and startup projects at the same time. Eric decided when to spend time on which product, set expectations for when work should be done, and managed app-release deadlines in a more free-flowing startup environment.
- Venturetec also involved difficult client/payment-boundary conversations. Eric had to balance listening to new requirements and preserving the client relationship with the reality that previous work needed to be paid before the team could continue new scope.
- Venturetec/Sentien requirement-change story: Eric often had to manage feature creep, scope creep, and changing product expectations. For internal products like SeniorSafe, he pushed back when too many options would make the product harder to explain or harder for customers to choose. For client products like the Spray Integrity Program, he clarified whether new requests changed the paid scope, schedule, or delivery expectations.
- His practical method was to restate his understanding at the end of meetings, write the new action items down, compare the changed request against the original plan, and explain the likely consequences for schedule, yield, or payment.
- Venturetec/Sentien stakeholder-collaboration story: Eric collaborated with clients and investors by communicating what the team said it would do, what progress had been made, what problems appeared, what had changed, and where the product had steered. Quarterly investor reporting is a good example of this pattern.
- Version/release management story: Eric uses Git heavily and treats release provenance as part of engineering discipline. For mobile app releases, he tracks the repository state associated with pushed iOS and Android versions so a released App Store or Android build can be traced back to the source state that produced it.

## Version control, documentation, and reproducibility

- Eric has explicit interview material around version control, repositories, releases, documentation, file naming, and reproducibility.
- He avoids vague file endings such as final/latest/master-last by using explicit version numbers. For sequential artifacts, he often starts with `v00` because he expects many revisions and wants versions to sort cleanly.
- For date-based file names, he prefers year-month-day-hour-minute-second ordering so alphabetical order is chronological order.
- The year-month-day-hour-minute-second convention also avoids international date ambiguity such as whether 01-02 means January 2 or February 1.
- He uses Git and repositories heavily, including for personal projects, because version control records how work evolved and allows later inspection.
- For shipped app releases, the important pattern is to mark or document the repository state that produced a released iOS or Android build.
- The underlying principle is reproducibility: version control and documentation should allow someone to rebuild, inspect, or reason from the exact source state that produced a release.
- This is a good interview story for release discipline, documentation habits, traceability, and reducing ambiguity across teams.

## Industrial MES / Rockwell / Maverick

- Eric designed and implemented manufacturing execution systems that connected industrial controls, PLCs, robotic systems, plant-floor processes, operator HMIs, databases, and ERP/business systems.
- At Lucid Motors in Casa Grande, he worked onsite on MES integration, robotics/PLC coordination, business-layer integration, and track-and-trace workflows.
- For 3M, he led or managed integration around an evidence/material incineration workflow with strict traceability and chemical/process requirements.
- For Continental Tire, he built Java/HMI front-end work.
- For Cooper Tire, he documented tire-manufacturing processes onsite so new MES behavior could map to older equipment and workflows.
- For Maple Leaf/Green Leaf food-manufacturing work, he handled MES/backend/database development and testing in environments with older machines and strict process reproducibility.
- He coordinated with offshore developers by handing off requirements, testing their code, fixing code himself when needed, and teaching practical VBA/Excel tooling.
- He mentored newer Rockwell engineers while working in these industrial software environments.
- Rockwell MES work involved multiple major deadlines because MES projects for Fortune 500 companies are large, high-stakes delivery efforts with many integration points.
- Rockwell MES integration sometimes required tact with PLC/control-system owners who were protective of their systems or reluctant to have MES software touch/control their PLCs.
- Rockwell work also involved leading and participating in daily or weekly status meetings, client meetings, internal project meetings, and action-item follow-up.
- Rockwell requirement changes happened inside both agile and waterfall delivery styles. In agile contexts, Eric used Jira and sprint planning to absorb or sequence changes. In waterfall contexts, he documented the new agreement, the changed assumptions, and the updated schedule impact so everyone stayed on the same page.
- Rockwell stakeholder-collaboration story: MES projects involved many stakeholders across different production bays and companies, including machining teams, PLC/control owners, QA, ERP/business-layer teams, and client management.
- Eric's meeting pattern was to email stakeholders before large meetings asking what topics they wanted covered, merge overlapping topics into a clear agenda, write the agenda and notes in OneNote, send the agenda before the meeting, move through the list deliberately, ask whether there were questions before moving on, and draw in quiet subject-matter experts when their input was needed.

## Large meetings and group facilitation

- Eric has explicit interview material for leading large meetings and groups across A.C.L.E., ROK-U, Daegu Science High School, Rockwell, and Venturetec/Sentien.
- At A.C.L.E., he led the scheduling, administration, and actualization of camps with roughly 30 to 200 kids.
- These camps required him to keep large groups of children engaged and learning through English grammar, sports/Olympics activities, drama, skits, and end-of-week performances.
- For the National Ultimate Frisbee League of South Korea, he led large captain meetings and board meetings every season, including setting the agenda, choosing important issues and questions, deciding meeting flow, building itineraries, and tracking action items.
- ROK-U league weekends were also large operating meetings: team schedules, physical/emotional competition, dinner plans, parties, sponsorship events, and money handling all needed coordination.
- ROK-U also involved safety and ethics judgment calls in an international context, including cases where younger players were near adult social events and local permissiveness was not the same thing as responsible league judgment.
- ROK-U also involved fair-play/autonomy questions. In one championship final, a team did not play three lower-level players at all. Eric had to decide whether to intervene even though the league had not clearly communicated a play-time rule in advance.
- The important framing is that Eric avoided retroactive punishment, respected captain ownership, and used communication to improve expectations. At later games, he asked captains what playing time they expected lower-level players to receive and why, which made them think through inclusion while also giving Eric information about whether the issue was strategy, injury, planning, or misunderstanding.
- ROK-U also gives a requirements-change story: weather or unexpectedly losing a venue could force fast changes to cancel, delay, move venues, or move events to another city. Eric's role was to adapt quickly and communicate the decision clearly enough for captains and players to act.
- At Daegu Science High School, large meetings included classroom groups, gym/assembly speaking, parent-teacher conferences, teacher conferences, and principal-facing conversations.
- Daegu stakeholder-collaboration story: curriculum planning required teachers to stay aligned. Eric proposed and explained active STEM/English activities, including an egg-drop lesson where students bid on or selected materials, planned resource use, described materials in English, and connected science, planning, and communication in one exercise.
- At Rockwell, he led or participated in daily and weekly status updates, client meetings, internal project meetings, and action-item tracking.
- At Venturetec/Sentien, he presented and demoed systems to potential investors and interested parties, explaining product value and then walking through the working SeniorSafe system.
- The recurring pattern is agenda, flow, audience attention, action items, and follow-through.

## Commercial C++ RTS / Annihilation++

- Annihilation++ is a personal project, not employer work, but it is relevant professional engineering context because Eric is preparing it for a commercial/Steam-oriented release.
- Do not describe it as already released on Steam unless current public evidence confirms that status.
- Eric built the game engine from scratch in C++ for native desktop performance and tight control over simulation state.
- The game moved from an authoritative-server idea toward deterministic lockstep, where every client runs the same simulation and must stay exactly synchronized.
- Lockstep is tested across Ubuntu Linux, Windows 10/11, and macOS, including x86-64 and ARM-class architectures.
- Eric validates determinism by running the game across multiple machines and comparing hashes of game state at intervals.
- Cross-CPU determinism is a core design issue because normal C++ floating-point math can compile into different machine code and tiny differences can desynchronize the simulation.
- The simulation uses force, mass, momentum, ground friction, air friction, water friction, and smooth fractional transitions when units are partially in more than one medium.
- Unit motion, position, velocity, rotation, and rotational velocity are used for simulation and rendering interpolation; rendering can run at 60 FPS while simulation ticks are lower.
- Pathfinding uses A* with heuristics based on traversal time and terrain cost, not just shortest geometric distance, so units may choose to go around a hill instead of over it.
- The game uses fog of war, but deterministic lockstep means hidden entities still have to be fully simulated.
- Rendering performance is managed with multiple levels of detail for units, trees, grass, and other objects so zoomed-in and zoomed-out views remain performant.
- Projectiles, explosions, unit collisions, hit boxes, and laser/beam effects use spatial grids or bounded checks so the game avoids all-entity-against-all-entity interaction costs.
- The project involves continuous tradeoffs among physical plausibility, artistic feel, deterministic correctness, and performance.

## Conflict resolution and uncooperative stakeholders

- Eric has explicit interview material for uncooperative customers, stakeholders, students, captains, performers, sound engineers, PLC/control-system owners, and clients.
- In A.C.L.E. classroom and camp settings, he planned ahead for disruptive or disengaged students so one teacher/helper could resolve the problem while the main lesson or physical activity continued.
- For mixed-age afternoon activities with more physical Olympic-style games, he treated safety and continuity as the priority: handle the disruptive person without derailing the whole group.
- In South Korean middle-school substitute/native-English teaching contexts, he sometimes paused briefly, routed the student to a Korean English teacher when needed, then kept the lesson going.
- In ROK-U, some captains disagreed or became uncooperative. Eric used trusted captains for side conversations to understand the other perspective and gather information without making the disagreement only about him.
- In live Jackson and Mars performances, unsafe crowd members sometimes wanted to come onto the stage. Eric handled this by guiding them away tactfully and with a smile rather than yelling or escalating.
- Some sound engineers were difficult or uncooperative; Eric handled those situations with tact so the show could continue smoothly.
- At Rockwell, PLC/control-system owners could resist MES integration because they did not want to feel like they were handing over control of their systems.
- At Venturetec, client-payment friction required careful relationship management: listen to the new request, set a clear boundary around unpaid prior work, and use tactful follow-up so the business relationship and payment path both stayed intact.
- The recurring pattern is to plan before conflict, delegate incident response where possible, use side-channel empathy to understand the other party, preserve the relationship, and keep the main work moving.

## Multiple deadlines and action-item ownership

- Eric has explicit interview material for managing multiple deadlines across education, sports-league operations, Rockwell MES work, Venturetec startup products, and app releases.
- At A.C.L.E. in Italy, he created schedules for camps running across many cities, many weeks, and remote locations.
- These camps could range from roughly 30 to 200 kids and required scheduling, administration, and actual execution of large-group teaching and activity plans.
- A.C.L.E. is a strong changing-requirements example because weather, parent expectations, lesson-plan changes, or a child leaving before an end-of-week show could force quick adaptation. Eric moved activities indoors when rain broke the outdoor plan, adjusted lessons, changed show roles, or had another student/teacher cover a missing role.
- For the United Kingdom student excursion, he managed flight schedules plus daily operating details such as bedtime, morning routines, food, transportation, and student-safety timing.
- As a pedagogy teacher, he coordinated helpers and other pedagogy teachers, made sure timelines were in place, and assigned action items to exactly one responsible person.
- In the South Korea national ultimate league, he defined high-level work and coordinated with a Korean-speaking secretary who helped instantiate tasks and communicate in local contexts.
- He worked to get buy-in from regional leaders, voted board members, league players, captains, and roughly 35 teams across South Korea.
- He built a VBA/Excel action-item system that could pull grouped action items and email the right individuals once a week with a click.
- At Venturetec, he managed competing deadlines across multiple clients and startup projects, including app-release timelines.
- At Rockwell, he managed deadline pressure inside large MES projects for Fortune 500 industrial clients.
- The recurring pattern is to define the high-level work, make ownership explicit, assign each action item to one person, automate follow-up where practical, and keep schedules grounded in real operational constraints.

## Mentorship and knowledge transfer

- Eric has a recurring pattern of mentoring people, onboarding contributors, and handing off complex systems.
- At Venturetec, he mentored interns, remote workers, and office workers by fielding questions, giving scoped tasks, pointing them toward next steps, and resolving things they did not understand clearly.
- He tried to give contributors creative liberties and product ownership so they felt responsible for the product being built, not only the assigned task.
- At Rockwell, he mentored newer engineers while also coordinating requirements, testing, and fixes across engineering teams.
- In South Korea, before leaving the ROK-U executive manager role, he selected an obvious successor and mentored him on the league technology, executive functions, money management, and relationships between different city/political stakeholders.
- In Italy and Korea, he mentored teachers. At A.C.L.E., this included teaching teachers how to organize lessons and use their own past experiences, camps, activities, and culture-adjacent interests as English-learning material for students.
- When leaving Jackson and Mars, he taught the live-audio/performance system handoff, including how the system worked, why each piece was necessary, and how to operate it.

## Education, operations, and leadership

- At Daegu Science High School, Eric taught STEM subjects in English to gifted Korean high-school students, including students preparing for top science and engineering universities.
- He built an English/Hangul scheduling application for faculty and student schedule lookup, mentored other teachers, led large classrooms/assemblies/conferences, and kept lessons moving during classroom disruptions.
- Daegu/ESL ethical-assessment story: Eric had to decide what it meant to grade someone as speaking English well. He used a holistic view instead of grading only exact grammar, balancing grammar accuracy, effective communication, command of the language, willingness to communicate, writing needs, and likely real-world English use.
- At A.C.L.E. in Italy, Eric taught English and pedagogy, supported office/training-camp technology, adapted curricula, trained teachers, planned for uncooperative students, led large camps, and led a student excursion through the United Kingdom.
- In South Korea, he managed a nationwide ultimate frisbee league across 11 cities, including captains, venues, board meetings, sponsorship, uniforms, equipment, budgets, and succession planning.
- His ROK-U work also involved coordination across roughly 35 teams, regional leaders, voted board members, players, captains, Korean-language stakeholder relationships, captain/board meeting facilitation, and captain conflict resolution.
- For interview use, ROK-U can also support ethical judgment and safety stories: Eric had to think through player injuries and whether younger players should be included in adult/bar social settings in a different legal and cultural context.
- In the United States, he has held similar organizational responsibility with Westchester Ultimate Disc.

## Audio and performance technology

- Eric played in and supported a St. Louis pop-rock cover band performing at casinos, baseball stadiums, and other major venues.
- He designed a real-time performance system where a stomp-box switch could move between live singing and lip-sync playback while matching mic level and intensity.
- He also managed multi-channel in-ear monitoring so each performer received precise audio needed for synchronized, high-energy live performances.
- He eventually handed off these systems by teaching how the pieces fit together and why each part was needed.
- He also handled unsafe stage/crowd moments and difficult sound-engineer interactions with tact while keeping the performance moving.

## Caution and wording

- Treat the educational game work as "Scholastic-style" or "education-client" work unless the exact client is confirmed.
- Do not overstate Steam publication status for the personal games; describe the Steam release as close/in progress unless a current public listing is confirmed.
- Do not overemphasize the underage/bar details publicly; for public-facing material, phrase that ROK-U example as player-safety and ethical judgment in an international league context.
- For ROK-U play-time fairness, emphasize communication, captain autonomy, and avoiding retroactive punishment unless Eric asks to include a more detailed sports-policy example.
- For Sentien/SeniorSafe privacy, avoid giving legal advice. Phrase the point as product/privacy judgment around consent, PII, redaction, and short raw-audio retention.
- For requirement-change interview answers, use the pattern "adapt quickly, clarify what changed, document the new agreement, assign action items, and communicate the consequence." Avoid making it sound like Eric accepts every scope change without pushback.
- For stakeholder-collaboration interview answers, emphasize agenda design, topic collection, OneNote notes, action items, prepared participants, and deliberately including stakeholders who have relevant expertise but might not speak first.
- For version-control interview answers, emphasize reproducibility and traceability rather than making it sound like filing-system preference. The point is that source states, release versions, and shared artifacts remain understandable later.
- Avoid presenting private interview-prep family notes or negotiation notes as public résumé facts unless Eric explicitly asks for that material to be public.
