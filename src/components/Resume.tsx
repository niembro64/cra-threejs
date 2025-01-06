import React from 'react';
import { isMobile } from './MyThree';
import { projects } from '../data/projects';
import ProjectDemo from './ProjectDemo';
import { jobs, educations } from '../data/resumeData';

export const Resume: React.FC = () => {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <header className="text-center mb-8">
        {!isMobile && <h3 className="text-3xl font-bold mb-2">niemo.io</h3>}
        {isMobile && (
          <>
            <div className="h-40" />
            <div className="h-40" />
            <div className="h-40" />
            <div className="h-40" />

            <h3 className="text-6xl font-bold mb-2">niemo.io</h3>
            <div className="h-40" />
            <div className="h-40" />
            <div className=" h-40" />
            <h3 className="text-6xl font-bold mb-2">ERIC NIEMEYER</h3>
            {/* <div className="h-40" /> */}
            <h2>
              <a
                href="mailto:niemeyer.eric@gmail.com"
                className="text-2xl underline"
              >
                niemeyer.eric@gmail.com
              </a>
            </h2>
            <h2
              onClick={() => window.open('tel:618-616-3380')}
              className="text-2xl cursor-pointer underline"
            >
              618-616-338O
            </h2>

            <div className="h-40 flex flex-row justify-center items-center">
              <img
                className="w-4/5 pixel-art"
                src="/videos2/smashed_small.gif"
                alt="gif"
              />
            </div>
            <p className="mb-4 uppercase">
              Eric is an engineer specializing in web and mobile development,
              neural networks, and game design. He emphasizes defensive
              programming, strict type safety, and elegant solutions.
            </p>
            <p className="text-2xl uppercase">Stamford, Connecticut</p>
          </>
        )}
      </header>
      <div className="h-40" />
      <div className="h-40" />
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold">Demos</h1>
      </div>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Navigation Game</h3>
        <iframe
          className="w-full h-[600px] rounded-2xl shadow-lg"
          src="https://projects.niemo.io"
          title="Projects"
          allowFullScreen
        ></iframe>
      </section>
      <div className="flex flex-col items-center mb-8">
        {projects.map((project, index) => (
          <ProjectDemo key={index} project={project} />
        ))}
      </div>

      <div className="h-40" />
      <div className="h-40" />

      <section className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold">Work Experience</h1>
        </div>
        {/* <h3 className="text-6xl font-bold mb-4">Work</h3> */}
        {jobs.map((job, idx) => (
          <div key={idx} className="mb-8">
            <h4 className="text-xl font-bold">{job.company}</h4>
            <p className="italic">{job.title}</p>
            <p>
              {job.location} • {job.dates}
            </p>
            <ul className="list-disc ml-6 mt-2">
              {job.bullets.map((b, i) => (
                <li key={i} className="mb-2">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="h-40" />
      <section className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold">Education</h1>
        </div>
        {educations.map((edu, idx) => (
          <div key={idx} className="mb-8">
            <h4 className="text-xl font-bold">{edu.degree}</h4>
            <p className="italic">{edu.school}</p>
            <ul className="list-disc ml-6 mt-2">
              {edu.details.map((detail, i) => (
                <li key={i} className="mb-2">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      {/* Add more sections for Code, Skills, etc., using .map(...) with your arrays */}
    </div>
  );
};
