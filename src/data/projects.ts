export type ProjectName =
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
  name: ProjectName;
  url: string;
  stack: string[] | null;
  description: string[] | null;
  bullets: string[] | null;
  dbImage: string | null;
  icon: string | null;
  gif: string | null;
  video: string | null;
  platforms: Platform;
}

export const projects: Project[] = [
  {
    name: 'Resume',
    url: 'https://ericniemeyer.com',
    stack: ['Three.JS', 'React', 'TypeScript'],
    description: ['3D Animation'],
    bullets: null,
    dbImage: null,
    icon: null,
    gif: null,
    video: null,
    platforms: 'both',
  },
  {
    name: 'Home',
    url: 'https://niembro64.com',
    stack: ['Phaser3', 'React', 'TypeScript'],
    description: ['Platforms Built From Rendered React Page'],
    bullets: null,
    dbImage: null,
    icon: null,
    gif: null,
    video: null,
    platforms: 'both',
  },
  {
    name: 'Design',
    url: 'https://design.niembro64.com',
    stack: ['HTML', 'CSS', 'JavaScript'],
    description: ['Front-End Exercies in the Web Standard'],
    bullets: null,
    dbImage: null,
    icon: null,
    gif: null,
    video: null,
    platforms: 'desktop',
  },
  {
    name: 'Smashed',
    url: 'https://smashed.niembro64.com',
    stack: ['Phaser3', 'React', 'TypeScript', 'MongoDB'],
    description: ['Showcasing HTML5 Gaming'],
    bullets: [
      'Best Experience with 4 USB SNES Controllers',
      'Two Players on Single Keyboard Also Possible',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: null,
    platforms: 'desktop',
  },
  {
    name: 'Pirates',
    url: 'https://pirates.niembro64.com',
    stack: ['Phaser3', 'React', 'MongoDB'],
    description: ['Exercise in Form Validation'],
    bullets: [
      'Both Front-End and Back-End Validation',
      'Validations on Front-End for User Experience',
      'Validations from Back-End for Data Integrity',
      'CRUD Operations',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: null,
    platforms: 'both',
  },
  {
    name: 'Events',
    url: 'https://events.niembro64.com',
    stack: ['C#, ASP.NET Core', 'MySQL'],
    description: ['Exercise in Tidiness'],
    bullets: [
      'EF Core LINQ ORM (SQL)',
      'MVC Design Pattern',
      'CRUD Operations',
      'Data Validation',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: null,
    platforms: 'both',
  },
  {
    name: 'Shows',
    url: 'https://shows.niembro64.com',
    stack: ['Python', 'Flask', 'MySQL'],
    description: ['Exercise in Simplicity'],
    bullets: [
      'SQL Query String Composition Method, No ORM',
      'MVC Design Pattern',
      'CRUD Operations',
      'Data Validation',
      'Bcrypt Password Hashing',
    ],
    dbImage: null,
    icon: null,
    gif: null,
    video: null,
    platforms: 'both',
  },
  {
    name: 'Media',
    url: 'https://media.niembro64.com',
    stack: ['WordPress', 'CloudFlare', 'Synology'],
    description: ['Showcase of Media Original Art'],
    bullets: ['Classical Music', 'Electronic Music', ' Visual Art'],
    dbImage: null,
    icon: null,
    gif: null,
    video: null,
    platforms: 'both',
  },
];
