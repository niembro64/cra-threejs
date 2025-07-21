import React, { useEffect, useRef } from 'react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textElements = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all text elements
    textElements.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      textElements.current.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Binary code animation effect
  useEffect(() => {
    const binaryElements = document.querySelectorAll('.binary-text');

    binaryElements.forEach((element) => {
      const originalText = element.textContent || '';
      let intervalId: NodeJS.Timeout;

      element.addEventListener('mouseenter', () => {
        let iterations = 0;
        const maxIterations = 10;

        intervalId = setInterval(() => {
          element.textContent = originalText
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return char;
              }

              return Math.random() > 0.5 ? '0' : '1';
            })
            .join('');

          if (iterations >= originalText.length) {
            clearInterval(intervalId);
            element.textContent = originalText;
          }

          iterations += 1 / 3;
        }, 30);
      });

      element.addEventListener('mouseleave', () => {
        clearInterval(intervalId);
        element.textContent = originalText;
      });
    });

    return () => {
      binaryElements.forEach((element) => {
        element.removeEventListener('mouseenter', () => {
          console.log('Mouse entered');
        });
        element.removeEventListener('mouseleave', () => {
          console.log('Mouse left');
        });
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black px-6 py-24 text-green-400">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold md:text-6xl">
          <span className="text-white">&lt;</span>
          about
          <span className="text-white">/&gt;</span>
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <p
              ref={(el) => (textElements.current[0] = el)}
              className="binary-text text-lg opacity-0 transition duration-1000 ease-out md:text-xl"
            >
              Founded in 2023, &lt;drkcln/&gt; emerged from the digital underground as a response to
              the growing convergence of technology and fashion.
            </p>

            <p
              ref={(el) => (textElements.current[1] = el)}
              className="binary-text text-lg opacity-0 transition delay-300 duration-1000 ease-out md:text-xl"
            >
              Our garments are designed for those who exist both in physical reality and the digital
              matrix – the hackers, the creators, the digital nomads navigating through the noise of
              the information age.
            </p>

            <p
              ref={(el) => (textElements.current[2] = el)}
              className="delay-600 binary-text text-lg opacity-0 transition duration-1000 ease-out md:text-xl"
            >
              Each piece in our collection represents a harmonious blend of cyberpunk aesthetics,
              functional design, and sustainable production methods.
            </p>

            <div
              className="mt-6 inline-block cursor-pointer bg-green-400 px-6 py-3 font-mono tracking-wider text-black transition-colors duration-300 hover:bg-green-300"
              ref={(el) => (textElements.current[3] = el)}
            >
              LEARN_MORE();
            </div>
          </div>

          <div
            className="glitch-container relative h-96 opacity-0 transition duration-1000 ease-out"
            ref={(el) => (textElements.current[4] = el)}
          >
            {/* Main image */}
            <div className="absolute inset-0 overflow-hidden rounded-lg bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-transparent"></div>
              <div className="flex h-full w-full items-center justify-center text-9xl text-green-400">
                <span className="font-mono">01</span>
              </div>

              {/* Digital circuits/pattern overlay */}
              <div
                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMCBMIDEwMCAwIEwgMTAwIDEwMCBMIDAgMTAwIHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjI1IiB4Mj0iMTAwIiB5Mj0iMjUiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9IjUwIiB4Mj0iMTAwIiB5Mj0iNTAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMCIgeTE9Ijc1IiB4Mj0iMTAwIiB5Mj0iNzUiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iMjUiIHkxPSIwIiB4Mj0iMjUiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iNTAiIHkxPSIwIiB4Mj0iNTAiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KICA8bGluZSB4MT0iNzUiIHkxPSIwIiB4Mj0iNzUiIHkyPSIxMDAiIHN0cm9rZT0iIzAwZmYwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')]"
                style={{ opacity: 0.2 }}
              ></div>

              {/* Glitch effects */}
              <div className="animate-glitch-1·absolute·inset-0 bg-green-400 opacity-30 mix-blend-screen"></div>
              <div className="animate-glitch-2·absolute·inset-0 bg-pink-400 opacity-30 mix-blend-screen"></div>
              <div className="animate-scanline·pointer-events-none·absolute·inset-0 opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
