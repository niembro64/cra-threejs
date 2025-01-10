import React from 'react';
import { EricResumeDescription, projects } from '../data/projects';
import { educations, jobs } from '../data/resumeData';
import { useAudioStore } from '../store/audioStore';
import { isMobile } from './MyThree';
import ProjectDemo from './ProjectDemo';

export const Resume: React.FC = () => {
  const {
    mutedArray: isMutedArray,
    setMuted: setIsMuted,
    hasTouchedAudioButton,
  } = useAudioStore();

  return (
    <div className="w-full md:px-12 py-4">
      {isMobile && (
        <>
          <div className="h-40" />
          <div className="h-40" />
          <div className="h-40" />
          <h3 className="w-full text-center text-6xl font-bold mb-2">
            niemo.io
          </h3>
          <div className="h-40" />
          <div className="h-40" />
          <div className=" h-40" />
          <section
            className={`px-4 py-12 ${
              isMobile ? 'bg-black/70' : ''
            } text-center`}
          >
            <h3 className="text-6xl font-bold mb-2">ERIC NIEMEYER</h3>
            <p className="text-2xl uppercase text-blue-300">
              Stamford, Connecticut
            </p>

            <div className="h-40 flex flex-row justify-center items-center">
              <img
                className="w-4/5 pixel-art"
                src="/videos2/smashed_small.gif"
                alt="gif"
              />
            </div>
            <p className="text-2xl mb-4 text-blue-100">
              {EricResumeDescription}
            </p>
          </section>
          <div className="h-40" />
          <div className="h-40" />
        </>
      )}

      <section
        className={`px-8 py-12 ${isMobile ? 'bg-black/70' : ''} shadow-lg`}
      >
        <div className="text-center mb-24">
          <h1 className="text-6xl font-bold">PROJECTS</h1>

          <p className="text-2xl pt-4 text-blue-300">
            Original Apps, Music, & Games for Mobile & Desktop
          </p>
        </div>
        <div className="flex flex-col items-center mb-8">
          {projects.map((project, index) => (
            <div
              key={project.title + index}
              className={`${isMobile ? 'w-full' : 'w-[45vw]'}`}
            >
              {index !== 0 && <div className="w-full h-16"></div>}
              <ProjectDemo
                key={index}
                project={project}
                isMuted={isMutedArray[index]}
                setIsMuted={() => {
                  const nextState: boolean = !isMutedArray[index];

                  setIsMuted(index, nextState);
                }}
                hasTouchedAMuteButton={hasTouchedAudioButton}
              />
              <div className="w-full h-16"></div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-40" />
      <div className="h-40" />

      <div className="h-40" />
      <div className="h-40" />
      {!isMobile && (
        <section
          className={`px-4 py-12 ${
            isMobile ? 'bg-slate-900/50' : ''
          } text-center`}
        >
          {/* <h3 className="text-[1000%]  font-bold mb-2">niemo.io</h3> */}
          <div className="h-40" />
          <p className="text-3xl bold">{EricResumeDescription}</p>
          <div className="h-40" />
        </section>
      )}

      <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold">Work Experience</h1>
        </div>
        {/* <h3 className="text-6xl font-bold mb-4">Work</h3> */}
        {jobs.map((job, idx) => (
          <div key={job.title + idx} className="mb-8">
            <h4 className="text-3xl font-bold text-blue-300">{job.company}</h4>
            <p className="italic text-2xl text-fuchsia-300">{job.title}</p>
            <p className="text-xl text-emerald-300">
              {job.location} • {job.dates}
            </p>
            <ul className="list-disc ml-6 mt-2 text-xl">
              {job.bullets.map((b, i) => (
                <li key={b + i} className="mb-2">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="h-40" />
      <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold">Education</h1>
        </div>
        {educations.map((edu, idx) => (
          <div key={idx} className="mb-8">
            <h4 className="text-3xl font-bold text-blue-300">{edu.degree}</h4>
            <p className="italic text-xl text-fuchsia-300">{edu.school}</p>
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
      <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold">Fun Fact</h1>
        </div>

        <div className="mb-8">
          <h4 className="text-3xl font-bold text-emerald-300">
            Featured on Wikipedia
          </h4>
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
