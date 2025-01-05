export type Title =
  | 'Resume'
  | 'Home'
  | 'Design'
  | 'Smashed'
  | 'Pirates'
  | 'Events'
  | 'Tanks'
  | 'Space'
  | 'Seouldat'
  | 'Shows'
  | 'Media';

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
  gif: string | null;
  video: boolean;
  platforms: Platform;
}

export const projects: Project[] = [
  // {
  //   title: 'Resume',
  //   url: 'https://ericniemeyer.com',
  //   stack: ['Three.JS', 'React', 'SCSS'],
  //   stackIcon: null,
  //   description: ['Showcase of 3D Animation'],
  //   bullets: null,
  //   dbImage: null,
  //   icon: null,
  //   gif: null,
  //   video: false,
  //   platforms: 'both',
  // },
  // {
  //   title: 'Home',
  //   url: 'https://niemo.io',
  //   stack: ['Phaser3', 'React', 'TypeScript'],
  //   stackIcon: null,
  //   description: ['Showcase of Originality'],
  //   bullets: null,
  //   dbImage: null,
  //   icon: null,
  //   gif: null,
  //   video: false,
  //   platforms: 'both',
  // },
  {
    title: 'Smashed',
    url: 'https://smashed.niemo.io',
    stack: ['Phaser3', 'React', 'TypeScript', 'Express', 'MongoDB'],
    stackIcon: null,
    description: ['Multiplayer Gaming'],
    bullets: [
      'Rules-Based Bots',
      'Neural-Network Bots',
      'Best Experience with 4 USB SNES Controllers',
      'Two Players on Single Keyboard Also Possible',
    ],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: null,
    video: true,
    platforms: 'desktop',
  },
  {
    title: 'Seouldat',
    url: 'http://34.230.11.31:1444/',
    stack: ['Phaser3', 'React', 'TypeScript'],
    stackIcon: null,
    description: ['Online Multiplayer-Gaming'],
    bullets: ['Rules-Based Bots', 'Mobile or Desktop'],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: null,
    video: true,
    platforms: 'desktop',
  },
  {
    title: 'Space',
    url: 'https://games.niemo.io/space',
    stack: ['Phaser3', 'React', 'TypeScript'],
    stackIcon: null,
    description: ['Mobile Gaming'],
    bullets: ['Rules-Based Bots', 'Mobile or Desktop'],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: null,
    video: true,
    platforms: 'desktop',
  },
  {
    title: 'Tanks',
    url: 'https://games.niemo.io/tanks',
    stack: ['Phaser3', 'React', 'TypeScript'],
    stackIcon: null,
    description: ['Mobile Gaming'],
    bullets: ['Rules-Based Bots', 'Mobile or Desktop'],
    dbImage: null,
    icon: 'phaser-icon.png',
    gif: null,
    video: true,
    platforms: 'desktop',
  },
  {
    title: 'Design',
    url: 'https://design.niemo.io',
    stack: ['HTML', 'CSS', 'JavaScript'],
    stackIcon: null,
    description: ['Exercise in Style Control'],
    bullets: ['No Libraries', 'No Frameworks', 'Vanilla Web Development'],
    dbImage: null,
    icon: 'html_css_js.png',
    gif: null,
    video: true,
    platforms: 'desktop',
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
  //   gif: null,
  //   video: true,
  //   platforms: 'both',
  // },
  {
    title: 'Events',
    url: 'https://events.niemo.io',
    stack: ['C#, ASP.NET Core', 'MySQL'],
    stackIcon: null,
    description: ['Exercise in Web Tidiness'],
    bullets: [
      'CRUD Operations',
      'Data Validation',
      'MVC Design Pattern',
      'EF Core LINQ ORM (SQL)',
    ],
    dbImage: null,
    icon: 'csharp.png',
    gif: null,
    video: true,
    platforms: 'both',
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
  //   gif: null,
  //   video: true,
  //   platforms: 'both',
  // },
  {
    title: 'Media',
    url: 'https://soundcloud.com/niemoaudio/ars-niemo-small-talk-build-iv',
    stack: ['FL Studio', 'Adobe CS', 'WordPress', 'CloudFlare', 'Synology'],
    stackIcon: null,
    description: ['Original Productions'],
    bullets: [
      ' Visual Art',
      'Classical Music',
      'Electronic Music',
      'All Media Original',
    ],
    dbImage: null,
    icon: 'fruit.png',
    gif: null,
    video: true,
    platforms: 'both',
  },
];
