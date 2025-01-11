export type Title =
  | 'Resume'
  | 'Home'
  | 'Design'
  | 'Smashed'
  | 'Pirates'
  | 'Events'
  | 'Tanks'
  | 'Galaxy Destroyer'
  | 'Seouldat'
  | 'YouTube'
  | 'Shows'
  | 'SoundCloud'

export type Platform = 'desktop' | 'mobile' | 'both'

export interface Project {
  title: Title
  url: string
  stack: string[] | null
  type: string | null
  bullets: string[] | null
  icon: string | null
  gif: boolean
  video: boolean
  platforms: Platform
  supportsMobile: boolean
  supportsDesktop: boolean
  hasSound: boolean
  buttonStartText: string
  description?: string
}

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
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
    buttonStartText: 'Play',
    description:
      'This project represents two years of experimentation with neural networks and game design. Play with friends or watch a bunch of bots duke it out.',
  },
  {
    title: 'Seouldat',
    url: 'http://34.230.11.31:1444/',
    stack: ['Phaser', 'Express', 'Socket.io'],
    type: 'Online Multiplayer Arena Shooter',
    bullets: [
      'Keyboard & Mouse Support',
      'Online Multiplayer',
      // 'Authoritative Server',
      // 'Client-Side Prediction',
      // 'Server-Client Reconciliation',
    ],
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
    buttonStartText: 'Play',
    description:
      'Server-client zen: authoritative server, client-side prediction, & server-client reconciliation.',
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
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Play',
    description:
      "Eric's take on a classic - shoot the bad guys, dodge the bullets, & look out for the big bad boss! Which weapon will you choose?",
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
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Play',
    description:
      'A unque "bullet gate" mechanic - varied gate types mirror, transmit, refract, and multiply bullets.',
  },
  {
    title: 'Design',
    url: 'https://design.niemo.io',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'Exercises in Web Styling',
    bullets: [
      // 'No Libraries',
      // 'No Frameworks',
      'Vanilla Web Development',
      'All Original Content',
    ],
    icon: 'html_css_js.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'View',
    description:
      'A collection of nicknacks and playthings I made to practice raw web basics.',
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
    type: 'Exercise in Fullstack Web',
    bullets: [
      'Create, Read, Update, Delete',
      // 'MVC Design Pattern',
      'EF Core LINQ ORM (SQL)',
      'Front & Backend Validation',
    ],
    icon: 'csharp.png',
    gif: true,
    video: true,
    platforms: 'both',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'View',
    description:
      'A simple event management system with user authentication, validation, and CRUD database operations.',
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
    title: 'SoundCloud',
    url: 'https://soundcloud.com/niemoaudio/ars-niemo-small-talk-build-iv',
    stack: ['FL Studio'],
    type: 'Original Music & Art',
    bullets: [
      'Classical & Electronic Music',
      // 'Electronic Music',
      'All Original Music & Art',
    ],
    icon: 'soundcloud.png',
    gif: true,
    video: true,
    platforms: 'both',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
    buttonStartText: 'Go to',
    description:
      'A collection of original music I have created over the years. Check out the comments on the track, "Small Talk".',
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/@niemoaudio',
    stack: ['FL Studio', 'Adobe Premiere & After Effects'],
    type: 'Original Music & Video Effects',
    bullets: [
      'Classical & Electronic Music',
      // 'Electronic Music',
      'All Original Music & Art',
    ],
    icon: 'YouTube.png',
    gif: true,
    video: true,
    platforms: 'both',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Go to',
    description:
      'Music I have created over the years - but with visuals generated using the Adobe Creative Suite.',
  },
]

export const EricResumeDescription =
  'Eric (Niemo) is an engineer specializing in web and mobile development, neural networks, and game design. He emphasizes defensive programming, strict type safety, and elegant solutions.'
