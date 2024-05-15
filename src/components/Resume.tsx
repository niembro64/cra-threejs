// new component for Resume.tsx

import React, { useEffect, useState } from 'react';
import { isMobile } from './MyComponent';
import AudioSpectrogram from './Spectrogram';

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 800) {
  //       setMobile(true);
  //     } else {
  //       setMobile(false);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <div className="body">
      <header>
        {/* {mobile && <p>Best Website Experience is on Desktop</p>} */}
        {!isMobile && <h3 className="name-resume">niemo.io</h3>}
        {isMobile && (
          <>
            <div className="spacer" />
            <div className="spacer" />
            <div className="spacer" />
            <div className="spacer" />
            <div className="spacer" />
            <h3 className="name-resume">niemo.io</h3>
            <div className="spacer" />
            <div className="spacer" />
            <div className="spacer" />
            <div className="spacer" />
            <div className="spacer" />
            <div className="spacer" />
            <h3 className="name-resume">Eric Niemeyer</h3>
            <img
              className="gif-40"
              src="/videos2/smashed_small.gif"
              alt="asdf"
            />
            <h2>Neural Networks, Mobile, Websites, Games</h2>
            <p>Stamford, Connecticut</p>
            <p>
              <a href="mailto:niemeyer.eric@gmail.com">
                niemeyer.eric@gmail.com
              </a>
            </p>
            <p>618-616-338O</p>
            {/* <p>
              <a href="https://niemo.io">https://niemo.io</a>
            </p> */}
          </>
        )}
      </header>
      {!isMobile && (
        <section>
          <iframe
            className={'iframe-wide'}
            src="https://projects.niemo.io"
            title="Projects"
            // width="100%"
            // height="500px"
            // frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
        </section>
      )}
      {/* <section>
        <AudioSpectrogram />
      </section> */}
      <section>
        <h3>Work Experience</h3>
        <div className="job">
          <h4>Venturetec</h4>
          <p className="job-title">
            Lead Software Engineer - Develops Neural Networks, Mobile Apps, &
            Web Games, Websites
          </p>
          <p>Stamford, Connecticut (Office & Remote)</p>
          <p>2022 - Today</p>
          <ul>
            <li>
              <h1>SeniorSafe</h1>
              <ul>
                <li>
                  Lead Neural Network Engineer: Design & train fraud detection
                  neural networks
                </li>
                <li>
                  Transformer & Recurrent Neural Networks, Natural Language
                  Processing, Acoustic & Text Features
                </li>
                <li>Pytorch, Python, TensorFlow, AWS S3</li>
              </ul>
            </li>
            <li>
              <h1>AudienceAI</h1>
              <ul>
                <li>Lead Engineer: Design & implementation of AI comedy app</li>
                <li>Recurrent Neural Networks, Natural Language Processing</li>
                <li>FFT, MFCCs, React Native, Express, AWS S3</li>
              </ul>
            </li>
            <li>
              <h1>The Games Agency & McGraw-Hill</h1>
              <ul>
                <li>
                  Implemented puzzles, sticker books, & reading-reaction games
                  for young learners.
                </li>
                <li>Phaser 3, Angular, Angular Material</li>
              </ul>
            </li>
            <li>
              <h1>Redleaf</h1>
              <ul>
                <li>Implemented business website</li>
                <li>Angular, TypeScript, Bootstrap, Express</li>
              </ul>
            </li>
            {/* <li>
              <h1>Punchey (Payment Processor)</h1>
              <ul>
                <li>Maintenance & new features</li>
                <li>React Native CLI, iOS & Android</li>
              </ul>
            </li> */}
            <li>
              <h1>Spray-Foam Loyalty Program</h1>
              <ul>
                <li>Lead Front-End Developer</li>
                <li>React Native CLI, Vue, Typescript, Laravel, SQL</li>
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
          <p>2018 - 2022</p>
          <ul>
            <li>
              <h1>Lucid Motors (Casa Grande, AZ)</h1>
              <ul>
                <li>Configured MES on-site in production environment</li>
                <li>
                  Integrated 3rd-party components into a system of systems
                </li>
                <li>Debugged & wrote scripts for configuring connectivity</li>
              </ul>
            </li>
            <li>
              <h1>3M Incinerator Facility (Cottage Grove, MN)</h1>
              <ul>
                <li>Managed a small development team</li>
                <li>Maintained requirements, schedule</li>
              </ul>
            </li>
            <li>
              <h1>Cooper Tires (Texarkana, AR)</h1>
              <ul>
                <li>Documented Customer Requirements</li>
              </ul>
            </li>
            <li>
              <h1>Continental Tire (Mt. Vernon, IL)</h1>
              <ul>
                <li>
                  Maintained legacy system, Java, Pnuts, code tracking, Jira
                </li>
              </ul>
            </li>
            <li>
              <h1>Maple Leaf Foods (Shelbyville, IN)</h1>
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
          <h4>Republic of Korea Ultimate</h4>
          <p className="job-title">
            Executive Manager - Managed 35-Team National Sports League
          </p>
          <p>South Korea</p>
          <p>2015 - 2017</p>
          <ul>
            <h1>Managed Money</h1>
            <ul>
              <li>Budgeted $100k/Season Funds</li>
              <li>Field Fees</li>
              <li>Equipment</li>
            </ul>
            <h1>Managed Materials</h1>
            <ul>
              <li>Uniforms</li>
              <li>Merchandise</li>
              <li>Field Equipment</li>
            </ul>
            <h1>Managed Schedules</h1>
            <ul>
              <li>35 Teams from Around the Whole Country</li>
              <li>Each Team to play Every Other Team Twice per Season</li>
              <li>Coordination with National Train Schedules</li>
            </ul>
            <h1>Managed People</h1>
            <ul>
              <li>Korean Secretary</li>
              <li>Managed Roster-Zoning-Pools</li>
              <li>Board Meetings</li>
              <li>Captains Meetings</li>
            </ul>
          </ul>
        </div>

        <div className="job">
          <h4>Daegu Science High School</h4>
          <p className="job-title">
            ESL & Science Instructor - 대구과학고등학교 영재고
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
          <h4>B.S. Computer Engineering - Honors 3.73 GPA</h4>
          <p>Southern Illinois University Edwardsville (SIUE)</p>
          <p>Dec 2018</p>
          <ul>
            <h1>Major in Computer Engineering</h1>
            <ul>
              <li>
                Digital Design, PSpice, Circuits, PCB Design, Microcontrollers
              </li>
              <li>Digital Signal Processing, Signal Communication</li>
            </ul>
            <h1>Minor in Computer Science</h1>
            <ul>
              <li>Data Structures & Algorithms, OS Design, Linux</li>
            </ul>
            <h1>Minor in Mathematics</h1>
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
              JAVASCRIPT - React, React-Native, Vue, Angular, Node.js, Phaser 3,
              Three.js, Express.js, Brain.js
            </li>
            <li>PYTHON - Pytorch, TensorFlow, Flask, Django, Laravel</li>
            <li>C# - .NET, Unity</li>
            <li>
              STYLING - HTML, SCSS, CSS, HTML, Bootstrap, Material-UI, Angular
              Material, Tailwind
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h3>Other Technical Skills</h3>
        <ul>
          <li>Transformer, Recurrent Neural Networks</li>
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
          <li>Italian: Conversational</li>
          <li>Spanish: Intermediate</li>
          <li>Korean: Basic</li>
        </ul>
      </section>
      <section className="horiz-section">
        <section>
          <h4>Android & iOS Dev</h4>
          <img className="pic" src="/videos2/rn.jpg" alt="asdf" />
        </section>
        <section>
          <h4>WFH Setup</h4>
          <img className="pic" src="/videos2/wfh_setup.jpg" alt="asdf" />
        </section>
      </section>
    </div>
  );
};
