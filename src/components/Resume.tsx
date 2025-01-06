import React from 'react';
import { isMobile } from './MyThree';
import { projects } from '../data/projects';
import ProjectDemo from './ProjectDemo';
import { jobs, educations } from '../data/resumeData';

export const Resume: React.FC = () => {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <header className="text-center mb-8">
        {!isMobile && (
          <>
            <div className="h-40" />
            {/* <div className="h-40" />
            <div className="h-40" /> */}
            {/* <h3 className="text-6xl font-bold mb-2">niemo.io</h3> */}

            <p className="text-3xl uppercase bold">
              Eric is an engineer specializing in web and mobile development,
              neural networks, and game design. He emphasizes defensive
              programming, strict type safety, and elegant solutions.
            </p>
            <div className="h-40" />
          </>
        )}
        {isMobile && (
          <>
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
            <div className="h-40" />
            <div className="h-40" />
          </>
        )}
      </header>

      <section className="mb-8">
        <h3 className="w-full text-4xl text-center font-semibold mb-2">
          Demo Navigation Game
        </h3>
        {isMobile && (
          <p className="text-center mb-4">game prevents scrolling</p>
        )}

        <iframe
          className={`w-full ${
            isMobile ? 'h-[400px]' : 'h-[600px]'
          } rounded-2xl shadow-lg border border-white/30`}
          src="https://projects.niemo.io"
          title="Projects"
          allowFullScreen
        ></iframe>
      </section>

      <div className="h-40" />
      <div className="h-40" />
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold">Demos</h1>
      </div>
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
            <h4 className="text-3xl font-bold">{job.company}</h4>
            <p className="italic text-2xl">{job.title}</p>
            <p
              className="text-xl"
            >
              {job.location} • {job.dates}
            </p>
            <ul className="list-disc ml-6 mt-2 text-xl">
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
            <h4 className="text-3xl font-bold">{edu.degree}</h4>
            <p className="italic text-xl">{edu.school}</p>
            <ul className="list-disc ml-6 mt-2 text-xl">
              {edu.details.map((detail, i) => (
                <li key={i} className="mb-2">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="h-40" />
      <section className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold">Fun Facts</h1>
        </div>

        <div className="mb-8">
          <h4 className="text-3xl font-bold">Featured on Wikipedia</h4>
          <p className="mt-2  text-xl">
            Eric's track{' '}
            <a
              href="https://en.wikipedia.org/wiki/File:Ars_Niemo_-_Small_Talk_Build_IV.ogg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline text-xl"
            >
              "Small Talk (Build IV)"
            </a>{' '}
            is showcased on the{' '}
            <a
              href="https://en.wikipedia.org/wiki/Drum_and_bass"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline text-xl"
            >
              Drum and Bass
            </a>{' '}
            Wikipedia main page, representing the sole Drum and Bass example
            featured.
          </p>
        </div>
      </section>
    </div>
  );
};
