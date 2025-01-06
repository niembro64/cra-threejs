// Resume.tsx

import React from 'react';
import { isMobile } from './MyThree';
import ProjectDemo from './ProjectDemo';
import { projects } from '../data/projects';

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
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
            <div className="spacer" />

            <h2>
              <a href="mailto:niemeyer.eric@gmail.com">
                niemeyer.eric@gmail.com
              </a>
            </h2>
            <h2
              onClick={() => {
                window.open('tel:618-616-3380');
              }}
            >
              618-616-338O
            </h2>
            <img
              className="gif-40"
              src="/videos2/smashed_small.gif"
              alt="asdf"
            />
            <p>
              Eric is an engineer specializing in web and mobile development,
              neural networks, and game design. He emphasizes defensive
              programming, strict type safety, and elegant solutions.
            </p>
            <div className="spacer" />
            <p>Stamford, Connecticut</p>
          </>
        )}
      </header>

      <div className="demo-projects-wrapper">
        <h1 className="demo-projects">Demos</h1>
      </div>

      <section>
        <h3>Navigation Game</h3>
        <iframe
          className="iframe-wide"
          src="https://projects.niemo.io"
          title="Projects"
          allowFullScreen
        ></iframe>
      </section>

      <div
        className="demo-projects-wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          alignItems: 'center',
        }}
      >
        {projects.map((project, index) => (
          <ProjectDemo key={index} project={project} />
        ))}
      </div>

      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />

      <section>
        <h3>Work Experience</h3>

        <div className="job">
          <h4>Venturetec</h4>
          <p className="job-title">
            Lead Software Engineer — Neural Networks, Mobile Apps, Web Games
          </p>
          <p>Stamford, Connecticut (Office & Remote) • 2022 - Present</p>
          <ul>
            <li>
              <strong>AI & Fraud Detection:</strong> Led the design of NN
              architectures (Transformers, RNNs) to analyze text, acoustic
              signals, and NLP data (Python, PyTorch, TensorFlow, AWS S3).
            </li>
            <li>
              <strong>Full-Stack Development:</strong> Implemented mobile apps
              (React Native, Vue, TypeScript, Laravel, SQL) and web games
              (Phaser 3, Angular, Angular Material).
            </li>
            <li>
              <strong>Creative AI Solutions:</strong> Delivered comedy/text
              generation apps (RNN-based), audio processing (FFT, MFCC), and
              interactive user experiences.
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>Rockwell Automation</h4>
          <p className="job-title">
            Software Engineer II — MES & Industrial Integration
          </p>
          <p>St. Louis, Missouri (Office & Remote) • 2018 - 2022</p>
          <ul>
            <li>
              <strong>On-Site MES Configuration:</strong> Deployed and
              maintained industrial systems for clients like Lucid Motors, 3M,
              Cooper Tires, Continental Tire, and Maple Leaf Foods.
            </li>
            <li>
              <strong>System Integration:</strong> Coordinated third-party
              connectivity, debugged production issues, and managed legacy
              systems (Java, Pnuts) with Jira-based tracking.
            </li>
            <li>
              <strong>Team Leadership:</strong> Managed small dev teams,
              overseeing requirements updates, scheduling, and deliverables.
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>Republic of Korea Ultimate</h4>
          <p className="job-title">
            Executive Manager — 35-Team National Sports League
          </p>
          <p>South Korea • 2015 - 2017</p>
          <ul>
            <li>
              Oversaw seasonal budgets of \$150k, scheduling for 35 teams across
              multiple cities, and logistics for uniforms, equipment, and
              rosters.
            </li>
            <li>
              Worked closely with a Korean secretary to handle administration,
              league pools, and official meetings.
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>Daegu Science High School</h4>
          <p className="job-title">
            ESL & Science Instructor — 대구과학고등학교 영재고
          </p>
          <p>Daegu, South Korea • 2013 - 2017</p>
          <ul>
            <li>
              Built custom software to compile faculty schedules from a cryptic
              database and streamlined administrative processes.
            </li>
            <li>
              Taught advanced, immersion-focused STEM-based ESL courses to
              gifted high-school students.
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>A.C.L.E.</h4>
          <p className="job-title">ESL Lead Instructor</p>
          <p>Sanremo, Italy • 2008 - 2013</p>
          <ul>
            <li>
              Delivered over 25 immersive English courses and 12 pedagogy
              training sessions in 15 cities, serving diverse student groups.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h3>Education</h3>
        <div className="education">
          <h4>B.S. Computer Engineering</h4>
          <p>Southern Illinois University Edwardsville</p>
          <p>Honors, 3.73 GPA - Dec 2018</p>
          <ul>
            <h1>Major in Computer Engineering</h1>
            <ul>
              <li>Digital Design, Circuits, PCB, Microcontrollers</li>
              <li>Digital Signal Processing, Signal Communication</li>
            </ul>
            <h1>Minor in Computer Science</h1>
            <ul>
              <li>Data Structures & Algorithms, OS Design, Linux</li>
            </ul>
            <h1>Minor in Mathematics</h1>
            <ul>
              <li>
                Calculus III, Differential Equations, Discrete Math, Engr Stats
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
            <li>
              TypeScript, JavaScript, Python, Java, C#, C++, MIPS/x86 Assembly,
              Verilog, Matlab, SQL (MTA), MongoDB, HTML, CSS
            </li>
          </ul>
        </div>
        <div className="frameworks">
          <h4>Frameworks</h4>
          <ul>
            <li>
              React, React Native, Vue, Angular, Node.js, Phaser 3, Three.js,
              Express.js, Brain.js, PyTorch, TensorFlow, Flask, Django, Laravel,
              .NET, Unity, SCSS
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h3>Other Technical Skills</h3>
        <ul>
          <li>Neural Networks, Transformers, RNNs</li>
          <li>HTML5 2D Game Development & 3D Animations</li>
          <li>Audio Engineering & Audio Production</li>
          <li>Video Production, Image Manipulation (Adobe Suite), etc.</li>
          <li>Home Server Tower</li>
          <ul>
            <li>
              Servers, Networking, Raspberry Pi Cluster, Arduino, Crypto Mining,
              Network Storage
            </li>
          </ul>
          <li>PCB Design & Electronics Repair</li>
          <li>Advanced Excel</li>
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
          <h4>Office Studio</h4>
          <img className="pic" src="/videos2/rn.jpg" alt="asdf" />
        </section>
        <section>
          <h4>Home Studio</h4>
          <img className="pic" src="/videos2/wfh_setup.jpg" alt="asdf" />
        </section>
      </section>
    </div>
  );
};
