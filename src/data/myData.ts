// myData.ts
export const showSmashedGif: boolean = false

export interface BulletObject {
  title: string
  lines: string[]
}

export interface Job {
  company: string
  title: string
  location: string
  dates: string
  image: string | null
  details: BulletObject[]
}

export interface Education {
  image: string | null
  dates: string
  degree: string
  school: string
  details: BulletObject[]
}

export const jobs: Job[] = [
  {
    // start_year: '2025',
    // end_year: null,
    image: 'sentien.png',
    company: 'Sentien',
    title: 'Head of Engineering',
    location: 'Stamford, Connecticut',
    dates: '2025 - Present',
    details: [
      {
        title:
          'Architecting and implementing in-house AI systems to detect and prevent fraud.',
        lines: [],
      },
    ],
  },
  {
    image: 'venturetec.png',
    company: 'Venturetec',
    title: 'Lead Software Engineer',
    location: 'Stamford, Connecticut',
    dates: '2022 - 2025',
    details: [
      {
        title:
          'Diagrammed, and implemented complex fullstack web + mobile apps.',
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
          'S3',
          'AWS',
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
        title:
          'Designed, trained, and deployed various AI model architectures.',
        lines: [
          'Pytorch',
          'BrainJS',
          'Feedforward',
          'RNNs',
          'Transformers',
          'Text Classifiers',
          'Audio Classifiers',
          'Game AI',
        ],
      },
      {
        title: 'Built games for adults and kids, mobile & desktop.',
        lines: [
          'Phaser Game Engine',
          'React Native Game Engine',
          'Material Drag & Drop',
        ],
      },
    ],
  },
  {
    image: 'ra.svg',
    company: 'Rockwell Automation',
    title: 'Software Engineer II',
    location: 'St. Louis, Missouri',
    dates: '2020 - 2022',
    details: [
      {
        title:
          'Configured industrial software systems for fortune 500 companies.',
        lines: ['3M', 'Lucid Motors', 'Cooper Tires', 'Continental Tires'],
      },
    ],
  },
  {
    image: 'maverick_trans.png',
    company: 'Maverick Technologies',
    title: 'JR Software Engineer',
    location: 'St. Louis, Missouri',
    dates: '2018 - 2020',
    details: [
      {
        title:
          'Configured industrial software systems (machine execution systems).',
        lines: ['Maple Leaf Foods', 'Green Leaf Foods'],
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
        title: 'Taught STEM-based ESL courses to gifted high-school students.',
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
        title: 'Designed and delivered english courses in 25 cities.',
        lines: [],
      },
    ],
  },
]

export const educations: Education[] = [
  {
    dates: '2018',
    image: 'diploma_clean_01.png',
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
        lines: [
          'Data Structures & Algorithms',
          'Assembly, C, C++, Java',
          'x86, RISC-V, LR35902',
          'OS Design',
        ],
      },
      {
        title: 'Minor in Mathematics',
        lines: [
          'Calculus III',
          'Differential Equations',
          'Discrete Mathematics',
          'Engineering Statistics',
        ],
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
        title:
          'Four-Month Course, 80 Hours per Week, with Four Specialized Instructors',
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
  {
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
  },
]

import { CSSProperties } from 'react'

export const tooltipDelay = 500

export const extraTimeLazyLoad = 0

export const showEmojis: boolean = false

export const showKirbyGame: boolean = false

export type ConnectionQualityType = 'low' | 'medium' | 'high'

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
}

export type ProjectStatus = 'ok' | 'disabled' | 'hide'

export interface Project {
  projectStatus: ProjectStatus
  dates: string
  title: string
  url: string
  stack: string[] | null
  type: string | null
  bullets: string[] | null
  icon: string | null
  gif: string | null
  video: string | null
  image: string | null
  supportsMobile: boolean
  supportsDesktop: boolean
  hasSound: boolean
  buttonStartText: string
  description?: string
}

export const mediaBasePath = process.env.PUBLIC_URL + '/project_media/'

const iconPhaser = 'phaser-icon.png'
const iconThreeJs = 'threejs.png'
const iconReact = 'react.png'

export const projects: Project[] = [
  {
    dates: '2025 - Ongoing',
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
    gif: 'attention.gif',
    video: 'attention.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'Play',
    description:
      'This project is a demonstration of the attention mechanism in transformer models. Wiggle the values to see how they affect the output. Add and remove tokens to see how they affect the output. "Training" mode is in progress.',
  },
  {
    dates: '2022 - Ongoing',
    projectStatus: 'ok',
    title: 'Smashed Bros',
    url: 'https://smashed.niemo.io',
    stack: ['Phaser', 'BrainJS', 'Aseprite', 'Express', 'MongoDB', 'FL Studio'],
    type: 'Multiplayer Platform Fighter',
    bullets: [
      'Keyboard Support',
      'USB Controller Support',
      'Scripted Bots',
      'Neural Network Bots',
    ],
    icon: iconPhaser,
    image: 'smashed.jpg',
    gif: 'smashed.gif',
    video: 'smashed.mp4',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
    buttonStartText: 'Play',
    description:
      'This project represents 2+ years of experimentation with neural networks and game design. Play with friends or watch a bunch of bots duke it out.',
  },
  {
    dates: '2024 - Ongoing',
    projectStatus: 'ok',
    title: 'Seouldat',
    url: 'http://34.230.11.31:1444/',
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
    gif: 'seouldat.gif',
    video: 'seouldat.mp4',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
    buttonStartText: 'Play',
    description:
      "Grab your keyboard, aim your mouse, and enter the fight! Open the game again in a second tab on your computer, or tell a friend to join you - it's time to battle online!",
  },
  {
    dates: '2024',
    projectStatus: 'ok',
    title: 'Space',
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
    gif: 'galaxydestroyer.gif',
    video: 'galaxydestroyer.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Play',
    description:
      "Niemo's take on a classic - shoot the bad guys, dodge the bullets, & look out for the big bad boss! Which weapon will you choose?",
  },
  {
    dates: '2024',
    projectStatus: 'ok',
    title: 'Tanks',
    url: 'https://games.niemo.io/tanks',
    stack: ['Phaser', 'React', 'FL Studio'],
    type: 'Free-Roam Shooter',
    bullets: [
      '2-Thumbs Mobile Controls',
      'Desktop Mouse & Keyboard',
      'Best Experience = Desktop',
    ],
    icon: iconPhaser,
    image: 'tanks.jpg',
    gif: 'tanks.gif',
    video: 'tanks.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Play',
    description:
      'A unique "bullet gate" mechanic - various gate types mirror, transmit, refract, and multiply bullets.',
  },
  {
    dates: '2023',
    projectStatus: 'ok',
    title: 'Kirby Run',
    url: 'https://projects.niemo.io',
    stack: ['Phaser', 'React'],
    type: 'Navigation Game',
    bullets: ['Mouse & Keyboard Controls', 'Mobile Touch Controls'],
    icon: iconPhaser,
    image: 'projects.jpg',
    gif: 'projects.gif',
    video: 'projects.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'Play',
    description:
      'An unholy blending of Phaser and React - make Kirby fly around with your finger or mouse.',
  },
  {
    dates: '2025 - Ongoing',
    projectStatus: 'ok',
    title: 'Axelrod',
    url: 'https://games.niemo.io/axelrod',
    stack: ['Phaser', 'React'],
    type: 'Game Theory Simulation',
    bullets: [
      'Vibe Coding',
      'Choose Strategies',
      'Set the Rules',
      'Watch the Tournament',
    ],
    icon: iconPhaser,
    image: 'axelrod.jpg',
    gif: 'axelrod.gif',
    video: 'axelrod.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'Run',
    description:
      "A unique 2D ethics ecological simulation that extends Axelrod's Tournament - should the creatures cooperate or defect? Best experience is on desktop for now.",
  },
  {
    dates: '2025 - Ongoing',
    projectStatus: 'ok',
    title: 'Drive',
    url: 'https://games.niemo.io/drive',
    stack: ['ThreeJS', 'React'],
    type: '3D Driving Simulation',
    bullets: ['Keyboard Controls', 'Vibe Coding'],
    icon: iconThreeJs,
    image: 'drive.jpg',
    gif: 'drive.gif',
    video: 'drive.mp4',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: false,
    buttonStartText: 'Play',
    description:
      'A simple 3D driving simulation - in progress - heavy vibe coding with human cleanup tweaks.',
  },
  {
    dates: '2022',
    projectStatus: 'ok',
    title: 'Design',
    url: 'https://design.niemo.io',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'Web Styling Fun',
    bullets: ['Vanilla Web Development', 'All Original Content'],
    icon: 'html_css_js.png',
    image: 'design.jpg',
    gif: 'design.gif',
    video: 'design.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'View',
    description:
      'A collection of experimental nicknacks and playthings made practicing web basics.',
  },
  {
    dates: '2022',
    projectStatus: 'disabled',
    title: 'Pirates',
    url: 'https://pirates.niemo.io',
    stack: ['React', 'Express', 'MongoDB'],
    description:
      'A simple, clean, pirate management system, with CRUD database operations.',
    bullets: ['Create, Read, Update, Delete', 'Front & Backend Validation'],
    icon: iconReact,
    image: 'pirates.jpg',
    gif: 'pirates.gif',
    video: 'pirates.mp4',
    supportsDesktop: true,
    type: 'JavaScript Fullstack',
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'View',
  },
  {
    dates: '2022',
    projectStatus: 'ok',
    title: 'Events',
    url: 'https://events.niemo.io',
    stack: ['C#, ASP.NET Core', 'MySQL'],
    type: 'C# Fullstack',
    bullets: [
      'Create, Read, Update, Delete',
      'EF Core LINQ ORM (SQL)',
      'Front & Backend Validation',
    ],
    icon: 'csharp.png',
    image: 'events.jpg',
    gif: 'events.gif',
    video: 'events.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'View',
    description:
      'A simple, clean, event management system with user authentication, validation, and CRUD database operations.',
  },
  {
    dates: '2022',
    projectStatus: 'ok',
    title: 'Shows',
    url: 'https://shows.niemo.io',
    stack: ['Python', 'Flask', 'MySQL'],
    bullets: [
      'Create, Read, Update, Delete',
      'Form Validation',
      'Bcrypt Password Hashing',
      'Direct SQL Query',
    ],
    description:
      'A simple, clean, TV show management system with user authentication, validation, and CRUD database operations.',
    icon: 'python.png',
    image: 'shows.jpg',
    gif: 'shows.gif',
    video: 'shows.mp4',
    type: 'Python Fullstack',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'View',
  },
  {
    dates: '2002 - Ongoing',
    projectStatus: 'ok',
    title: 'Music',
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
    gif: 'soundcloud.gif',
    video: 'soundcloud.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Go to',
    description:
      "A collection of Niemo's original music created over the years.",
  },
  {
    dates: '2013 - 2021',
    projectStatus: 'ok',
    title: 'Videos',
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
    gif: 'youtube.gif',
    video: 'youtube.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Go to',
    description: 'Branded visualizations added to original music.',
  },
]

export const EricResumeDescription =
  'Engineer specializing in web & mobile apps, neural network training, and game design - emphasizing defensive programming, strict type safety, and elegant solutions.'

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
]

export type SocialMedia = {
  platform: string
  url: string
}

export type SkillCategory = {
  emoji: string
  title: string
  dates: string
  skills: Skill[]
}

export type Skill = {
  title: string
  details: string[]
}

export const skills: SkillCategory[] = [
  {
    emoji: '💻',
    title: 'Web Development',
    dates: '2019 - Present',
    skills: [
      {
        title: 'Frontend',
        details: [
          'React',
          'React Native',
          'Vue',
          'Angular',
          'TypeScript',
          'SCSS',
          'Tailwind',
        ],
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
        details: [
          'Pytorch',
          'BrainJS',
          'FeedForward',
          'RNN',
          'Convolutional',
          'Transformer',
        ],
      },
      {
        title: 'Applications',
        details: [
          'Text Classification',
          'Audio Classification',
          'Image Classification',
          'Bot AI for Games',
        ],
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
        details: ['Phaser JS', 'Three JS', 'Canvas'],
      },
      {
        title: 'Device-Based',
        details: [
          'React Native Game Engine',
          'N64 ROM Hacking',
          'Raspberry Pi',
          'Unity',
        ],
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
        details: [
          'Aseprite',
          'Blender',
          'Photoshop',
          'Illustrator',
          'After Effects',
          'OBS Studio',
        ],
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
]

export interface DeskEnvironment {
  image: string
  title: string
  description: string[]
}

const conference_call_equipment = 'High-end conference call equipment'
const laptop_docking_station =
  'Docking Station for Macbook Pro & Windows Laptops'

export const workEnvironments: DeskEnvironment[] = [
  {
    image: '/wfh_cut.jpg',
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
    image: '/bedroom.JPG',
    title: 'Bedroom Desk',
    description: [
      laptop_docking_station,
      conference_call_equipment,
      'Minimalist Design to Reduce Distractions',
      '4 x 2K Monitors for Multitasking',
    ],
  },
  {
    image: '/office_cut.jpg',
    title: 'Office Desk',
    description: [
      laptop_docking_station,
      conference_call_equipment,

      'Hard-Wired iOS and Android devices for App Development',
    ],
  },
  {
    image: '/gpus.JPG',
    title: 'AI Development',
    description: [
      'Ubuntu Linux w/ NVIDIA & AMD GPUs for Neural Network Training',
    ],
  },
]
