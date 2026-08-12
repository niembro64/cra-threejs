// myData.ts
export const showSmashedGif: boolean = false;
export const showProjectTitleIcons: boolean = false;
export const show_dates: boolean = false;
export const showMusicEducationSection: boolean = false;
export const usePolyhedron: boolean = true; // Set to true to use polyhedron instead of WD-40 model
export const showContactSection: boolean = false; // Set to false to hide contact section and everything after
export const showProfileAbout: boolean = false; // Set to false to hide profile picture and about me

export interface BulletObject {
  title: string;
  lines: string[];
}

export interface Job {
  company: string;
  title: string;
  location: string;
  dates: string;
  image: string | null;
  details: BulletObject[];
}

export interface Education {
  image: string | null;
  dates: string;
  degree: string;
  school: string;
  details: BulletObject[];
}

export const jobs: Job[] = [
  {
    image: 'venturetec.png',
    company: 'Venturetec',
    title: 'Head of Engineering / Lead Software Engineer',
    location: 'Stamford, Connecticut',
    dates: '2022 - Present',
    details: [
      {
        title: 'Architecting, training, and implementing in-house AI systems to detect and prevent fraud',
        lines: [],
      },
      {
        title: 'Diagrammed, and implemented complex fullstack web + mobile apps',
        lines: [
          'Vue',
          'Angular',
          'React',
          'React Native',
          'RN CLI',
          'RN Expo',
          'Node',
          'Express',
          'Laravel',
          'MongoDB',
          'SQL',
          "API's",
          'Websockets',
          'AWS',
          'S3',
          'EC2',
          'JavaScript',
          'TypeScript',
          'Python',
          'PHP',
          'HTML',
          'CSS',
          'SCSS',
          'Tailwind',
        ],
      },
      {
        title: 'Designed, trained, and deployed various AI model architectures',
        lines: [
          'Pytorch',
          'BrainJS',
          'MLP',
          'RNN',
          'CNN',
          'Transformer',
          'Tokenizer',
          'Text Classifier',
          'Audio Classifier',
          'Image Classifier',
          'Video Classifier',
          'Game AI',
        ],
      },
      {
        title: 'Built video games for mobile & desktop',
        lines: ['PhaserJS GE', 'RN Game Engine', 'Material D&D'],
      },
    ],
  },
  {
    image: 'ra.svg',
    company: 'Rockwell Automation',
    title: 'Software Engineer II / JR Software Engineer',
    location: 'St. Louis, Missouri',
    dates: '2018 - 2022',
    details: [
      {
        title: 'Developed machine execution systems for fortune 500 companies',
        lines: ['3M', 'Lucid Motors', 'Cooper Tires', 'Continental Tires'],
      },
      {
        title: 'Developed machine execution systems',
        lines: ['Maple-L Foods', 'Green-L Foods'],
      },
    ],
  },
  {
    image: 'dshs_trans.png',
    company: '대구과학고등학교 영재고',
    title: 'High School ESL & Science Instructor',
    location: 'Daegu, South Korea',
    dates: '2013 - 2017',
    details: [
      {
        title: 'Taught STEM-based ESL courses to gifted high-school students',
        lines: [],
      },
      {
        title: 'Built custom software to compile faculty schedules.',
        lines: [],
      },
    ],
  },
  {
    image: 'acle.png',
    company: 'A.C.L.E.',
    title: 'ESL Lead Instructor',
    location: 'Sanremo, Italy',
    dates: '2008 - 2013',
    details: [
      {
        title: 'Designed and delivered english courses in 25 cities',
        lines: [],
      },
    ],
  },
];

const musicEducation: Education = {
  dates: '2010',
  image: 'lcc.png',
  degree: 'AA Music Education',
  school: 'Lewis & Clark Community College',
  details: [
    {
      title: 'Areas of Study',
      lines: ['Violin Performance', 'Music Theory', 'Languages'],
    },
  ],
};

export const educations: Education[] = [
  {
    dates: '2018',
    image: 'diploma_clean_01.webp',
    degree: 'BS Computer Engineering',
    school: 'Southern Illinois University Edwardsville',
    details: [
      {
        title: 'With Honors, 3.73 GPA',
        lines: [],
      },
      {
        title: 'Major in Computer Engineering',

        lines: [
          'Advanced Circuits',
          'Digital Design',
          'Verilog',
          'PCB Design',
          'Microcontrollers',
          'Embedded Systems',
          'Signal Processing',
          'Signal Communication',
        ],
      },
      {
        title: 'Minor in Computer Science',
        lines: ['Data Structures & Algorithms', 'Assembly, C, C++, Java', 'x86, RISC-V, LR35902', 'OS Design'],
      },
      {
        title: 'Minor in Mathematics',
        lines: ['Calculus III', 'Differential Equations', 'Discrete Mathematics', 'Engineering Statistics'],
      },
    ],
  },
  {
    dates: '2022',
    image: 'coding_dojo_cert.png',
    degree: 'Web Development Bootcamp',
    school: 'Coding Dojo',
    details: [
      {
        title: 'Certificate w/ Highest Honors',
        lines: ['Fundamentals', 'Python Stack', 'MERN Stack', 'C# Stack'],
      },
      {
        title: 'Four-Month Course, 80 Hours per Week, with Four Specialized Instructors',
        lines: [],
      },
    ],
  },
  {
    dates: '2013',
    image: 'siue.jpg',
    degree: 'BS Secondary Education',
    school: 'Southern Illinois University Edwardsville',
    details: [
      {
        title: 'High School Teacher Certification',
        lines: ['Biology', 'Chemistry', 'Physics', 'Computer Science'],
      },
      {
        title: 'Certified to Teach Sciences in Three States',
        lines: ['Illinois', 'Missouri', 'New York'],
      },
    ],
  },
  ...(showMusicEducationSection ? [musicEducation] : []),
];

import type { CSSProperties } from 'react';

export const tooltipDelay = 500;

export const showEmojis: boolean = false;

export const showKirbyGame: boolean = false;

export type ConnectionQualityType = 'low' | 'medium' | 'high';

export const toolTipStyle: CSSProperties = {
  // color: 'white',
  // backgroundColor: 'black',
  color: 'black',
  backgroundColor: 'white',
  paddingTop: '10px',
  fontSize: '1.5em',
  fontWeight: 'bold',

  paddingBottom: '8px',
  paddingRight: '30px',
  paddingLeft: '30px',
  borderRadius: '25px',
  zIndex: 1000,
};

export type ProjectStatus = 'ok' | 'disabled' | 'hide';

export interface Project {
  projectStatus: ProjectStatus;
  dates: string | null;
  title: string;
  url: string;
  stack: string[] | null;
  type: string | null;
  bullets: string[] | null;
  icon: string | null;
  video: string | null;
  image: string | null;
  supportsMobile: boolean;
  supportsDesktop: boolean;
  hasSound: boolean;
  description?: string;
}

export const mediaBasePath = process.env.PUBLIC_URL + '/project_media/';

const iconPhaser = 'phaser-icon.png';
const iconThreeJs = 'threejs.png';
const iconReact = 'react.png';

export const ai_projects: Project[] = [
  {
    dates: '2026 - Ongoing',
    projectStatus: 'ok',
    title: 'Conv-Net Chess',
    url: 'https://games.niemo.io/chess/',
    stack: ['Vue', 'TypeScript', 'PyTorch', 'TensorFlow.js', 'Three.js'],
    type: 'Reinforcement Learning Chess AI',
    bullets: [
      'Self-Play Reinforcement Learning',
      'Convolutional Policy + Value Network',
      'Monte Carlo Tree Search',
      'Live Neural Network Visualization',
      'In-Browser Model Inference',
    ],
    icon: 'vue.svg',
    image: 'chess.jpg',
    video: 'chess.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'Play against a convolutional neural network trained from scratch solely through self-play reinforcement learning—no human games or supervised examples. Inspect how the AI encodes the board, scores moves, and searches for its next play in an interactive visualization.',
  },
  {
    dates: '',
    projectStatus: 'ok',
    title: 'Word Vector Explorer',
    url: 'https://games.niemo.io/token-embedding',
    stack: ['Vue', 'TypeScript', 'Three.js', 'GloVe'],
    type: '3D Word Embedding Visualization',
    bullets: [
      '3D Vector Space Visualization',
      'Word Analogy Exploration',
      'PCA Dimensionality Reduction',
      'Spring Physics Animations',
      'Interactive Camera Controls',
    ],
    icon: 'vue.svg',
    image: 'token-embedding.jpg',
    video: 'token-embedding.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'Explore word relationships in 3D space. See how "italy" is to "pasta" as "japan" is to "____" - visualize word analogies using GloVe embeddings compressed from 50D to 3D via PCA.',
  },
  {
    dates: '',
    projectStatus: 'ok',
    title: 'Polynomial Optimization',
    url: 'https://games.niemo.io/function-approximation',
    stack: ['Vue', 'TypeScript', 'Genetic Algorithm'],
    type: 'Polynomial Fitting via Evolution',
    bullets: [
      'Genetic Algorithm Evolution',
      'Adaptive Mutation Variance',
      'Weight-Proportional Scaling',
      'Interactive Point Dragging',
      'Real-time Visualization',
    ],
    icon: 'vue.svg',
    image: 'function-approximation.jpg',
    video: 'function-approximation.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'Watch a genetic algorithm evolve polynomial functions to fit data points. Features adaptive mutation variance based on fitness, weight-proportional scaling, and interactive point manipulation. Visualize the evolution process in real-time with configurable parameters.',
  },
  {
    dates: '',
    projectStatus: 'ok',
    title: 'Genetic Algo Racing',
    url: 'https://games.niemo.io/genetic-racing',
    stack: ['Canvas', 'Vue', 'Neural Networks'],
    type: 'NN Evolution Simulation',
    bullets: [
      'Genetic Algorithm',
      'Distance Sensor Raycasting',
      'Autonomous Car Control',
      'Generation-Based Evolution',
    ],
    icon: 'vue.svg',
    image: 'genetic-racing.jpg',
    video: 'genetic-racing.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'Watch neural networks of different architectures learn to drive through genetic evolution, no backprop. Starting with random weights, cars use distance sensors as inputs to control steering. The best performer passes its brain to the next generation, where it is mutated and evolved.',
  },
  {
    dates: null,
    projectStatus: 'ok',
    title: 'Attention Mechanism',
    url: 'https://games.niemo.io/attention',
    stack: ['React', 'Tailwind'],
    type: 'Demonstration of Attention Mechanism in Transformer Models',
    bullets: [
      'Tokenizer',
      'Add & Remove Tokens',
      'Attention Mechanism',
      'MLP Layer',
      'Next Token Prediction',
      '"Training" Mode',
    ],
    icon: iconReact,
    image: 'attention.jpg',
    video: 'attention.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'Wiggle the "weights" to see how they affect the downstream output. Add and remove tokens to see how they affect the output. "Training" mode is in progress.',
  },
];

export const compsci_projects: Project[] = [
  {
    dates: null,
    projectStatus: 'ok',
    title: 'Pathfinding',
    url: 'https://games.niemo.io/pathfinding',
    stack: ['Vue', 'TypeScript', 'Tailwind'],
    type: 'Algorithm Visualization',
    bullets: ['BFS Algorithm', 'DFS Algorithm', 'Greedy Algorithm', 'Dijkstra Algorithm', 'A* Algorithm'],
    icon: 'vue.svg',
    image: 'pathfinding.jpg',
    video: 'pathfinding.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'Visualize popular pathfinding algorithms in action. Watch as BFS, DFS, Greedy, Dijkstra, and A* navigate through obstacles to find the optimal path.',
  },
  {
    dates: null,
    projectStatus: 'ok',
    title: 'Extended Axelrod',
    url: 'https://games.niemo.io/axelrod',
    stack: ['Phaser', 'React'],
    type: 'Game Theory Simulation',
    bullets: ['Choose Strategies', 'Set the Rules', 'Watch the Tournament'],
    icon: iconPhaser,
    image: 'axelrod.jpg',
    video: 'axelrod.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description: "An ethics ecological simulation that extends Axelrod's Tournament - Would you cooperate or defect?",
  },
  {
    dates: null,
    projectStatus: 'ok',
    title: 'Collision Detection',
    url: 'https://games.niemo.io/raycast',
    stack: ['HTML5 Canvas', 'JavaScript'],
    type: 'Physics Simulation',
    bullets: ['Choose Parameters', 'Watch the Simulation', 'Naive vs Raycast Solutions'],
    icon: 'html_css_js.png',
    image: 'raycast.jpg',
    video: 'raycast.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'A physics simulation comparing collision detection methods, a naive approach vs raycasting. How many collisions with the walls means a ball is outside?',
  },
];

export const videogame_projects: Project[] = [
  {
    dates: '2022 - Ongoing',
    projectStatus: 'ok',
    title: 'Smashed: Neural Brawler',
    url: 'https://smashed.niemo.io',
    stack: ['Phaser', 'BrainJS', 'Aseprite', 'Express', 'MongoDB', 'FL Studio'],
    type: 'Multiplayer Platform Fighter',
    bullets: ['Keyboard Support', 'USB Controller Support', 'Scripted Bots', 'Neural Network Bots'],
    icon: iconPhaser,
    image: 'smashed.jpg',
    video: 'smashed.mp4',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
    description:
      'This project represents 2+ years of experimentation with neural networks and game design. Play with friends or watch a bunch of bots duke it out.',
  },
  {
    dates: '2025 - Ongoing',
    projectStatus: 'ok',
    title: 'Lockstep Annihilation',
    url: 'https://games.niemo.io/budget-annihilation',
    stack: ['Vue', 'TypeScript', 'Three.js', 'Rust', 'WebAssembly', 'PeerJS'],
    type: '3D Physics-Based Real-Time Strategy',
    bullets: [
      'Keyboard & Mouse Support',
      'Online Multiplayer',
      'Cross-Architecture Deterministic Lockstep',
      'Rust / WebAssembly Simulation Core',
      'Force, Mass & Momentum-Based Physics',
      'Terrain-Aware Pathfinding & Fog of War',
    ],
    icon: null,
    image: 'budget-annihilation.jpg',
    video: 'budget-annihilation.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'A full-3D, physics-first RTS inspired by Total Annihilation. Build factories, manage your economy, and command an army across dynamic terrain while every peer runs the same deterministic simulation—even across different CPU architectures.',
  },

  {
    dates: '2024 - Ongoing',
    projectStatus: 'ok',
    title: 'Seouldat: Networked Arena',
    url: 'https://seouldat.niemo.io',
    // url: 'http://34.230.11.31:1444/',
    stack: ['Phaser', 'Express', 'Socket.io'],
    type: 'Online Multiplayer Arena Shooter',
    bullets: [
      'Keyboard & Mouse Support',
      'Online Multiplayer',
      'Authoritative Server',
      'Client-Side Prediction',
      'Server-Client Reconciliation',
    ],
    icon: iconPhaser,
    image: 'seouldat.jpg',
    video: 'seouldat.mp4',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
    description:
      "Grab your keyboard, aim your mouse, and enter the fight! Open the game again in a second tab on your computer, or tell a friend to join you - it's time to battle online!",
  },
  {
    dates: '2024',
    projectStatus: 'ok',
    title: 'Galaxy Destroyer',
    url: 'https://games.niemo.io/space',
    stack: ['Phaser', 'React', 'TypeScript', 'FL Studio'],
    type: 'Vertical Scrolling Shooter',
    bullets: [
      'Simple Mobile Controls',
      'Desktop Mouse & Keyboard',
      // 'Original Sounds Effects',
    ],
    icon: iconPhaser,
    image: 'galaxydestroyer.jpg',
    video: 'galaxydestroyer.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    description:
      "Niemo's take on a classic - shoot the bad guys, dodge the bullets, & look out for the big bad boss! Which weapon will you choose?",
  },
  {
    dates: '2024',
    projectStatus: 'ok',
    title: 'Ballistic Gates',
    url: 'https://games.niemo.io/tanks',
    stack: ['Phaser', 'React', 'FL Studio'],
    type: 'Free-Roam Shooter',
    bullets: ['2-Thumbs Mobile Controls', 'Desktop Mouse & Keyboard', 'Best Experience = Desktop'],
    icon: iconPhaser,
    image: 'tanks.jpg',
    video: 'tanks.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    description:
      'A unique "bullet gate" mechanic - various gate types mirror, transmit, refract, and multiply bullets.',
  },
  {
    dates: '2023',
    projectStatus: 'ok',
    title: 'Portfolio Navigator',
    url: 'https://projects.niemo.io',
    stack: ['Phaser', 'React'],
    type: 'Navigation Game',
    bullets: ['Mouse & Keyboard Controls', 'Mobile Touch Controls'],
    icon: iconPhaser,
    image: 'projects.jpg',
    video: 'projects.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description: 'An unholy blending of Phaser and React - make Kirby fly around with your finger or mouse.',
  },
  {
    dates: null,
    projectStatus: 'ok',
    title: 'WebGL Drive',
    url: 'https://games.niemo.io/drive',
    stack: ['ThreeJS', 'React'],
    type: '3D Driving Simulation',
    bullets: ['Keyboard Controls'],
    icon: iconThreeJs,
    image: 'drive.jpg',
    video: 'drive.mp4',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: false,
    description: 'A simple 3D driving simulation - in progress.',
  },
];

export const fullstack_projects: Project[] = [
  {
    dates: '2022',
    projectStatus: 'ok',
    title: 'RSVP System',
    url: 'https://events.niemo.io',
    stack: ['C#, ASP.NET Core', 'MySQL'],
    type: 'C# Fullstack',
    bullets: ['Create, Read, Update, Delete', 'EF Core LINQ ORM (SQL)', 'Front & Backend Validation'],
    icon: 'csharp.png',
    image: 'events.jpg',
    video: 'events.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    description:
      'A simple, clean, event management system with user authentication, validation, and CRUD database operations.',
  },
  {
    dates: '2022',
    projectStatus: 'ok',
    title: 'TV Show Registry',
    url: 'https://shows.niemo.io',
    stack: ['Python', 'Flask', 'MySQL'],
    bullets: ['Create, Read, Update, Delete', 'Form Validation', 'Bcrypt Password Hashing', 'Direct SQL Query'],
    description:
      'A simple, clean, TV show management system with user authentication, validation, and CRUD database operations.',
    icon: 'python.png',
    image: 'shows.jpg',
    video: 'shows.mp4',
    type: 'Python Fullstack',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
  },
  {
    dates: '2022',
    projectStatus: 'ok',
    title: 'Pirate Crew Manager',
    url: 'https://pirates.niemo.io',
    stack: ['React', 'Express', 'MongoDB'],
    description: 'A simple, clean, pirate management system, with CRUD database operations.',
    bullets: ['Create, Read, Update, Delete', 'Front & Backend Validation'],
    icon: iconReact,
    image: 'pirates.jpg',
    video: 'pirates.mp4',
    supportsDesktop: true,
    type: 'JavaScript Fullstack',
    supportsMobile: true,
    hasSound: false,
  },
  {
    dates: '2022',
    projectStatus: 'ok',
    title: 'Frontend Experiments',
    url: 'https://design.niemo.io',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'Web Styling Fun',
    bullets: ['Vanilla Web Development', 'All Original Content'],
    icon: 'html_css_js.png',
    image: 'design.jpg',
    video: 'design.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    description: 'A collection of experimental nicknacks and playthings made practicing web basics.',
  },
];

export const art_projects: Project[] = [
  {
    dates: '2002 - Ongoing',
    projectStatus: 'ok',
    title: 'Original Compositions',
    url: 'https://soundcloud.com/niemoaudio/ars-niemo-small-talk-build-iv',
    stack: ['FL Studio'],
    type: 'Original Music',
    bullets: [
      'Classical & Electronic Music',
      // 'Electronic Music',
      'All Original Music & Art',
    ],
    icon: 'fruit.png',
    image: 'soundcloud.jpg',
    video: 'soundcloud.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    description: "A collection of Niemo's original music created over the years.",
  },
  {
    dates: '2013 - 2021',
    projectStatus: 'ok',
    title: 'Music Visualizations',
    url: 'https://www.youtube.com/@niemoaudio',
    stack: ['Adobe Premiere', 'After Effects', 'Photoshop'],
    type: 'Visual Effects',
    bullets: [
      'Classical & Electronic Music',
      // 'Electronic Music',
      'All Original Music & Art',
    ],
    icon: 'create.png',
    image: 'youtube.jpg',
    video: 'youtube.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    description: 'Branded visualizations added to original music.',
  },
];

export const myDataShort = 'Original Fullstack Apps, Games, and ML on Mobile, Desktop, and Cloud';

export const EricResumeDescription =
  'Engineer specializing in full-stack web & mobile apps, neural network training & deployment, and game building - emphasizing defensive programming, strict type safety, and elegant solutions.';

export const socialMedia: SocialMedia[] = [
  {
    platform: 'SoundCloud',
    url: 'https://soundcloud.com/niemoaudio/ars-niemo-laser-commander',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/ericniemo/',
  },
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com/@niemoaudio',
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/NiemoAudio',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/eric-niemo/',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/niembro64',
  },
];

export type SocialMedia = {
  platform: string;
  url: string;
};

export type SkillCategory = {
  emoji: string;
  title: string;
  dates: string;
  skills: Skill[];
};

export type Skill = {
  title: string;
  details: string[];
};

export const skills: SkillCategory[] = [
  {
    emoji: '💻',
    title: 'Web Development',
    dates: '2019 - Present',
    skills: [
      {
        title: 'Frontend',
        details: ['React', 'React Native', 'Vue', 'Angular', 'TypeScript', 'SCSS', 'Tailwind'],
      },
      {
        title: 'Backend',
        details: ['Node', 'Express', 'Laravel', 'Flask', 'C#', 'Python', 'PHP'],
      },
      {
        title: 'Databases',
        details: ['MongoDB', 'SQL', 'MySQL', 'PostgreSQL', 'SQLite'],
      },
      // {
      //   title: 'APIs',
      //   details: ['REST', 'Websockets', 'Socket.io'],
      // },
      {
        title: 'Deployment',
        details: ['AWS', 'Docker', 'GitLab', 'Github'],
      },
    ],
  },
  {
    // brain
    emoji: '🧠',
    title: 'AI & ML',
    dates: '2022 - Present',
    skills: [
      // {
      //   title: 'Frameworks',
      //   details: ['Pytorch', 'BrainJS'],
      // },
      {
        title: 'Architectures',
        details: ['Pytorch', 'BrainJS', 'FeedForward', 'RNN', 'Convolutional', 'Transformer'],
      },
      {
        title: 'Applications',
        details: ['Text Classification', 'Audio Classification', 'Image Classification', 'Bot AI for Games'],
      },
    ],
  },
  {
    emoji: '🕹️',
    title: 'Game Engines',
    dates: '2019 - Present',
    skills: [
      {
        title: 'Browser-Based',
        details: ['Phaser JS', 'Three JS', 'HTML Canvas'],
      },
      {
        title: 'Device-Based',
        details: ['React Native Game Engine', 'N64 ROM Hacking', 'Raspberry Pi', 'Unity Game Engine'],
      },
    ],
  },
  {
    emoji: '🎨',
    title: 'Artistic',
    dates: '',
    skills: [
      {
        title: 'Audio',
        details: ['FL Studio', 'Audacity', 'Virtual DJ'],
      },
      {
        title: 'Instruments',
        details: ['Violin', 'Piano', 'Guitar', 'DJ Equipment'],
      },
      {
        title: 'Visual',
        details: ['Aseprite', 'Blender', 'Photoshop', 'Illustrator', 'After Effects', 'OBS Studio'],
      },
      {
        title: 'Genres',
        details: ['Classical', 'Flamenco', 'EDM', 'Drum & Bass', 'Pixel Art'],
      },
    ],
  },

  {
    emoji: '🌏',
    title: 'Human Languages',
    dates: '2008 - Present',
    skills: [
      {
        title: 'English',
        details: ['Native USA'],
      },
      {
        title: 'Italian',
        details: ['Conversational'],
      },
      {
        title: 'Spanish',
        details: ['Intermediate'],
      },
      {
        title: 'Korean',
        details: ['Basic'],
      },
    ],
  },
];

export interface DeskEnvironment {
  image: string;
  title: string;
  description: string[];
}

const conference_call_equipment = 'High-end conference call equipment';
const laptop_docking_station = 'Docking Station for Macbook Pro M1 & Windows 11 Laptops';

export const workEnvironments: DeskEnvironment[] = [
  {
    image: '/wfh_cut.webp',
    title: 'Home WorkStation',
    description: [
      '42U Server Rack for Home Lab',
      '4 x 4K TVs for Multitasking',
      'Plex Movie Server - 30 Active Montly Users',
      'G-Suite Replicant Server - 4 Active Monthly Users',
      'Raspberry Pi Cluster',
      'Network Storage (Synology)',
      'Home Automation (Google Home)',
      conference_call_equipment,
    ],
  },
  {
    image: '/bedroom.webp',
    title: 'Bedroom Desk',
    description: [
      laptop_docking_station,
      conference_call_equipment,
      'Minimalist Design to Reduce Distractions',
      '4 x 2K Monitors for Multitasking',
    ],
  },
  {
    image: '/office_cut.webp',
    title: 'Office Desk',
    description: [
      laptop_docking_station,
      conference_call_equipment,

      'Hard-Wired iOS and Android devices for App Development',
    ],
  },
  {
    image: '/gpus.webp',
    title: 'AI Development',
    description: ['Ubuntu Linux w/ NVIDIA & AMD GPUs for Neural Network Training'],
  },
];

export interface LinkSegment {
  type: 'link';
  text: string;
  url: string;
  analyticsCategory: string;
  analyticsLabel: string;
}

export interface TextSegment {
  type: 'text';
  text: string;
}

export type ContentSegment = TextSegment | LinkSegment;

export interface TriviaItem {
  title: string;
  content: ContentSegment[];
}

export const triviaItems: TriviaItem[] = [
  {
    title: 'Wikipedia-Famous',
    content: [
      { type: 'text', text: "Niemo's track " },
      {
        type: 'link',
        text: '"Small Talk (Build IV)"',
        url: 'https://en.wikipedia.org/wiki/File:Ars_Niemo_-_Small_Talk_Build_IV.ogg',
        analyticsCategory: 'Wikipedia',
        analyticsLabel: 'Small Talk (Build IV)',
      },
      {
        type: 'text',
        text: " holds a dignified place in the annals of electronic music. It's prominently featured on both the ",
      },
      {
        type: 'link',
        text: 'Drum and Bass',
        url: 'https://en.wikipedia.org/wiki/Drum_and_bass',
        analyticsCategory: 'Wikipedia',
        analyticsLabel: 'Drum and Bass',
      },
      { type: 'text', text: ' and ' },
      {
        type: 'link',
        text: 'Liquid Funk',
        url: 'https://en.wikipedia.org/wiki/Liquid_funk',
        analyticsCategory: 'Wikipedia',
        analyticsLabel: 'Liquid Funk',
      },
      {
        type: 'text',
        text: ' Wikipedia pages - originally uploaded by editor "Ftiercel" on April 15, 2012, this track remains the only audio sample from this extensive genre available on the site.',
      },
    ],
  },
  {
    title: 'Ultimate Frisbee',
    content: [
      {
        type: 'text',
        text: 'Niemo plays a sport called Ultimate Frisbee, which is a competitive mixed-gender team sport. He was executive manager of ',
      },
      {
        type: 'link',
        text: 'Republic of Korea Ultimate (ROK-U)',
        url: 'https://www.rokultimate.net/',
        analyticsCategory: 'Ultimate Frisbee',
        analyticsLabel: 'ROK-U',
      },
      {
        type: 'text',
        text: ', the national ultimate frisbee league of South Korea, from 2015 - 2016. He is currently a coordinator for ',
      },
      {
        type: 'link',
        text: 'Westchester Ultimate Disc Inc (WUDI)',
        url: 'https://www.wudi.org/',
        analyticsCategory: 'Ultimate Frisbee',
        analyticsLabel: 'WUDI',
      },
      { type: 'text', text: ', a league in Westchester, NY.' },
    ],
  },
  {
    title: 'Musician',
    content: [
      { type: 'text', text: 'Niemo is a versatile ' },
      {
        type: 'link',
        text: 'musician',
        url: 'https://en.wikipedia.org/wiki/Concertmaster',
        analyticsCategory: 'Wikipedia',
        analyticsLabel: 'Concertmaster',
      },
      {
        type: 'text',
        text: ' concert violinist, piano composer, flamenco guitarist, and electronic music DJ. He has performed with numerous orchestras, bands, and quartets and has composed music for television and video games. His DJing experience spans weddings, parties, and clubs across the USA and Korea.',
      },
    ],
  },
  {
    title: 'Crypto',
    content: [
      {
        type: 'text',
        text: 'Niemo began mining Bitcoin with professional-grade ASIC miners in 2017, when it was valued at just $1,000. Through this experience, he gained a deep understanding of blockchain and cryptocurrency, which he now leverages to advise friends and coworkers.',
      },
    ],
  },
];
