import React, { useEffect } from 'react';

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
    themes: ['machine learning', 'mobile', 'audio', 'real-time systems'],
    situation:
      'At Sentien, I worked on SeniorSafe, a product focused on identifying dangerous phone-fraud patterns using mobile, telephony, transcription, and internally trained classifiers.',
    task:
      'I needed to help turn fraud detection from a model concept into an application workflow that could process calls, classify risk, and support real-time user protection.',
    action: [
      'I designed, trained, evaluated, and deployed text and audio classification models for phone-fraud detection.',
      'I owned the iOS application work and handled audio signal processing so the product could reason about call content and audio signals rather than relying on a single source of evidence.',
      'I connected the classifier pipeline to telephony, transcription, redaction, REST APIs, and WebSocket workflows so risk information could move through the system quickly enough to be useful.',
      'I used Python, PyTorch, MLflow, Laravel, Vue, TypeScript, PHP, SQL, MongoDB, AWS Transcribe, Linux, REST APIs, and WebSockets across the stack.',
    ],
    result:
      'The result was an end-to-end fraud-detection workflow spanning mobile capture, transcription, redaction, classification, and real-time application behavior. It is one of my strongest examples of applied ML inside a production product surface.',
  },
  {
    title: 'Leading full-stack product engineering',
    themes: ['technical leadership', 'architecture', 'mobile', 'full-stack'],
    situation:
      'At Venturetec, I led engineering across web, mobile, machine-learning, and game-engine integrations for products such as Audience AI and the Sprayer Integrity Program.',
    task:
      'I had to turn product ideas into reliable software across frontend, backend, mobile clients, APIs, databases, cloud infrastructure, and ML systems.',
    action: [
      'I translated stakeholder goals into implementation plans, system diagrams, technical tasks, and working product slices.',
      'I built and connected React, Vue, Angular, React Native, Node, Express, Laravel, MongoDB, SQL, AWS, S3, EC2, WebSocket, JavaScript, TypeScript, Python, and PHP pieces as needed.',
      'For Audience AI, I designed an ML-driven stand-up comedy simulation and trained natural-language and audio models using BrainJS and React Native for iOS and Android.',
      'For the Sprayer Integrity Program, I developed a cross-platform mobile and web system using React Native with Expo, Vue, and Laravel.',
    ],
    result:
      'The work demonstrated architecture ownership and delivery across multiple platforms instead of isolated feature work. I can use this story when asked about leading ambiguous technical projects or moving between product, ML, mobile, and backend constraints.',
  },
  {
    title: 'Manufacturing execution systems',
    themes: ['industrial software', 'databases', 'backend', 'enterprise integration'],
    situation:
      'At Rockwell Automation, I worked on manufacturing execution systems for major industrial clients including Lucid Motors, 3M, Cooper Tire, Continental Tire, and food-manufacturing systems.',
    task:
      'I needed to design and implement production software that connected industrial control environments with enterprise data and operator-facing workflows.',
    action: [
      'I implemented backend services, database logic, and HMI functionality in industrial environments where correctness and maintainability mattered.',
      'I worked on greenfield production software, legacy-to-new MES migration, ERP integration, and plant-floor system integration.',
      'I used Python, Java, pNuts, SQL, backend services, databases, industrial integration patterns, and HMI development practices.',
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
    themes: ['game development', 'AI opponents', 'iteration', 'creative engineering'],
    situation:
      'I built Smashed Fighter as a platform fighting game and long-running experimentation ground for gameplay, multiplayer, scripted bots, and neural-network-controlled characters.',
    task:
      'I wanted to build a playable desktop game while also using the environment as a testbed for game AI and bot behavior.',
    action: [
      'I built the browser game layer with Phaser and supported keyboard and USB-controller input.',
      'I created pixel-art assets with Aseprite and original audio with FL Studio, keeping the game pipeline under my control instead of depending only on borrowed assets.',
      'I built scripted bots and neural-network bot experiments with BrainJS.',
      'I connected server-backed web application pieces with Express and MongoDB where persistence or web functionality was needed.',
    ],
    result:
      'The project represents more than two years of iteration and combines character control, animation, collision, physics, controllers, game-state orchestration, assets, audio, web services, persistent data, and AI opponents.',
  },
  {
    title: 'Deterministic C++ RTS simulation',
    themes: ['C++', 'systems programming', 'simulation', 'architecture'],
    situation:
      'I built Annihilation++ as a desktop, full-3D, physics-first real-time strategy project inspired by Total Annihilation.',
    task:
      'I needed a simulation core that could support terrain, units, resources, building placement, pathfinding, fog of war, and physics while staying deterministic across CPU architectures.',
    action: [
      'I wrote the simulation in C++ and centered the architecture around explicit, reproducible state.',
      'I modeled units with force, mass, and momentum rather than only sliding them along grid steps.',
      'I built systems for resource economy, unit behavior, structure placement, terrain-aware pathfinding, visibility, and UI around the same simulation core.',
      'I treated cross-architecture consistency as a design constraint instead of an afterthought, because desynchronized simulation state would undermine the whole RTS model.',
    ],
    result:
      'The project demonstrates systems-heavy C++ work: deterministic state, cross-CPU consistency, 3D simulation, physics, pathfinding, visibility, resource systems, and UI coordination in one architecture.',
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
