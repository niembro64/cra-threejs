import React, { useEffect, useState } from 'react';
import { movingExpenseTextSections } from '../data/movingExpensesText';

type StarKey = 'Situation' | 'Task' | 'Action' | 'Result';

type StarSection = {
  label: StarKey;
  guidance: string;
};

type StarStory = {
  title: string;
  themes: string[];
  situation: string;
  task: string;
  action: string[];
  result: string;
};

type RawTranscriptSource = {
  title: string;
  sourceLabel: string;
  path: string;
};

const publicAssetBasePath = process.env.PUBLIC_URL && process.env.PUBLIC_URL !== '.' ? process.env.PUBLIC_URL : '';

const rawTranscriptSources: RawTranscriptSource[] = [
  {
    title: 'Flight Simulation Interview Answer Transcript',
    sourceLabel: 'text.txt',
    path: `${publicAssetBasePath}/interview/flight_simulation_interview_answers.txt`,
  },
  {
    title: 'Eric Work Info Transcript',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info.txt`,
  },
  {
    title: 'Eric Work Info Transcript 2',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_2.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_2.txt`,
  },
  {
    title: 'Eric Work Info Transcript 3',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_3.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_3.txt`,
  },
  {
    title: 'Eric Work Info Transcript 4',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_4.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_4.txt`,
  },
  {
    title: 'Eric Work Info Transcript 5',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_5.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_5.txt`,
  },
  {
    title: 'Eric Work Info Transcript 6',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_6.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_6.txt`,
  },
  {
    title: 'Eric Work Info Transcript 7',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_7.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_7.txt`,
  },
  {
    title: 'Eric Work Info Transcript 8',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_8.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_8.txt`,
  },
  {
    title: 'Eric Work Info Transcript 9',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_9.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_9.txt`,
  },
  {
    title: 'Eric Work Info Transcript 10',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_10.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_10.txt`,
  },
  {
    title: 'Eric Work Info Transcript 11',
    sourceLabel: 'D:\\Downloads_SSD\\eric_work_info_11.txt',
    path: `${publicAssetBasePath}/interview/eric_work_info_11.txt`,
  },
];

const starSections: StarSection[] = [
  {
    label: 'Situation',
    guidance: '10-15%: Give quick background details. Keep the context brief.',
  },
  {
    label: 'Task',
    guidance: '10-15%: State the exact goal, problem, or responsibility.',
  },
  {
    label: 'Action',
    guidance: '50-70%: Explain what I personally did. Use specific "I" statements.',
  },
  {
    label: 'Result',
    guidance: '10-20%: Close with the outcome. Use concrete details or metrics when available.',
  },
];

const stories: StarStory[] = [
  {
    title: 'Real-time phone-fraud detection',
    themes: ['machine learning', 'RAG', 'audio', 'real-time systems'],
    situation:
      'At Sentien/SeniorSafe, I worked on a product focused on identifying dangerous phone-fraud patterns using telephony, transcription, audio-related signals, and internally trained classifiers.',
    task:
      'I needed to help turn fraud detection from a model concept into an application workflow that could process calls, classify risk across roughly 50 labels, and support real-time user protection.',
    action: [
      'I moved the classifier approach from heuristics and word-count rules toward RNNs and then turn-aware transformer classifiers.',
      'I designed attention masks where tokens inside a speaker turn could attend bidirectionally and later turns could attend to earlier conversation context.',
      'I built turn-level and conversation-level classifiers, experimented with classifier-token aggregation strategies, and compared architectures through ablations.',
      'I built the data workflows around the model: human training-item creation, label cleaning, null-label handling, redaction-token handling, ASR augmentation, validation splits, and robust threshold selection with F2 and PR AUC checks.',
      'I implemented PGVector/Postgres semantic search over whole conversations, each speaker side, individual turns, and turns with prior-turn context.',
      'I connected that retrieval layer to an ElevenLabs voice agent so the agent could use prior-conversation memory and semantic risk context.',
    ],
    result:
      'The result was an end-to-end fraud-detection workflow spanning transcription, redaction, classification, vector retrieval, and real-time application behavior. It is my strongest example of applied ML architecture inside a production product surface.',
  },
  {
    title: 'Voice-call privacy and retention judgment',
    themes: ['ethics', 'privacy', 'compliance', 'voice data'],
    situation:
      'At Sentien/SeniorSafe, the product handled phone calls, transcription, and audio recordings for a fraud-protection workflow, which created privacy and consent concerns.',
    task:
      'I needed to support the technical workflow while respecting different state consent laws, sensitive information, and the difference between redacted transcript data and raw audio.',
    action: [
      'I treated recording consent as a product requirement, including one-party versus two-party consent differences by state and the need to announce that calls were being recorded.',
      'I separated the privacy behavior of transcribed text from raw MP3 audio because AWS transcription could redact PII from text, but the original audio still contained whatever was spoken.',
      'I pushed the design toward a short raw-audio retention window, keeping MP3 recordings only long enough to check transcription quality and then deleting them after roughly 24 hours.',
      'I used the redacted transcript as the longer-lived artifact whenever possible, while recognizing that automated redaction is not perfect and should not be treated as a total privacy guarantee.',
    ],
    result:
      'The result was a more defensible privacy posture: the system could still verify transcriptions and support fraud detection, but it avoided retaining raw voice recordings longer than the product actually needed.',
  },
  {
    title: 'Leading full-stack product engineering',
    themes: ['technical leadership', 'architecture', 'mobile', 'full-stack'],
    situation:
      'At Venturetec, I led engineering across web, mobile, machine-learning, and game-engine integrations for products such as Audience AI and the Spray Integrity Program.',
    task:
      'I had to turn product ideas into reliable software across frontend, backend, mobile clients, APIs, databases, cloud infrastructure, and ML systems.',
    action: [
      'I translated stakeholder goals into implementation plans, system diagrams, technical tasks, and working product slices.',
      'I built and connected React, Vue, Angular, React Native, Node, Express, Laravel, MongoDB, SQL, AWS, S3, EC2, WebSocket, JavaScript, TypeScript, Python, and PHP pieces as needed.',
      'For Audience AI, I built an on-device comedy-practice audio product using neural scoring, MFCC/FFT-style audio features, React Native, layered laugh tracks, and FFmpeg rendering.',
      'For the Spray Integrity Program, I built mobile/web workflows for QR barrel tracking, estimate building, job forms, contractor rewards, referrals, product libraries, support flows, and mini-games.',
      'I also built education-client games, data scrapers, CSV-export dashboards, and practical client tools when the product needed fast custom automation.',
    ],
    result:
      'The work demonstrated architecture ownership and delivery across multiple platforms instead of isolated feature work. I can use this story when asked about leading ambiguous technical projects or moving between product, ML, mobile, backend, and game-system constraints.',
  },
  {
    title: 'Audience AI difficult technical problem',
    themes: ['audio ML', 'React Native', 'FFmpeg', 'real-time inference'],
    situation:
      'At Venturetec, I built Audience AI from scratch as a React Native app for people practicing stand-up comedy on iOS and Android.',
    task:
      'I needed to turn an ambiguous product idea into a working system: record the user performing, score whether moments were funny in real time, trigger an appropriate laugh track, and export a polished video that could be downloaded or shared.',
    action: [
      'I decomposed the whole product pipeline from recording, to audio classification, to laugh selection, to playback timing, to final video rendering.',
      'I trained neural audio classifiers around a 0-to-1 funniness score, using CNN/LSTM-style approaches and vocal audio cues rather than relying only on written joke semantics.',
      'I treated laughter-versus-speech detection as a signal-design problem: audience laughter tends to be more white-noise-like, so I used that as a target and looked at the vocal moments immediately before laughter as candidate funny moments.',
      'I built real-time scoring behavior so the app could update the laugh response while the user was practicing instead of waiting for a server-side batch job.',
      'I designed the laugh-track system around selected laugh buckets and timestamps so the generated response could vary in intensity and timing.',
      'I whiteboarded and implemented a multi-stage FFmpeg pipeline: normalize the raw video, add the selected laugh MP3s at the right timestamps, render the laugh-mixed video, add a watermark, combine logo and username media, and append that branding to the final export.',
      'I kept the experience cross-platform for iOS and Android while handling mobile recording, local ML behavior, audio timing, and video composition constraints.',
    ],
    result:
      'The result was a working cross-platform mobile product that combined real-time audio ML, DSP-style signal thinking, laugh-track generation, and FFmpeg video export. It is a strong interview story for a genuinely difficult technical problem because the hard parts were product definition, model behavior, real-time UX, and media rendering all at once.',
  },
  {
    title: 'Manufacturing execution systems',
    themes: ['industrial software', 'databases', 'backend', 'enterprise integration'],
    situation:
      'At Rockwell Automation, I worked on manufacturing execution systems for major industrial clients including Lucid Motors, 3M, Cooper Tire, Continental Tire, and food-manufacturing systems.',
    task:
      'I needed to design and implement production software that connected industrial control environments with enterprise data and operator-facing workflows.',
    action: [
      'I implemented backend services, database logic, HMI functionality, and plant-floor integrations in industrial environments where correctness and maintainability mattered.',
      'At Lucid Motors in Casa Grande, I worked onsite on MES integration, PLC/robotic-system coordination, business-layer integration, and track-and-trace workflows.',
      'For 3M, I managed integration around strict evidence/material traceability and process requirements.',
      'For tire and food-manufacturing clients, I mapped old production processes to new MES behavior and built or tested front-end, backend, and database pieces.',
      'I coordinated requirements with offshore developers, tested their code, fixed code myself when needed, and built VBA/Excel tooling to keep the work moving.',
      'I approached the work defensively because manufacturing systems have real operational consequences when data, timing, or operator interfaces are wrong.',
    ],
    result:
      'The result was production software supporting named Fortune 500 and industrial clients. This story is useful for interviews about reliability, enterprise integration, and engineering in high-consequence environments.',
  },
  {
    title: 'Self-play neural chess engine',
    themes: ['reinforcement learning', 'model training', 'browser ML', 'explainability'],
    situation:
      'I built Conv-Net Chess as an interactive chess application around a neural chess engine trained from scratch through self-play reinforcement learning.',
    task:
      'I wanted to create more than a playable bot. The goal was to make the model, board encoding, move evaluation, and search process visible in an interactive product.',
    action: [
      'I designed a convolutional policy-and-value network and paired it with Monte Carlo tree search.',
      'I generated training experience through self-play instead of using human-game data or supervised examples.',
      'I trained the model in PyTorch, exported it for browser inference with TensorFlow.js, and built the interactive application in Vue and TypeScript.',
      'I used Three.js to visualize parts of the neural-network and inference process so the project could explain how the AI reaches decisions.',
    ],
    result:
      'The result is an end-to-end ML project covering data generation, model design, training, search, browser inference, and interactive visualization. It is a strong answer for questions about owning the whole ML lifecycle.',
  },
  {
    title: 'Responsive multiplayer shooter networking',
    themes: ['real-time networking', 'WebSockets', 'game systems', 'latency'],
    situation:
      'I built Seouldat Shooter as a desktop browser-based multiplayer arena shooter using Phaser, Express, and Socket.IO.',
    task:
      'I needed to make networked movement feel responsive while keeping the server authoritative over accepted game state.',
    action: [
      'I implemented an authoritative server model so the server owned the accepted state instead of trusting every client update.',
      'I added client-side prediction so local movement could respond immediately to player input even before server confirmation arrived.',
      'I implemented server-client reconciliation so the client could correct divergence when authoritative updates arrived.',
      'I designed the game around fast keyboard movement and mouse aiming, which made latency and correction behavior especially visible.',
    ],
    result:
      'The project demonstrates real-time distributed state, Socket.IO messaging, game networking, prediction under latency, and correction of client-server disagreement. It is useful for questions about WebSockets or building interactive systems that must feel immediate.',
  },
  {
    title: 'Long-running game and ML laboratory',
    themes: ['game development', 'physics', 'AI opponents', 'creative engineering'],
    situation:
      'I built Smashed Fighter as a platform fighting game and long-running experimentation ground for gameplay, multiplayer, scripted bots, and neural-network-controlled characters.',
    task:
      'I wanted to build a playable desktop game while also using the environment as a testbed for game AI and bot behavior.',
    action: [
      'I built the browser game layer with Phaser and supported keyboard and USB-controller input.',
      'I created pixel-art assets with Aseprite and original audio with FL Studio, keeping the game pipeline under my control instead of depending only on borrowed assets.',
      'I treated gameplay as simulation work by tuning movement, gravity, collision, environmental forces, and moment-to-moment physics rather than making it only graphical.',
      'I built scripted bots and neural-network bot experiments with BrainJS.',
      'I connected server-backed web application pieces with Express and MongoDB where persistence or web functionality was needed.',
    ],
    result:
      'The project represents more than two years of iteration and combines character control, animation, collision, physics, controllers, game-state orchestration, assets, audio, web services, persistent data, and AI opponents.',
  },
  {
    title: 'Deterministic C++ RTS simulation',
    themes: ['C++', 'determinism', 'physics', 'commercial game'],
    situation:
      'I built Annihilation++ as a desktop, full-3D, physics-first real-time strategy project inspired by Total Annihilation, with the intent to move it toward a commercial Steam release.',
    task:
      'I needed a simulation core that could support terrain, units, resources, building placement, pathfinding, fog of war, projectiles, rendering performance, and physics while staying deterministic across operating systems and CPU architectures.',
    action: [
      'I built the game engine from scratch in C++ instead of relying on an existing engine, because I wanted tight control over performance, simulation state, and native desktop behavior.',
      'I moved from an authoritative-server model toward deterministic lockstep, where every client runs the same simulation and must remain exactly synchronized.',
      'I tested lockstep behavior across Ubuntu Linux, Windows 10/11, and macOS on x86-64 and ARM-class architectures by hashing game state at intervals and comparing the hashes across machines.',
      'I treated floating-point behavior as a core architecture problem because tiny multiply/add differences between CPUs or compilers can desynchronize a lockstep RTS.',
      'I modeled units through force, mass, momentum, friction, and media transitions, including cases where a unit is partially in air, water, or ground contact and receives fractional locomotion/friction from each medium.',
      'I built terrain-aware A* pathfinding with heuristics based on time and traversal cost, not only shortest distance, so units can choose to go around hills when climbing would be slower.',
      'I separated simulation and rendering cadence: the simulation can run at a lower tick rate while the client interpolates position, rotation, velocity, and rotational velocity for smooth 60 FPS presentation.',
      'I managed rendering performance with multiple levels of detail for units, trees, and grass, while still simulating hidden or fog-of-war entities because deterministic lockstep requires the full world state to continue.',
      'I used spatial grids for projectiles, explosions, collisions, laser terminus checks, and hit detection so interactions do not degrade into all-entities-against-all-entities checks.',
    ],
    result:
      'The project demonstrates systems-heavy C++ commercial game engineering: custom engine architecture, deterministic state, cross-CPU consistency, 3D simulation, physics, pathfinding, visibility, rendering LOD, projectile systems, performance tradeoffs, and UI/gameplay coordination in one architecture.',
  },
  {
    title: 'Operational leadership through sports leagues',
    themes: ['leadership', 'operations', 'stakeholders', 'budget'],
    situation:
      'Outside traditional software roles, I managed organized ultimate frisbee leagues in South Korea and later in the New York/Connecticut area.',
    task:
      'I had to coordinate many independent groups, venues, schedules, captains, budgets, equipment, and public-space constraints while keeping the league functional.',
    action: [
      'I ran board and captain coordination, handled venue planning across many cities, and worked through public-field availability and local stakeholder constraints.',
      'I managed season budgets, sponsorship, uniforms, equipment logistics, and compliance details instead of only handling a narrow volunteer task.',
      'I handled safety and ethics judgment calls in an international context, including situations where younger players were near adult social events and local permissiveness was not the same thing as responsible league judgment.',
      'When a championship team did not play several lower-level players, I had to balance player fairness against captain autonomy because the league had not clearly communicated a rule in advance.',
      'I avoided retroactive punishment and instead asked captains direct questions before later games about expected playing time for lower-level players, which forced them to think through the issue and gave me better information about their rationale.',
      'I built practical scheduling and team-balancing tools, starting with VBA-style tools in Korea and later moving toward more advanced JavaScript/front-end workflows.',
      'I communicated with players, captains, organizers, and support roles so decisions were clear and the season could run.',
    ],
    result:
      'The result was real operational leadership outside a purely technical setting. This is useful for behavioral questions about ownership, coordination, conflict, and executing under messy constraints.',
  },
  {
    title: 'Fair play, autonomy, and communication',
    themes: ['ethics', 'leadership', 'communication', 'sports operations'],
    situation:
      'While managing the South Korea national ultimate league, I saw fairness issues around lower-level players, including a championship game where one team did not play three players at all.',
    task:
      'I needed to decide whether to intervene, punish, or leave the decision to the captain, even though the league had not clearly communicated a play-time rule ahead of time.',
    action: [
      'I separated the ethical issue from the rule issue: it might be unfair to bench players completely, but it would also be unfair to punish captains retroactively for a standard the league had not stated.',
      'I respected captain ownership while still making it clear that inclusion and expectations mattered to the league.',
      'At the next games, I asked captains specific questions about what playing time lower-level players should expect and why.',
      'Those questions prompted captains to think through the fairness issue before it became a conflict, and they gave me information about whether limited play was strategic, accidental, injury-related, or planned.',
      'I used communication to resolve misunderstandings between players and captains whenever possible instead of making every issue a top-down ruling.',
    ],
    result:
      'The outcome was a smoother way to handle a sensitive fairness problem: I preserved captain autonomy, avoided retroactive enforcement, improved expectations, and gave myself better information for future league policy.',
  },
  {
    title: 'Holistic English grading judgment',
    themes: ['education', 'ethics', 'communication', 'assessment'],
    situation:
      'As an English/STEM teacher, I had to grade students learning English in contexts where perfect grammar was not always the same thing as effective communication.',
    task:
      'I needed to decide what it meant to give a fair score: whether to prioritize exact grammar, practical communication, command of the language, willingness to speak, or the student’s likely use case for English.',
    action: [
      'I treated language ability as multi-dimensional instead of reducing it to grammar correctness alone.',
      'I considered whether the student could actually communicate ideas, participate in conversation, and use English for the context they were likely to face.',
      'I still valued grammar and writing accuracy, but I did not let that completely override communication effectiveness.',
      'I used a holistic grading approach so an A or F reflected the broader purpose of learning English, not just whether every sentence was technically perfect.',
    ],
    result:
      'The result was fairer assessment for students with different strengths and goals. This is useful for ethical-judgment questions because it shows I can define success carefully when the metric itself is ambiguous.',
  },
  {
    title: 'Mentoring and knowledge handoff',
    themes: ['mentorship', 'onboarding', 'leadership', 'handoff'],
    situation:
      'Across Venturetec, Rockwell, teaching roles, the South Korea ultimate league, and Jackson and Mars, I repeatedly ended up responsible for helping other people take over complex work.',
    task:
      'I needed to get people productive without just handing them instructions. The goal was to transfer context, explain why the systems worked the way they did, and give people enough ownership to make good decisions after I stepped away.',
    action: [
      'At Venturetec, I onboarded interns, remote workers, and office contributors by fielding questions, giving scoped tasks, resolving unclear points, and pointing them toward next steps.',
      'I tried to give contributors creative ownership where it made sense so they were not just executing tickets but understood the product they were helping build.',
      'When I left South Korea, I selected an obvious successor for the ROK-U executive manager role and mentored him on the league technology, money management, executive functions, and relationships with city and political stakeholders.',
      'At Rockwell, I mentored newer engineers while also coordinating requirements and testing work with other developers.',
      'At A.C.L.E. and in Korea, I mentored teachers on how to organize lessons and turn their own experiences, camp history, and cultural context into material students could connect with.',
      'When I left Jackson and Mars, I taught the live-audio/performance system handoff: how the pieces worked, why each part was necessary, and how to operate the setup.',
    ],
    result:
      'The result is a broad pattern of leadership through transfer of context. I can use this story for questions about mentorship, onboarding, succession planning, or leaving a team stronger after my direct involvement ends.',
  },
  {
    title: 'Managing multiple deadlines',
    themes: ['deadlines', 'coordination', 'operations', 'ownership'],
    situation:
      'Several of my roles required many deadlines at once: A.C.L.E. camps across Italy, a UK student trip, the ROK-U national ultimate league in South Korea, Rockwell MES projects, and multiple Venturetec client/startup products.',
    task:
      'I needed to keep work moving across people, cities, schedules, and stakeholders without letting responsibilities become vague or deadlines drift.',
    action: [
      'At A.C.L.E., I created and managed camp schedules across many cities for weeks and months at a time, including remote locations and rotating staff needs.',
      'When I led students to England, I managed schedules beyond the flights: bedtime, morning routines, food, movement between locations, and the practical details that kept students safe and on time.',
      'As a pedagogy teacher, I coordinated helpers and other pedagogy teachers by defining timelines and assigning action items to exactly one owner.',
      'For ROK-U, I worked with regional leaders, voted board members, captains, and roughly 35 teams while getting buy-in across different interests and Korean-language stakeholder contexts.',
      'I built a VBA/Excel system that pulled action items and emailed grouped weekly follow-ups to the right individuals with one click.',
      'At Rockwell and Venturetec, I handled multiple client or product timelines at the same time, including large MES delivery work and startup app-release deadlines.',
    ],
    result:
      'The result was a repeatable operating style: make ownership explicit, keep action items visible, automate follow-up where possible, and keep schedules practical enough for real people to execute.',
  },
  {
    title: 'Managing changing requirements and scope',
    themes: ['requirements', 'scope creep', 'stakeholders', 'adaptability'],
    situation:
      'Across software, teaching, and league operations, I repeatedly had requirements change after planning had already started: clients changed scope, internal product ideas expanded, weather disrupted events, and venues or people became unavailable.',
    task:
      'I needed to adapt without losing control of the work: clarify what changed, decide whether to accept or push back, communicate consequences, and turn the new understanding into concrete action items.',
    action: [
      'At A.C.L.E., I stayed light on my feet when lessons or camp events changed because of rain, parent expectations, or a student leaving before an end-of-week show; I moved activities inside, adjusted roles, or found another student or teacher to cover the gap.',
      'In the South Korea ultimate league, weather or a lost venue could force a fast decision to cancel, delay, move to another venue, or even move to another city, so I focused on getting the best available option communicated quickly.',
      'At Rockwell, requirement changes happened inside both agile and waterfall delivery. In agile work, I used Jira and sprint planning to absorb changes; in waterfall-style work, I documented the new agreement, schedule impact, and downstream assumptions so everyone stayed aligned.',
      'At Venturetec and Sentien/SeniorSafe, I pushed back on feature creep when too many options would make the product harder to explain or harder for customers to choose.',
      'For client scope changes, I restated my understanding at the end of meetings, wrote down action items, compared the new request against the original plan, and explained the consequences for schedule, yield, or payment.',
    ],
    result:
      'The result was a practical pattern for changing requirements: be adaptable in the moment, but make the change explicit, document the new agreement, assign next actions, and communicate the cost or tradeoff before the work silently expands.',
  },
  {
    title: 'Version control and reproducible releases',
    themes: ['Git', 'release management', 'documentation', 'reproducibility'],
    situation:
      'Across mobile apps, client projects, music builds, personal projects, and this portfolio work, I have needed to keep track of many versions of files, builds, releases, and repository states.',
    task:
      'I needed a system that made versions findable, sortable, reproducible, and understandable later, especially when a build had been emailed out, shipped to an app store, or tied to a specific repository state.',
    action: [
      'I developed explicit naming habits instead of relying on vague file names like final or latest. For sequential work, I often start at v00 because I expect many revisions and want the names to sort cleanly.',
      'For date-based files, I use year-month-day-hour-minute-second ordering so alphabetical order is also chronological order and so the date is not ambiguous across US, Spanish, Italian, or other international date conventions.',
      'I heavily use Git and repositories even for personal projects because version control gives me a durable record of how the work evolved.',
      'For app releases, I keep track of the repository state associated with shipped iOS and Android versions so version 16 in the App Store or version 22 in the Android store can be traced back to the code that produced it.',
      'I treat documentation and release markers as part of reproducibility: the point is not just knowing what changed, but being able to rebuild or reason from the exact state that produced a release.',
    ],
    result:
      'The result is a disciplined release-management habit: files sort predictably, dates are unambiguous, shipped builds can be traced back to source, and future debugging starts from a reproducible state instead of guesswork.',
  },
  {
    title: 'Leading large meetings and groups',
    themes: ['facilitation', 'large groups', 'public speaking', 'action items'],
    situation:
      'Several roles required me to lead large groups: A.C.L.E. camps with 30 to 200 kids, ROK-U captain and board meetings, Daegu school assemblies and conferences, Rockwell project status meetings, and Venturetec/Sentien product demos.',
    task:
      'I needed to set the agenda, hold attention, make the meeting useful, turn discussion into action items, and then follow through after the meeting ended.',
    action: [
      'At A.C.L.E., I scheduled and ran large camps where I had to keep kids engaged through sports/Olympics activities, English grammar, drama, and end-of-week skit performances.',
      'For ROK-U, I planned captain meetings and voted board meetings by deciding the flow, important issues, questions to discuss, itineraries, and action items coming out of the meeting.',
      'I also treated league weekends as large operating meetings: team schedules, emotional and physical competition, dinner plans, party logistics, sponsorship events, and money handling all needed coordination.',
      'At Daegu Science High School, I handled large classroom groups, gym/assembly speaking, parent-teacher conferences, teacher conferences, and principal-facing conversations.',
      'At Rockwell, I led and participated in daily or weekly status updates, client meetings, internal project meetings, and action-item follow-up for large MES work.',
      'At Venturetec/Sentien, I demoed the SeniorSafe system, including my classification design, RAG voice-agent design, and iOS app work, after explaining the system value to investors or interested parties.',
    ],
    result:
      'The result is a pattern of turning large, potentially messy gatherings into structured communication: agenda, flow, participation, action items, and follow-through.',
  },
  {
    title: 'Collaborating with many stakeholders',
    themes: ['stakeholders', 'collaboration', 'meetings', 'communication'],
    situation:
      'At Rockwell, Venturetec/Sentien, Daegu Science High School, and ROK-U, I worked in environments where many different groups had a real stake in the outcome.',
    task:
      'I needed to make collaboration productive across people with different priorities: PLC and machining teams, QA, ERP/business-layer stakeholders, clients, investors, teachers, captains, and league organizers.',
    action: [
      'At Rockwell, I treated big meetings as something to design before they happened. I emailed stakeholders beforehand asking what topics they wanted covered, then merged overlapping topics into a clear agenda.',
      'I used OneNote heavily to lay out meeting topics, notes, decisions, and follow-up items so the discussion did not disappear into loose conversation.',
      'I sent the agenda back out before the meeting so people could come prepared, then moved through the list intentionally and checked whether people had questions before moving on.',
      'When someone had not spoken but I expected them to have a useful opinion, I pulled them into the discussion in a socially smooth way rather than letting one or two loud voices own the room.',
      'At Venturetec/Sentien, I used the same pattern with clients and investors: communicate what we said we would do, what progress we made, what problems came up, and where the product had steered.',
      'At Daegu Science High School, I collaborated with other teachers on curriculum and active STEM lessons, including activities like an egg-drop project where students had to plan resources, describe materials in English, and connect science concepts to communication practice.',
    ],
    result:
      'The result was better stakeholder alignment: people knew what would be discussed, meetings produced action items, quieter subject-matter experts had room to contribute, and technical or educational decisions were easier to explain afterward.',
  },
  {
    title: 'Handling uncooperative stakeholders',
    themes: ['conflict resolution', 'stakeholders', 'tact', 'continuity'],
    situation:
      'Across teaching, sports-league management, live performance, Rockwell MES work, and Venturetec client work, I had to handle people who were disruptive, resistant, unsafe, or misaligned with the work that needed to happen.',
    task:
      'I needed to keep the main work moving while addressing the person or group creating friction, without escalating unnecessarily or damaging the relationship.',
    action: [
      'In classroom and camp settings, I planned ahead for disruptive or disengaged students by delegating one person to handle the issue while I kept the lesson or activity moving.',
      'For physical afternoon activities with mixed-age groups, I treated safety and continuity as the priority: resolve the disruption without letting the whole group lose momentum.',
      'In ROK-U league management, when captains resisted or disagreed, I used trusted captains for side conversations so I could understand the other perspective and find a better path than a direct argument.',
      'In live Jackson and Mars performances, I handled unsafe crowd/stage situations by guiding people away tactfully and with a smile instead of escalating in a way that would disrupt the show.',
      'At Rockwell, I navigated control-team resistance when PLC owners were protective of their systems and did not want MES integration to feel like handing over the keys.',
      'At Venturetec, I helped manage client conversations where new requirements were being requested before previous work had been paid for, balancing relationship preservation with clear business boundaries.',
    ],
    result:
      'The pattern was to plan before conflict, use tact in the moment, preserve the relationship where possible, and keep the core work moving. This is useful for behavioral questions about difficult customers, resistant stakeholders, and conflict resolution.',
  },
  {
    title: 'Automating faculty scheduling',
    themes: ['automation', 'teaching', 'stakeholder communication', 'practical tools'],
    situation:
      'While teaching STEM-based ESL courses at Daegu Science High School for gifted students, I also encountered operational scheduling work for faculty.',
    task:
      'I needed to reduce a manual scheduling burden by creating software that could compile faculty schedules more reliably.',
    action: [
      'I identified the repeated parts of the scheduling process that were suitable for automation.',
      'I built custom software to compile the faculty schedules rather than continuing to handle the work manually.',
      'I balanced the implementation with teaching responsibilities, which forced me to keep the tool practical and focused on the actual workflow.',
      'I communicated the output in a form that non-software stakeholders could use.',
    ],
    result:
      'The result was a practical internal tool that reduced manual scheduling work. This is a good concise story for interviews about initiative, automation, and building useful software outside a formal engineering role.',
  },
  {
    title: 'Original music selected by Wikipedia editors',
    themes: ['creative discipline', 'audio production', 'long-term craft', 'public recognition'],
    situation:
      'I have produced original music since 2002, including classical and electronic work under the Niemo Audio identity.',
    task:
      'I wanted to create, arrange, sequence, mix, and publish original music with enough quality and identity to stand on its own.',
    action: [
      'I composed and produced original tracks using FL Studio and related audio-production practices.',
      'I handled composition, arrangement, synthesis, sequencing, mixing, and long-term catalog development.',
      'I paired audio work with original visual identity and carried that production discipline into games and interactive projects.',
      'I published the work publicly, including the track Small Talk (Build IV).',
    ],
    result:
      'An independent Wikipedia editor uploaded Small Talk (Build IV) to Wikimedia Commons on April 15, 2012, and it became the single audio example displayed on the English Drum and bass and Liquid drum and bass articles as verified in the local project knowledge. This is useful when discussing long-term creative discipline and external validation.',
  },
];

const InterviewNotes: React.FC = () => {
  const [workInfoTranscripts, setWorkInfoTranscripts] = useState<Record<string, string>>({});

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobotsContent = existingRobotsMeta?.content ?? null;
    const robotsMeta = existingRobotsMeta ?? document.createElement('meta');

    document.title = 'Interview Notes';
    robotsMeta.name = 'robots';
    robotsMeta.content = 'noindex,nofollow';
    if (!existingRobotsMeta) document.head.appendChild(robotsMeta);

    return () => {
      document.title = previousTitle;
      if (existingRobotsMeta && previousRobotsContent !== null) {
        existingRobotsMeta.content = previousRobotsContent;
      } else {
        robotsMeta.remove();
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    rawTranscriptSources.forEach((source) => {
      fetch(source.path)
        .then((response) => {
          if (!response.ok) throw new Error(`Unable to load ${source.path}`);
          return response.text();
        })
        .then((text) => {
          if (!cancelled) {
            setWorkInfoTranscripts((current) => ({
              ...current,
              [source.path]: text.trim(),
            }));
          }
        })
        .catch(() => {
          if (!cancelled) {
            setWorkInfoTranscripts((current) => ({
              ...current,
              [source.path]: `Unable to load ${source.sourceLabel} from the public interview notes.`,
            }));
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-3 py-4 text-zinc-100 sm:px-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <header className="border-b border-zinc-800 pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Private route</p>
          <h1 className="mt-1 text-2xl font-bold tracking-normal text-white sm:text-3xl">Interview STAR Notes</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
            Professional interview stories arranged so each answer starts fast, spends most of its time on personal
            action, and closes with a concrete outcome.
          </p>
        </header>

        <section className="grid gap-3 md:grid-cols-4" aria-label="STAR answer timing">
          {starSections.map((section) => (
            <div key={section.label} className="rounded border border-zinc-800 bg-zinc-900 p-3">
              <h2 className="text-sm font-semibold text-white">{section.label}</h2>
              <p className="mt-1 text-xs leading-5 text-zinc-300">{section.guidance}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-2" aria-label="Raw interview notes">
          <h2 className="text-base font-bold text-white">Raw Notes</h2>
          {movingExpenseTextSections.map((section) => (
            <article key={section.title} className="rounded border border-zinc-800 bg-zinc-900 p-3">
              <h3 className="text-sm font-semibold text-sky-300">{section.title}</h3>
              <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[0.7rem] leading-4 text-zinc-300">
                {section.body}
              </pre>
            </article>
          ))}
          {rawTranscriptSources.map((source) => (
            <article key={source.path} className="rounded border border-zinc-800 bg-zinc-900 p-3">
              <h3 className="text-sm font-semibold text-sky-300">{source.title}</h3>
              <p className="mt-1 text-xs text-zinc-500">Imported from {source.sourceLabel}</p>
              <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[0.7rem] leading-4 text-zinc-300">
                {workInfoTranscripts[source.path] || 'Loading transcript...'}
              </pre>
            </article>
          ))}
        </section>

        <section className="grid gap-3" aria-label="STAR stories">
          {stories.map((story) => (
            <article key={story.title} className="rounded border border-zinc-800 bg-zinc-900 p-3">
              <div className="flex flex-col gap-2 border-b border-zinc-800 pb-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-normal text-white">{story.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {story.themes.map((theme) => (
                      <span
                        key={theme}
                        className="rounded-sm border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-sky-200"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-3 lg:grid-cols-[0.9fr_0.9fr_2.4fr_1fr]">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-sky-300">Situation</h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-300">{story.situation}</p>
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-sky-300">Task</h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-300">{story.task}</p>
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-sky-300">Action</h3>
                  <ul className="mt-1 space-y-1 text-xs leading-5 text-zinc-200">
                    {story.action.map((action) => (
                      <li key={action} className="border-l-2 border-sky-400/60 pl-3">
                        {action}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-sky-300">Result</h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-300">{story.result}</p>
                </section>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default InterviewNotes;
