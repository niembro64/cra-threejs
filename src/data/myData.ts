// resumeData.ts

// ERIC NIEMEYER
// niemeyer.eric@gmail.com ❖ 618-616-3380 ❖ Stamford, CT ❖ Website: https://niemo.io

// Eric is an engineer specializing in web and mobile development,  neural networks, web applications, and games. He prioritizes defensive programming, strict type safety, and elegant solutions.

// WORK EXPERIENCE

// Venturetec								           	         May 2022 – Present
// Principle Engineer, Chief Architect					                  Stamford, Connecticut
// Lead engineer & developer for AI-based phone safety application
// Lead engineer & developer of an AI standup-comedy mobile app
// Lead developer for a mobile app that digital-twins many aspects of the spray foam industry
// Lead frontend developer for a game website for children: puzzles, sticker books, games

// Rockwell Automation										 2018 – 2022
// Software Engineer II									  St. Louis, Missouri
// Scripted and configured machine execution systems for several fortune 500 companies

// EDUCATION

// B.S Computer Engineering			                     	        			     December, 2018
// Southern Illinois University Edwardsville							Edwardsville, Illinois
// GPA 3.73 / 4.0
// Digital Design, PSpice, Circuits, PCB Design, Microcontrollers, Digital Signal Processing, Signal Communication, Data Structures & Algorithms, OS Design, Linux, Differential Equations, Discrete Mathematics, Engr Statistics
// Varsity Ultimate Frisbee

// SKILLS
// Programming Languages & Frameworks
// TypeScript, JavaScript, Python, Pytorch, Java, C#, C++, C, MIPS/x86/etc Assembly Languages, Verilog, Matlab, SQL Certified (MTA), MongoDB NoSQL, HTML, CSS, SCSS, React, React-Native CLI, React Native Expo, Angular 2+, Vue, Flask, Django, ASP.NET, Laravel, Express, Phaser Game Engine, AWS, S3, EC2, Amazon Transcribe, Amazon Polly, Socket.IO
// Technical
// Machine Learning / Neural Networks / AI, Game Development, 3D Animation, Audio Engineering, Image/Video/Audio Editing, Adobe Creative Suite, Servers, AWS EC2, AWS S3, Networking, Raspberry Pi Cluster, Arduino, Cryptocurrency Mining, Network Storage, PCB Design, PCB Repair, Excel Expert, Retro Game ROM Hacking
// Human Languages
// Italian (Conversational), Spanish (Intermediate), Korean (Basic)
// Other Interests
// Ultimate Frisbee, Wedding DJ, Music Production, Concert Violinist, Piano Composer, Music Featured on Wikipedia

// LINKS

// https://niemo.io
// https://smashed.niemo.io
// https://games.niemo.io/tanks/
// https://games.niemo.io/space/
// https://www.linkedin.com/in/eric-niemo/
// https://github.com/niembro64

// WORK ENVIRONMENT

// Comfortable developing with MacOS, Linux, Windows
// Home Lab: high-end laptop docking stations, conference equipment, hobbyist servers

export interface BulletObject {
  title: string
  lines: string[]
}

export interface Job {
  company: string
  title: string
  location: string
  dates: string
  details: BulletObject[]
}

export interface Education {
  degree: string
  school: string
  details: BulletObject[]
}

export const jobs: Job[] = [
  {
    company: 'Sentien',
    title: 'Head of Engineering',
    location: 'Stamford, Connecticut',
    dates: '2025 - Present',
    details: [
      {
        title: 'Architecting and implementing in-house AI systems.',
        lines: [],
      },
    ],
  },
  {
    company: 'Venturetec',
    title: 'Lead Software Engineer',
    location: 'Stamford, Connecticut',
    dates: '2022 - 2025',
    details: [
      {
        title: 'Implemented complex fullstack web + mobile apps.',
        lines: [
          'Vue',
          'Angular',
          'React',
          'React Native CLI',
          'React Native Expo',
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
          'LSTMs',
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
          'Angular Material Drag & Drop',
        ],
      },
    ],
  },
  {
    company: 'Rockwell Automation',
    title: 'Software Engineer II',
    location: 'St. Louis, Missouri',
    dates: '2018 - 2022',
    details: [
      {
        title:
          'Configured industrial software systems for fortune 500 companies.',
        lines: [
          '3M',
          'Lucid Motors',
          'Cooper Tires',
          'Continental Tires',
          'Maple Leaf Foods',
        ],
      },
    ],
  },
  {
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
    degree: 'B.S. Computer Engineering',
    school: 'Southern Illinois University Edwardsville',
    details: [
      {
        title: 'With Honors, 3.73 GPA - 2018',
        lines: [],
      },
      {
        title: 'Major in Computer Engineering',

        lines: [
          'Advanced Circuits',
          'Digital Design',
          'Verilog',
          'Printed Circuit Board Design',
          'Microcontrollers',
          'Embedded Systems',
          'Digital Signal Processing',
          'Signal Communication',
        ],
      },
      {
        title: 'Minor in Computer Science',
        lines: [
          'Data Structures & Algorithms',
          'C, C++, Java',
          'x86, RISC-V, LR35902 Assembly',
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
    degree: 'Web Dev Bootcamp',
    school: 'Coding Dojo',
    details: [
      {
        title: 'Cert w/ Honors - 2022',
        lines: ['Python Stack', 'MERN Stack', 'C# Fullstack'],
      },
    ],
  },
  {
    degree: 'B.S. Secondary Education',
    school: 'Southern Illinois University Edwardsville',
    details: [
      {
        title: 'HS Teaching Cert - 2013',
        lines: ['Biology', 'Chemistry', 'Physics', 'Computer Science'],
      },
    ],
  },
  {
    degree: 'A.A. Music Education',
    school: 'Lewis & Clark Community College',
    details: [
      {
        title: 'Violin Performance - 2010',
        lines: [],
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

export interface Project {
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

const phaserIcon = 'phaser-icon.png'
// const phaserIcon = 'icon-raygun.png'

export const projects: Project[] = [
  {
    title: 'Smashed',
    url: 'https://smashed.niemo.io',
    stack: ['Phaser', 'BrainJS', 'Aseprite', 'Express', 'MongoDB', 'FL Studio'],
    type: 'Multiplayer Platform Fighter',
    bullets: [
      'Keyboard Support',
      'USB Controller Support',
      'Scripted Bots',
      'Neural Network Bots',
      // 'Finite State Machine Bots',
      // 'Neural-Network Bots',
      // 'Evolving AI Bots',
    ],
    icon: phaserIcon,
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
    icon: phaserIcon,
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
    title: 'Galaxy Destroyer',
    url: 'https://games.niemo.io/space',
    stack: ['Phaser', 'React', 'TypeScript', 'FL Studio'],
    type: 'Vertical Scrolling Shooter',
    bullets: [
      'Simple Mobile Controls',
      'Desktop Mouse & Keyboard',
      // 'Original Sounds Effects',
    ],
    icon: phaserIcon,
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
    title: 'Tanks',
    url: 'https://games.niemo.io/tanks',
    stack: ['Phaser', 'React', 'FL Studio'],
    type: 'Free-Roam Shooter',
    bullets: [
      '2-Thumbs Mobile Controls',
      'Desktop Mouse & Keyboard',
      'Best Experience = Desktop',
      // 'Original Music & Sounds',
    ],
    icon: phaserIcon,
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
    title: 'Navigation Game',
    url: 'https://projects.niemo.io',
    stack: ['Phaser', 'React'],
    type: 'Phaser-React Fusion',
    bullets: ['Mouse & Keyboard Controls', 'Mobile Touch Controls'],
    icon: phaserIcon,
    image: 'projects.jpg',
    gif: 'projects.gif',
    video: 'projects.mp4',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'Play',
    description:
      'An unholy blending of Phaser and React - make Kirby run around with your finger or mouse.',
  },
  {
    title: 'Design',
    url: 'https://design.niemo.io',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'Exercises in Web Styling',
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
  // {
  //   title: 'Pirates',
  //   url: 'https://pirates.niemo.io',
  //   stack: ['React', 'Express', 'MongoDB'],
  //   stackIcon: null,
  //   description: ['Exercise in Form Validation'],
  //   bullets: [
  //     'CRUD Operations',
  //     'Both Front-End and Back-End Validation',
  //     'Validations from Back-End for Data Integrity',
  //     'Validations on Front-End for User Experience',
  //   ],
  //   dbImage: null,
  //   icon: 'react.png',
  //   gif: false,
  //   video: true,
  //   platforms: 'both',
  // },
  {
    title: 'Events',
    url: 'https://events.niemo.io',
    stack: ['C#, ASP.NET Core', 'MySQL'],
    type: 'Exercise in Fullstack',
    bullets: [
      'Create, Read, Update, Delete',
      // 'MVC Design Pattern',
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
  // {
  //   title: 'Shows',
  //   url: 'https://shows.niemo.io',
  //   stack: ['Python', 'Flask', 'MySQL'],
  //   stackIcon: null,
  //   description: ['Exercise in Simplicity'],
  //   bullets: [
  //     'CRUD Operations',
  //     'Data Validation',
  //     'MVC Design Pattern',
  //     'Bcrypt Password Hashing',
  //     'SQL Query String Composition Method, No ORM',
  //   ],
  //   dbImage: null,
  //   icon: 'python.png',
  //   gif: false,
  //   video: true,
  //   platforms: 'both',
  // },
  {
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
      'A collection of original music I have created over the years. Check out the comments on the track, "Small Talk".',
  },
  {
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
    description:
      'Adobe Creative Suite - adding stunning visuals to original music.',
  },
]

export const EricResumeDescription =
  'An engineer specializing in web & mobile development, neural network training, and game design. \n\nHe emphasizes defensive programming, strict type safety, and elegant solutions.'

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
  title: string
  skills: Skill[]
}

export type Skill = {
  title: string
  details: string[]
}

export const skills: SkillCategory[] = [
  {
    title: 'Web Development',
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
      {
        title: 'APIs',
        details: ['REST', 'Websockets', 'Socket.io'],
      },
      {
        title: 'Deployment',
        details: ['AWS', 'Docker', 'GitLab', 'Github'],
      },
    ],
  },
  {
    title: 'AI & ML',
    skills: [
      {
        title: 'Frameworks',
        details: ['Pytorch', 'BrainJS'],
      },
      {
        title: 'Models',
        details: ['Feedforward', 'LSTM', 'Transformer Encoder'],
      },
      {
        title: 'Applications',
        details: [
          'Text Classification',
          'Audio Classification',
          'Video Game Bot AI',
        ],
      },
    ],
  },
  {
    title: 'Game Development',
    skills: [
      {
        title: 'Engines',
        details: ['Phaser', 'RN Game Engine', 'Unity'],
      },
    ],
  },
  {
    title: 'Music & Audio Production',
    skills: [
      {
        title: 'Instruments',
        details: ['Violin', 'Piano', 'Guitar', 'DJ Equipment'],
      },
      {
        title: 'Genres',
        details: ['Classical', 'Flamenco', 'EDM', 'Drum & Bass'],
      },
      {
        title: 'Software',
        details: ['FL Studio', 'Audacity'],
      },
    ],
  },
  // 'Italian (Conversational)',
  // 'Spanish (Functional)',
  // 'Korean (Basic)',
  {
    title: 'Human Languages',
    skills: [
      {
        title: 'English',
        details: ['Native'],
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
  {
    title: 'Technical',
    skills: [
      {
        title: 'Media Production',
        details: [
          'Adobe CS',
          'Photoshop',
          'Premiere',
          'After Effects',
          'Illustrator',
          'Gimp',
          'FL Studio',
        ],
      },
      {
        title: 'Operating Systems',
        details: ['Linux', 'MacOS', 'Windows'],
      },
    ],
  },
]
