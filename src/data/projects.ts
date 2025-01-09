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
  stackIcon: string | null;
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
}

export const projects: Project[] = [
  {
    title: 'Smashed',
    url: 'https://smashed.niemo.io',
    stack: ['Phaser3', 'React', 'TypeScript', 'Express', 'MongoDB'],
    stackIcon: null,
    description: ['Multiplayer Platform Fighter'],
    bullets: [
      'Rules-Based Bots',
      'Neural-Network Bots',
      'Supports 4 USB Controllers',
      'Supports 2-Players on Keyboard',
    ],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
  },
  {
    title: 'Seouldat',
    url: 'http://34.230.11.31:1444/',
    stack: ['Phaser3', 'React', 'TypeScript'],
    stackIcon: null,
    description: ['Online Multiplayer Arena Shooter'],
    bullets: ['Desktop', 'Game In-Progress'],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: false,
    hasSound: true,
  },
  {
    title: 'Galaxy Destroyer',
    url: 'https://games.niemo.io/space',
    stack: ['Phaser3', 'React', 'TypeScript'],
    stackIcon: null,
    description: ['Vertical Scrolling Shooter'],
    bullets: ['Rules-Based Bots', 'Mobile or Desktop'],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
  },
  {
    title: 'Tanks',
    url: 'https://games.niemo.io/tanks',
    stack: ['Phaser3', 'React', 'TypeScript'],
    stackIcon: null,
    description: ['Vertical Scrolling Shooter (Desktop)'],
    bullets: ['Rules-Based Bots', 'Mobile or Desktop'],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
  },
  {
    title: 'Design',
    url: 'https://design.niemo.io',
    stack: ['HTML', 'CSS', 'JavaScript'],
    stackIcon: null,
    description: ['Exercise in Web Style Control'],
    bullets: ['No Libraries', 'No Frameworks', 'Vanilla Web Development'],
    dbImage: null,
    icon: 'html_css_js.png',
    gif: true,
    video: true,
    platforms: 'desktop',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
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
    stackIcon: null,
    description: ['Exercise in Fullstack Web'],
    bullets: [
      'CRUD Operations',
      'Data Validation',
      'MVC Design Pattern',
      'EF Core LINQ ORM (SQL)',
    ],
    dbImage: null,
    icon: 'csharp.png',
    gif: true,
    video: true,
    platforms: 'both',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
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
    stackIcon: null,
    description: ['Original Music & Art'],
    bullets: [
      ' Visual Art',
      'Classical Music',
      'Electronic Music',
      'All Media Original',
    ],
    dbImage: null,
    icon: 'soundcloud.png',
    gif: true,
    video: true,
    platforms: 'both',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: false,
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/@niemoaudio',
    stack: ['FL Studio', 'Adobe CS', 'WordPress', 'CloudFlare', 'Synology'],
    stackIcon: null,
    description: ['Original Music & Video Effects'],
    bullets: [
      ' Visual Art',
      'Classical Music',
      'Electronic Music',
      'All Media Original',
    ],
    dbImage: null,
    icon: 'YouTube.png',
    gif: true,
    video: true,
    platforms: 'both',
    supportsDesktop: true,
    supportsMobile: true,
    hasSound: true,
  },
];

export const EricResumeDescription =
  'Eric (Niemo) is an engineer specializing in web and mobile development, neural networks, and game design. He emphasizes defensive programming, strict type safety, and elegant solutions.';
