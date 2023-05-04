// new component for Resume.tsx

import React from 'react';

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
  return (
    <body>
      <header>
        <h1>Eric Michael Niemeyer</h1>
        <img className="gif" src="/videos2/smashed_small.gif" alt="asdf" />
        <h2>Computer Engineer, Web Developer, & Game Developer</h2>
        <p>Stamford, Connecticut</p>
        <p>
          Email:{' '}
          <a href="mailto:niemeyer.eric@gmail.com">niemeyer.eric@gmail.com</a>
        </p>
        <p>Phone: +1 (618) 616-3380</p>
        <p>
          My Website: <a href="https://niembro64.com">niembro64.com</a>
        </p>
      </header>
      <section>
        <h3>Work Experience</h3>
        <div className="job">
          <h4>Venturetec</h4>
          <p className="job-title">
            Software Engineer - Developed Websites, Mobile Apps, & Web Games
          </p>
          <p>Stamford, Connecticut (Office & Remote)</p>
          <p>May 2022 - Today</p>
          <ul>
            <li>
              Client: AudienceAI
              <ul>
                <li>Lead Engineer: Design & implementation of AI comedy app</li>
                <li>Recurrent Neural Networks, Natural Language Processing</li>
                <li>FFT, MFCCs, React Native, Express, AWS S3</li>
              </ul>
            </li>
            <li>
              Client: The Games Agency & McGraw Hill Educational Publishing
              <ul>
                <li>
                  Implemented puzzles, sticker books, & reading-reaction games
                  for young learners.
                </li>
                <li>Phaser 3, Angular 2+, Angular Material Drag & Drop</li>
              </ul>
            </li>
            <li>
              Client: Redleaf
              <ul>
                <li>Implemented business website</li>
                <li>Angular 2+, TypeScript, Bootstrap, Express</li>
              </ul>
            </li>
            <li>
              Client: Punchey (Payment Processor)
              <ul>
                <li>Maintenance & new features</li>
                <li>React Native CLI, iOS & Android</li>
              </ul>
            </li>
            <li>
              Client: SLP (Spray-Foam Loyalty Program)
              <ul>
                <li>Maintenance & new features</li>
                <li>React Native CLI, Typescript, Django, SQL</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>Rockwell Automation</h4>
          <p className="job-title">
            Software Engineer II - Designed & Implemented Machine Execution
            Systems (MES)
          </p>
          <p>St. Louis, Missouri (Office & Remote)</p>
          <p>Dec 2018 - May 2022</p>
          <ul>
            <li>
              Client: Lucid Motors (Casa Grande, AZ)
              <ul>
                <li>Configured MES on-site in production environment</li>
                <li>
                  Integrated 3rd-party components into a system of systems
                </li>
                <li>Debugged & wrote scripts for configuring connectivity</li>
              </ul>
            </li>
            <li>
              Client: 3M Incinerator Facility (Cottage Grove, MN)
              <ul>
                <li>Managed a small development team</li>
                <li>Maintained requirements, schedule</li>
              </ul>
            </li>
            <li>
              Client: Cooper Tires (Texarkana, AR)
              <ul>
                <li>Documented Customer Requirements</li>
              </ul>
            </li>
            <li>
              Client: Continental Tire (Mt. Vernon, IL)
              <ul>
                <li>
                  Maintained legacy system, Java, Pnuts, code tracking, Jira
                </li>
              </ul>
            </li>
            <li>
              Client: Maple Leaf Foods (Shelbyville, IN)
              <ul>
                <li>
                  Supported Business Layer of Industrial Processes, DBs,
                  Connectivity, Reports
                </li>
                <li>Built VBA management system</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>Daegu Science High School</h4>
          <p className="job-title">
            ESL & Science Instructor | 대구과학고등학교 영재고
          </p>
          <p>Daegu, South Korea</p>
          <p>2013 - 2017</p>
          <ul>
            <li>
              Programmed application that compiles faculty schedules from
              cryptic database
            </li>
            <li>
              Led college-prep English & science classes, English immersion
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>A.C.L.E.</h4>
          <p className="job-title">ESL Lead Instructor</p>
          <p>Sanremo, Italy</p>
          <p>2008 - 2013</p>
          <ul>
            <li>
              Developed & taught 25 English courses and 12 Pedagogy courses in
              15 cities
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h3>Education</h3>
        <div className="education">
          <h4>B.S. Computer Engineering | Honors | 3.73 GPA</h4>
          <p>Southern Illinois University Edwardsville (SIUE)</p>
          <p>Dec 2018</p>
          <ul>
            <li>Major in Computer Engineering</li>
            <ul>
              <li>
                Digital Design, PSpice, Circuits, PCB Design, Microcontrollers
              </li>
              <li>Digital Signal Processing, Signal Communication</li>
            </ul>
            <li>Minor in Computer Science</li>
            <ul>
              <li>Data Structures & Algorithms, OS Design, Linux</li>
            </ul>
            <li>Minor in Mathematics</li>
            <ul>
              <li>
                Calculus 3, Differential Equations, Discrete Mathematics, Engr
                Statistics
              </li>
            </ul>
          </ul>
        </div>
      </section>
      <section>
        <h3>Code</h3>
        <div className="languages">
          <h4>Languages</h4>
          <ul>
            <li>TypeScript, JavaScript, Python, Java, C#, C++, C</li>
            <li>MIPS/x86 Assembly Language, Verilog, Matlab</li>
            <li>SQL Certified (MTA), MongoDB NoSQL, HTML, CSS, SCSS</li>
          </ul>
        </div>
        <div className="frameworks">
          <h4>Frameworks</h4>
          <ul>
            <li>
              React, React-Native, Angular 2, Flask, Django, ASP.NET, Express
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h3>Other Technical Skills & Hobbies</h3>
        <ul>
          <li>Recurrent Neural Networks</li>
          <li>HTML5 2D Game Development, 3D Animations</li>
          <li>Audio Engineering & Audio Production</li>
          <li>
            Video Production, Image Manipulation, Adobe Creative Suite, etc.
          </li>
          <li>Personal Home Server Rack</li>
          <ul>
            <li>
              Servers, Networking, Raspberry Pi Cluster, Arduino, Crypto Mining,
              Network Storage
            </li>
          </ul>
          <li>PCB Design & Repair (Electronics)</li>
          <li>Excel Expert</li>
          <li>ROM Hacking (Retro Games)</li>
          <li>Wedding DJ, Concert Violinist, Composer</li>
        </ul>
      </section>
      <section>
        <h3>Human Languages</h3>
        <ul>
          <li>English: Native</li>
          <li>Italian: Conversational, Lived in Italy, Italian Girlfriend</li>
          <li>Spanish: Intermediate, International Experiences</li>
          <li>Korean: Basic, Lived in Korea</li>
        </ul>
      </section>

      <section className="horiz-section">
        <section>
          <h4>React-Native Development</h4>
          <img className="pic" src="/videos2/rn.jpg" alt="asdf" />
        </section>
        <section>
          <h4>Work From Home Setup</h4>
          <img className="pic" src="/videos2/wfh_setup.jpg" alt="asdf" />
        </section>
      </section>
    </body>
  );
};
