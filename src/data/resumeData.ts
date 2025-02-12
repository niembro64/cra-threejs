// resumeData.ts

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
        lines: ['Phaser', 'React Native Game Engine'],
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
