export type Title =
  | 'Resume'
  | 'Home'
  | 'Design'
  | 'Smashed'
  | 'Pirates'
  | 'Events'
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
  //   url: 'https://niembro64.com',
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
    title: 'Design',
    url: 'https://design.niembro64.com',
    stack: ['HTML', 'CSS', 'JavaScript'],
    stackIcon: null,
    description: ['Showcase of Control'],
    bullets: null,
    dbImage: null,
    icon: null,
    gif: null,
    video: true,
    platforms: 'desktop',
  },
  {
    title: 'Smashed',
    url: 'https://smashed.niembro64.com',
    stack: ['Phaser3', 'React', 'TypeScript', 'Express', 'MongoDB'],
    stackIcon: null,
    description: ['Showcase of HTML5 Gaming'],
    bullets: [
      'Rules-Based Bots',
      'Neural-Network Bots',
      'Best Experience with 4 USB SNES Controllers',
      'Two Players on Single Keyboard Also Possible',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: true,
    platforms: 'desktop',
  },
  {
    title: 'Pirates',
    url: 'https://pirates.niembro64.com',
    stack: ['React', 'Express', 'MongoDB'],
    stackIcon: null,
    description: ['Exercise in Form Validation'],
    bullets: [
      'CRUD Operations',
      'Both Front-End and Back-End Validation',
      'Validations from Back-End for Data Integrity',
      'Validations on Front-End for User Experience',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: true,
    platforms: 'both',
  },
  {
    title: 'Events',
    url: 'https://events.niembro64.com',
    stack: ['C#, ASP.NET Core', 'MySQL'],
    stackIcon: null,
    description: ['Exercise in Tidiness'],
    bullets: [
      'CRUD Operations',
      'Data Validation',
      'MVC Design Pattern',
      'EF Core LINQ ORM (SQL)',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: true,
    platforms: 'both',
  },
  {
    title: 'Shows',
    url: 'https://shows.niembro64.com',
    stack: ['Python', 'Flask', 'MySQL'],
    stackIcon: null,
    description: ['Exercise in Simplicity'],
    bullets: [
      'CRUD Operations',
      'Data Validation',
      'MVC Design Pattern',
      'Bcrypt Password Hashing',
      'SQL Query String Composition Method, No ORM',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: true,
    platforms: 'both',
  },
  {
    title: 'Media',
    url: 'https://media.niembro64.com',
    stack: ['FL Studio', 'Adobe CS', 'WordPress', 'CloudFlare', 'Synology'],
    stackIcon: null,
    description: ['Showcase of Original Music'],
    bullets: [
      ' Visual Art',
      'Classical Music',
      'Electronic Music',
      'All Media Original',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: true,
    platforms: 'both',
  },
];
