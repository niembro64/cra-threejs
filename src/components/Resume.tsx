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
            Software Engineer - Developed Websites, Apps, & Web Games
          </p>
          <p>Stamford, Connecticut (Office & Remote)</p>
          <p>May 2022 - Today</p>

          <ul>
            <li>Client: AudienceAI</li>
            ...
            <li>Client: SLP (Spray-Foam Loyalty Program)</li>
          </ul>
        </div>
        <div className="job">
          <h4>Rockwell Automation</h4>
          <p className="job-title">
            Software Engineer II - Designed & Impl. Machine Execution Systems
            (MES)
          </p>
          <p>St. Louis, Missouri (Office & Remote)</p>
          <p>Dec 2018 - May 2022</p>

          <ul>
            <li>Client: Lucid Motors (Casa Grande, AZ)</li>
            ...
            <li>Client: Maple Leaf Foods (Shelbyville, IN)</li>
          </ul>
        </div>
        <div className="job">
          <h4>
            Daegu Science High School | Korea | Gifted Students High School
          </h4>
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
          <h4>
            A.C.L.E. | Italy | Associazione Culturale Linguistica Educational
          </h4>
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
            ...
            <li>Minor in Mathematics</li>
          </ul>
        </div>
      </section>
      <section>
        <h3>Languages & Frameworks</h3>
        <div className="languages">
          <ul>
            <li>TypeScript, JavaScript, Python, Java, C#, C++, C</li>
            ...
            <li>SQL Certified (MTA), MongoDB NoSQL, HTML, CSS, SCSS</li>
          </ul>
        </div>
        <div className="frameworks">
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
          ...
          <li>Wedding DJ, Concert Violinist, Composer</li>
        </ul>
      </section>
      <section>
        <h3>Human Languages</h3>
        <ul>
          <li>Italian: Conversational | Lived in Italy | Italian Girlfriend</li>
          <li>Spanish: Intermediate | International Experiences</li>
          <li>Korean: Basic | Lived in Korea</li>
        </ul>
      </section>
      <section className="horiz-section">
        <section>
          <h4>React-Native Development</h4>
          <img className="pic" src="/videos2/rn.jpg" alt="asdf" />
        </section>
        <section>
          <h4>WFH Battle Station</h4>
          <img className="pic" src="/videos2/wfh_setup.jpg" alt="asdf" />
        </section>
      </section>
      <h1 className="demo-projects">Projects</h1>
      <h1 className="demo">
        All Demos, Games, and Music are My Original Content.
      </h1>
    </body>
  );
};
