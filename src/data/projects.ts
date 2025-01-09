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
  | 'SoundCloud';

export type Platform = 'desktop' | 'mobile' | 'both';

export interface Project {
  title: Title;
  url: string;
  stack: string[] | null;
  type: string | null;
  bullets: string[] | null;
  icon: string | null;
  gif: boolean;
  video: boolean;
  platforms: Platform;
  supportsMobile: boolean;
  supportsDesktop: boolean;
  hasSound: boolean;
  buttonStartText: string;
  description?: string;
}

export const projects: Project[] = [
  {
    title: 'Smashed',
    url: 'https://smashed.niemo.io',
    stack: ['Phaser', 'Express', 'MongoDB'],
    type: 'Multiplayer Platform Fighter',
    bullets: [
      'Keyboard Support',
      'USB Controller Support',
      'Finite State Machine Bots',
      'Neural-Network Bots',
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
      'This project represents two years of experimentation with neural networks and multiplayer game design.',
  },
  {
    title: 'Seouldat',
    url: 'http://34.230.11.31:1444/',
    stack: ['Phaser', 'Express', 'Socket.io'],
    type: 'Online Multiplayer Arena Shooter',
    bullets: [
      'Keyboard & Mouse Controls',
      'Play Online with Friends',
      'Authoritative Server',
      'Client-Side Prediction',
      'Server-Client Reconciliation',
    ],
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: false,
    buttonStartText: 'Play',
    description:
      'My current project, an online multiplayer game built as an exercise in networking and server-client architecture.',
  },
  {
    title: 'Galaxy Destroyer',
    url: 'https://games.niemo.io/space',
    stack: ['Phaser', 'React', 'TypeScript'],
    type: 'Vertical Scrolling Shooter',
    bullets: [
      'Simple Mobile Controls',
      'Desktop Mouse & Keyboard',
      'Original Sounds Effects',
    ],
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Play',
  },
  {
    title: 'Tanks',
    url: 'https://games.niemo.io/tanks',
    stack: ['Phaser', 'React', 'TypeScript'],
    type: 'Free-Roam Shooter',
    bullets: [
      '2-Thumbs Mobile Controls',
      'Desktop Mouse & Keyboard',
      'Original Music & Sounds',
    ],
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'Play',
  },
  {
    title: 'Design',
    url: 'https://design.niemo.io',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'Exercises in Web Styling',
    bullets: [
      'No Libraries',
      'No Frameworks',
      'Vanilla Web Development',
      'All Original Content',
    ],
    icon: 'html_css_js.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
    buttonStartText: 'View',
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
      'CRUD Operations',
      'MVC Design Pattern',
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
    stack: ['FL Studio', 'Adobe CS', 'WordPress', 'CloudFlare', 'Synology'],
    type: 'Original Music & Art',
    bullets: [
      'Classical Music',
      'Electronic Music',
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
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/@niemoaudio',
    stack: ['FL Studio', 'Adobe CS', 'WordPress', 'CloudFlare', 'Synology'],
    type: 'Original Music & Video Effects',
    bullets: [
      'Classical Music',
      'Electronic Music',
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
  },
];

export const EricResumeDescription =
  'Eric (Niemo) is an engineer specializing in web and mobile development, neural networks, and game design. He emphasizes defensive programming, strict type safety, and elegant solutions.';
