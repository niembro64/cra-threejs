// resumeData.ts

export interface Job {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  school: string;
  details: string[];
}

export const jobs: Job[] = [
  {
    company: 'Venturetec',
    title: 'Lead Software Engineer — Neural Networks, Mobile Apps, Web Games',
    location: 'Stamford, Connecticut (Office & Remote)',
    dates: '2022 - Present',
    bullets: [
      'AI & Fraud Detection: Led the design of NN architectures (Transformers, RNNs)...',
      'Full-Stack Development: Implemented mobile apps (React Native, Vue...)',
      'Creative AI Solutions: Delivered comedy/text generation apps...',
    ],
  },
  {
    company: 'Rockwell Automation',
    title: 'Software Engineer II — MES & Industrial Integration',
    location: 'St. Louis, Missouri (Office & Remote)',
    dates: '2018 - 2022',
    bullets: [
      'On-Site MES Configuration: Deployed & maintained industrial systems...',
      'System Integration: Coordinated 3rd-party connectivity, debugged production...',
      'Team Leadership: Managed small dev teams...',
    ],
  },
  // add the other job entries...
];

export const educations: Education[] = [
  {
    degree: 'B.S. Computer Engineering',
    school: 'Southern Illinois University Edwardsville',
    details: [
      'Honors, 3.73 GPA - Dec 2018',
      'Major in Computer Engineering: Digital Design, Circuits, ...',
      'Minor in Computer Science: Data Structures & Algorithms, ...',
      'Minor in Mathematics: Calculus III, Diff Eq...',
    ],
  },
];
