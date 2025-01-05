// Resume.tsx

import React from 'react';
import { isMobile } from './MyThree';

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

            <p>Stamford, Connecticut</p>
            <p>
              <a href="mailto:niemeyer.eric@gmail.com">
                niemeyer.eric@gmail.com
              </a>
            </p>
            <p>618-616-338O</p>
            <img
              className="gif-40"
              src="/videos2/smashed_small.gif"
              alt="asdf"
            />
            <h2>
              Eric is an engineer specializing in web and mobile development,
              creating neural networks, web applications, and games. He
              prioritizes defensive programming, strict type safety, and elegant
              solutions.
            </h2>
          </>
        )}
      </header>

      {!isMobile && (
        <section>
          <iframe
            className="iframe-wide"
            src="https://projects.niemo.io"
            title="Projects"
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
            Lead Software Engineer — Neural Networks, Mobile Apps, Web Games,
          </p>
          <p>Stamford, Connecticut (Office & Remote)</p>
          <p>2022 - Today</p>
          <ul>
            <li>
              <h1>SeniorSafe</h1>
              <ul>
                <li>
                  Led fraud detection NN architecture, using Transformers and
                  RNNs for NLP, acoustic, and text analysis
                </li>
                <li>Developed in Python (PyTorch, TensorFlow) and AWS S3</li>
              </ul>
            </li>
            <li>
              <h1>Spray-Foam Loyalty Program</h1>
              <ul>
                <li>Served as Lead Front-End Developer</li>
                <li>React Native CLI, Vue, TypeScript, Laravel, SQL</li>
              </ul>
            </li>
            <li>
              <h1>AudienceAI</h1>
              <ul>
                <li>
                  Designed & implemented an AI comedy app with RNN-based
                  language generation
                </li>
                <li>
                  React Native, Express, AWS S3, FFT, MFCC for audio processing
                </li>
              </ul>
            </li>
            <li>
              <h1>The Games Agency & McGraw-Hill</h1>
              <ul>
                <li>
                  Built interactive puzzles, sticker books, & reading-reaction
                  mini-games for young learners
                </li>
                <li>Phaser 3, Angular, Angular Material</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>Rockwell Automation</h4>
          <p className="job-title">
            Software Engineer II — Designed & Implemented Machine Execution
            Systems (MES)
          </p>
          <p>St. Louis, Missouri (Office & Remote)</p>
          <p>2018 - 2022</p>
          <ul>
            <li>
              <h1>Lucid Motors (Casa Grande, AZ)</h1>
              <ul>
                <li>Configured MES on-site in a live production environment</li>
                <li>
                  Integrated 3rd-party systems into overall MES architecture
                </li>
                <li>Developed scripts and debugged connectivity issues</li>
              </ul>
            </li>
            <li>
              <h1>3M Incinerator Facility (Cottage Grove, MN)</h1>
              <ul>
                <li>Led a small development team, maintaining schedules</li>
                <li>Updated requirements and tracked progress</li>
              </ul>
            </li>
            <li>
              <h1>Cooper Tires (Texarkana, AR)</h1>
              <ul>
                <li>Gathered and documented client requirements for MES</li>
              </ul>
            </li>
            <li>
              <h1>Continental Tire (Mt. Vernon, IL)</h1>
              <ul>
                <li>
                  Maintained a legacy system (Java, Pnuts) with Jira-based issue
                  tracking
                </li>
              </ul>
            </li>
            <li>
              <h1>Maple Leaf Foods (Shelbyville, IN)</h1>
              <ul>
                <li>
                  Supported industrial database connectivity, reporting, and
                  business logic
                </li>
                <li>Built a VBA-driven management tool</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="job">
          <h4>Republic of Korea Ultimate</h4>
          <p className="job-title">
            Executive Manager — Managed 35-Team National Sports League
          </p>
          <p>South Korea</p>
          <p>2015 - 2017</p>
          <ul>
            <h1>Managed Money</h1>
            <ul>
              <li>Oversaw $150k per season</li>
              <li>Handled field fees and general league expenses</li>
            </ul>
            <h1>Managed Materials</h1>
            <ul>
              <li>Coordinated uniforms, equipment, and merchandise</li>
            </ul>
            <h1>Managed Schedules</h1>
            <ul>
              <li>Scheduled 35 teams nationwide for home/away matches</li>
              <li>Coordinated with national train timetables</li>
            </ul>
            <h1>Managed People</h1>
            <ul>
              <li>Worked closely with a Korean secretary</li>
              <li>Managed rosters, zones/pools, and official meetings</li>
            </ul>
          </ul>
        </div>

        <div className="job">
          <h4>Daegu Science High School</h4>
          <p className="job-title">
            ESL & Science Instructor — 대구과학고등학교 영재고
          </p>
          <p>Daegu, South Korea</p>
          <p>2013 - 2017</p>
          <ul>
            <li>
              Built software to compile faculty schedules from a cryptic
              database
            </li>
            <li>
              Taught specialized college-prep English and science courses,
              emphasizing immersion
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
              Designed & delivered 25 English courses and 12 pedagogy courses in
              15 different cities
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
              <li>Digital Design, PSpice, Circuits, PCB, Microcontrollers</li>
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
