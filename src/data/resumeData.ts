// resumeData.ts

export interface Job {
  company: string
  title: string
  location: string
  dates: string
  bullets: string[]
}

export interface Education {
  degree: string
  school: string
  details: string[]
}

export const jobs: Job[] = [
  {
    company: 'Sentien',
    title: 'Head of Engineering',
    location: 'Stamford, Connecticut',
    dates: '2025 - Present',
    bullets: [
      'Architecting and implementing in-house AI systems to prevent senior phone fraud.',
    ],
  },
  {
    company: 'Venturetec',
    title: 'Lead Software Engineer',
    location: 'Stamford, Connecticut',
    dates: '2022 - 2025',
    bullets: [
      'Full-Stack Development: Implemented mobile apps (React Native, Vue, TypeScript, Laravel, SQL).',
      'Creative AI Solutions: Trained and built acoustic analysis AI video-generation apps (RNN-based, BrainJS), audio & video processing (FFT, MFCC, FFMPG, etc), interactive experiences.',
      'Web Games: Designed and built games for adults and kids, mobile & desktop (Phaser 3, Angular, Angular Material).',
    ],
  },
  {
    company: 'Rockwell Automation',
    title: 'Software Engineer II',
    location: 'St. Louis, Missouri',
    dates: '2018 - 2022',
    bullets: [
      'On-Site MES Configuration: Deployed and maintained industrial systems for clients like Lucid Motors, 3M, Cooper Tires, Continental Tire, and Maple Leaf Foods.',
      'System Integration: Coordinated third-party connectivity, debugged production issues, and managed legacy systems (Java, Pnuts) with Jira-based tracking.',
      'Team Leadership: Managed small dev teams, overseeing requirements updates, scheduling, and deliverables.',
    ],
  },
  // {
  //   company: 'Republic of Korea Ultimate',
  //   title: 'Executive Manager — 35-Team National Sports League',
  //   location: 'South Korea',
  //   dates: '2015 - 2017',
  //   bullets: [
  //     'Oversaw seasonal budgets of $150k, scheduling for 35 teams across multiple cities, and logistics for uniforms, equipment, and rosters.',
  //     'Worked closely with a Korean secretary to handle administration, league pools, and official meetings.',
  //   ],
  // },
  {
    company: '대구과학고등학교 영재고',
    title: 'High School ESL & Science Instructor',
    location: 'Daegu, South Korea',
    dates: '2013 - 2017',
    bullets: [
      'Built custom software to compile faculty schedules from a cryptic database and streamlined administrative processes.',
      'Taught advanced, immersion-focused STEM-based ESL courses to gifted high-school students.',
    ],
  },
  {
    company: 'A.C.L.E.',
    title: 'ESL Lead Instructor',
    location: 'Sanremo, Italy',
    dates: '2008 - 2013',
    bullets: [
      'Delivered over 25 immersive English courses and 12 pedagogy training sessions in 15 cities, serving diverse student groups.',
    ],
  },
]

export const educations: Education[] = [
  {
    degree: 'B.S. Computer Engineering',
    school: 'Southern Illinois University Edwardsville',
    details: [
      'With Honors, 3.73 GPA - 2018',
      'Major in Computer Engineering: Digital Design, Circuits, PCB, Microcontrollers, Digital Signal Processing, Signal Communication',
      'Minor in Computer Science: Data Structures & Algorithms, OS Design, Linux',
      'Minor in Mathematics: Calculus III, Differential Equations, Discrete Math, Engineering Statistics',
    ],
  },
  {
    degree: 'Web Dev Bootcamp',
    school: 'Coding Dojo',
    details: ['Black Belt Certification - 2022'],
  },
  {
    degree: 'B.S. Secondary Education',
    school: 'Southern Illinois University Edwardsville',
    details: ['Highschool Science Teaching Certification - 2013'],
  },
  {
    degree: 'A.A. Music Education',
    school: 'Lewis & Clark Community College',
    details: ['Violin Performance, Music Theory - 2010'],
  },
]
