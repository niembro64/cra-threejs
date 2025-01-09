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

  description: string[] | null;
  bullets: string[] | null;
  dbImage: string | null;
  icon: string | null;
  gif: boolean;
  video: boolean;
  platforms: Platform;
  supportsMobile: boolean;
  supportsDesktop: boolean;
  hasSound: boolean;
  buttonStartText: string;
}

export const projects: Project[] = [
  {
    title: 'Smashed',
    url: 'https://smashed.niemo.io',
    stack: ['Phaser', 'Express', 'MongoDB'],
    description: ['Multiplayer Platform Fighter'],
    bullets: [
      'Keyboard Support',
      'USB Controller Support',
      'Rules-Based Bots',
      'Neural-Network Bots',
    ],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
    buttonStartText: 'Play',
  },
  {
    title: 'Seouldat',
    url: 'http://34.230.11.31:1444/',
    stack: ['Phaser', 'Express', 'Socket.io'],
    description: ['Online Multiplayer Arena Shooter'],
    bullets: [
      'Keyboard Support',
      'Authoritative Reconciliation ',
      'Game In-Progress',
    ],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: false,
    buttonStartText: 'Play',
  },
  {
    title: 'Galaxy Destroyer',
    url: 'https://games.niemo.io/space',
    stack: ['Phaser', 'React', 'TypeScript'],
    description: ['Vertical Scrolling Shooter'],
    bullets: [
      'Simple Mobile Controls',
      'Desktop Mouse & Keyboard',
      'Original Sound Effects',
    ],
    dbImage: null,
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
    description: ['Free-Roam Shooter'],
    bullets: [
      '2-Thumbs Mobile Controls',
      'Desktop Mouse & Keyboard',
      'Original Music & Sound Effects',
    ],
    dbImage: null,
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
    description: ['Exercises in Web Styling'],
    bullets: [
      'No Libraries',
      'No Frameworks',
      'Vanilla Web Development',
      'All Original Content',
    ],
    dbImage: null,
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
    description: ['Exercise in Fullstack Web'],
    bullets: [
      'CRUD Operations',
      'MVC Design Pattern',
      'EF Core LINQ ORM (SQL)',
      'Front & Backend Validation',
    ],
    dbImage: null,
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
    description: ['Original Music & Art'],
    bullets: [
      'Classical Music',
      'Electronic Music',
      'All Original Music & Art',
    ],
    dbImage: null,
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
    description: ['Original Music & Video Effects'],
    bullets: ['Classical Music', 'Electronic Music', 'All Original Music & Art'],
    dbImage: null,
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
